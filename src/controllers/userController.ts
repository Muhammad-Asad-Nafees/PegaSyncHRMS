import { Request, Response } from 'express';
import { Users, Company, Client, RoleAssignment, Roles, Jobs, Location } from '../database';
import { body, check, validationResult } from 'express-validator';
import { dispatchSuc, dispatchErr, prepareInput, createUuid, cryptPass, comparePass,hashPass,generateToken } from '../lib/tool'
import { log } from 'console';
import { Sequelize } from 'sequelize';
import PermAssignment from '../database/models/permassignments';
import Permissions from '../database/models/permissions';
import Job from '../database/models/jobs';
const sequelize = new Sequelize('pegasynchrms', 'root', 'root', {
    host: 'localhost', // Replace with your database host
    dialect: 'mysql',  // Replace with your database dialect (e.g., mysql, postgres, etc.)
});

export const validateLogin = [
    body('Email').isEmail().withMessage('Valid email required'),
    body('Password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
];
/**
 * Fetches all users from the database.
 *
 * @param {Request} req - Express request object.
 * @param {Response} res - Express response object.
 *
 * @returns {Promise<void>}
 */


export const loginUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const { companyEmail, password } = req.body;
 
        // Check if email exists in the database
        const user = await Users.findOne({
            where: { 
                companyEmail,
                isActive: 1,
            },
            include: [
                {
                    model: RoleAssignment,
                    as: 'userRoleAssign',
                    where: { isActive: 1 },
                    include: [
                        {
                            model: Roles,
                            as: 'rolesRoleAssign',
                            include: [
                                {
                                    model: PermAssignment,
                                    as: 'rolesPermAssign',
                                    include: [
                                        {
                                            model: Permissions,
                                            as: 'permPermAssign',
                                        },
                                    ],
                                },
                                {
                                    model: Jobs,
                                    as: 'job',
                                },
                                {
                                    model: Location,
                                    as: 'location',
                                },
                                {
                                    model: Company,
                                    as: 'company',
                                    include: [
                                        {
                                            model: Client,
                                            as: 'client',
                                        },
                                    ],
                                },
                            ],
                        },
                    ],
                },
            ],
        });
        
        // Ensure the `user` object exists
        if (!user) {
             res.status(400).json({ 
                status: false, 
                message: 'Email not found', 
                data: null 
            });
        }
        
        // Ensure password hash exists
        if (!user?.hashPassword) {
             res.status(500).json({ 
                status: false, 
                message: 'Password hash is missing for this user', 
                data: null 
            });
        }
        
        // Check password validity
        try {
            await comparePass(password, user?.hashPassword!);
        } catch (error) {
             res.status(401).json({ 
                status: false, 
                message: 'Invalid password', 
                data: null 
            });
        }
        
        // Generate JWT token
        const token = generateToken(user?.id.toString()!, user?.companyId.toString()!);
        
        // Map permissions
        //@ts-ignore
        const permissions = user?.userRoleAssign.flatMap(roleAssignment =>roleAssignment.rolesRoleAssign?.rolesPermAssign?.map(permAssignment => {
                const permission = permAssignment.permPermAssign;
                return permission ? { id: permission.id, name: permission.permission } : null;
            })
        ).filter(Boolean) || [];
        
        // Construct the user data response
        const userData = {
            id: user?.id,
            companyEmail: user?.companyEmail,
            fullName: user?.displayName,
            companyId: user?.companyId,
            //@ts-ignore
            roleName: user?.userRoleAssign?.[0]?.rolesRoleAssign?.role || null,
            //@ts-ignore
            jobName: user.userRoleAssign?.[0]?.rolesRoleAssign?.job?.jobName || null,
           //@ts-ignore
            locationName: user.userRoleAssign?.[0]?.rolesRoleAssign?.location?.location || null,
            //@ts-ignore
            latitude: user.userRoleAssign?.[0]?.rolesRoleAssign?.location?.latitude || null,
            //@ts-ignore
            longitude: user.userRoleAssign?.[0]?.rolesRoleAssign?.location?.longitude || null,
            //@ts-ignore
            companyName: user.userRoleAssign?.[0]?.rolesRoleAssign?.company?.companyName || null,
            //@ts-ignore
            clientName: user.userRoleAssign?.[0]?.rolesRoleAssign?.company?.client?.clientName || null,
            permissions: permissions,
            jwtToken: token,
        };

        res.status(200).json({ status: true, message: 'Login successful', data: userData });
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ status: false, message: 'Failed to login', data: error });
    }
};


export const registerUser = async (req: Request, res: Response): Promise<void> => {

    const { firstName, lastName,displayName, companyEmail, actualEmail, hiredate, createdby,
        password, confirmPassword, scheduleId, phoneNo, personalAddress,
        locationId, zipCode, city, countryId, companyId ,jobId} = req.body;

    try {
        if (password !== confirmPassword) {
            res.status(400).json({ status: false, message: 'Something went wrong please try again later.', data:null });
            return;
        }

        // Hash the password
        const hashedPassword = await cryptPass(password);

        console.log(hashedPassword);

        const role = await Roles.findOne({
            where: { locationId : locationId,
                jobId:jobId,
                companyId:companyId ,
                isActive:1
            },
        });

       
        const user = await Users.create(
            {
                firstName: firstName,
                lastName: lastName,
                displayName:firstName + '' + lastName,
                companyEmail:companyEmail,
                actualEmail:actualEmail,
                phoneNo:phoneNo,
                address:personalAddress,
                zipCode:zipCode,
                city:city,
                countryId:countryId,
                hashPassword: hashedPassword,
                companyId: companyId
            }
        );

        const userId = user.id;
        if(!role){
            const locationName = await Location.findOne({
                where: { 
                    id : locationId,
                    isActive:1
                },
            });
            const jobName1= await Job.findOne({
                where: { 
                    id : jobId,
                    isActive:1
                },
            });
            const rolecreate = await Roles.create({
                role: jobName1?.jobName + '' + locationName?.location,
                roleDesc: jobName1?.jobName + '' + locationName?.location,
                locationId: locationId,
                jobId : jobId
            })
            const roleAssignment = await RoleAssignment.create({
                userRecId: userId,
                roleId: rolecreate?.id! // Assuming you have a role ID to assign
            });
        }
        else{
            const roleAssignment = await RoleAssignment.create({
                userRecId: userId,
                roleId: role?.id! // Assuming you have a role ID to assign
            });
        }
       


        res.status(200).json({ status: true, message: 'User Created Successful', data: user });

    } catch (error) {
        res.status(200).json({ status: true, message: 'Something went wrong please try again later.', data: error });
    }
};        