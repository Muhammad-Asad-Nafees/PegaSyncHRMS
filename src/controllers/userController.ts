import { Request, Response } from 'express';
import { Users, Company, Client, RoleAssignment, Roles, Jobs, Location } from '../database';
import { body, check, validationResult } from 'express-validator';
import { dispatchSuc, dispatchErr, prepareInput, createUuid, cryptPass, comparePass,hashPass,generateToken } from '../lib/tool'
import { log } from 'console';
import { Sequelize } from 'sequelize';
import PermAssignment from '../database/models/permassignments';
import Permissions from '../database/models/permissions';
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
            where: { companyEmail ,
                isActive:1
            },
            include: [
                {
                    model: RoleAssignment,
                    as: 'roleAssignments', 
                    where:{
                        isActive:1
                    },
                    include: [
                        {
                            model: Roles,
                            as: 'role', 
                            where:{
                                isActive:1
                            },
                            include: [
                                {
                                    model: PermAssignment,
                                    as: 'permAssignments', // Include the PermAssignment table
                                    where:{
                                        isActive:1
                                    },
                                    include:[
                                         {
                                            model:Permissions,
                                            as : 'permission'   ,
                                            where:{
                                                isActive:1
                                            }, 
                                         }   
                                    ]
                                },
                                {
                                    model: Jobs,
                                    as: 'job', 
                                    where:{
                                        isActive:1
                                    },
                                },
                                {
                                    model: Location,
                                    as: 'location', 
                                    where:{
                                        isActive:1
                                    },
                                },
                                {
                                    model: Company,
                                    as: 'company', 
                                    where:{
                                        isActive:1
                                    },
                                    include:[
                                    {
                                        model: Client,
                                        as: 'client', 
                                        where:{
                                            isActive:1
                                        },
                                    },
                                ]
                                },
                            ],
                        },
                    ],
                },
            ],
        });
        // Extract permissions as a comma-separated string
        //@ts-ignore
        const permissions = user?.roleAssignments?.flatMap(roleAssignment =>  roleAssignment.role?.permAssignments?.map(permAssignment => {
                const permission = permAssignment.permission;
                return permission ? { id: permission.id, name: permission.permission } : null; // Create object with id and name
            })
        ).filter(Boolean);// Filter out undefined or null values

       // const permissionString = permissions?.join(',') || '';

        if (!user) {
         res.status(400).json({ status: false, message: 'Email not found',data: null });
        }

        if (!user?.hashPassword) {
         res.status(500).json({ status: false, message: 'Password hash is missing for this user',data: null });
        }

        // Check if the password is valid
        try {
            await comparePass(password, user?.hashPassword!);
        } catch (error) {
         res.status(401).json({ status: false, message: 'Invalid password' ,data: null});
        }
        const token = generateToken(user?.id.toString()!, user?.companyId.toString()!);

        // Construct response data
        const userData = {
            id: user?.id,
            companyEmail: user?.companyEmail,
            fullName: user?.displayName,
            companyId : user?.companyId,
            //@ts-ignore
            roleName: user?.roleAssignments[0].role?.role,
             //@ts-ignore
            jobName: user?.roleAssignments[0].role?.job?.jobName,
            //@ts-ignore
            locationName: user?.roleAssignments[0].role?.location?.location,
            //@ts-ignore
            latitude: user?.roleAssignments[0].role?.location?.latitude,
            //@ts-ignore
            longitude: user?.roleAssignments[0].role?.location?.longitude,
            //@ts-ignore
            companyName: user?.roleAssignments[0].role?.company?.companyName,
            //@ts-ignore
            clientName: user?.roleAssignments[0].role?.company?.client.clientName,
            permissions:permissions,
            jwtToken: token
        };

        res.status(200).json({ status: true, message: 'Login successful', data: userData });
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ status: false, message: 'Failed to login', data: error });
    }
};


export const registerUser = async (req: Request, res: Response): Promise<void> => {

    const { firstName, lastName,displayName, companyEmail, actualEmail, hiredate, createdby,
        password, confirmPassword, scheduleID, phoneNo, personalAddress,
        locationID, zipCode, city, countryID, companyId ,jobId} = req.body;

    try {
        if (password !== confirmPassword) {
            res.status(400).json({ status: false, message: 'Something went wrong please try again later.', data:null });
            return;
        }

        // Hash the password
        const hashedPassword = await cryptPass(password);

        console.log(hashedPassword);

        const role = await Roles.findOne({
            where: { locationId : locationID,
                jobId:jobId,
                companyId:companyId ,
                isActive:1
            },
        });

        console.log(role);

        const user = await Users.create(
            {
                firstName: firstName,
                lastName: lastName,
                displayName:displayName,
                companyEmail:companyEmail,
                actualEmail:actualEmail,
                phoneNo:phoneNo,
                address:personalAddress,
                zipCode:zipCode,
                city:city,
                countryId:countryID,
                hashPassword: hashedPassword,
                companyId: companyId
            }
        );

        const userId = user.id;

        const roleAssignment = await RoleAssignment.create({
            userRecId: userId,
            roleId: role?.id! // Assuming you have a role ID to assign
        });


        res.status(200).json({ status: true, message: 'User Created Successful', data: user });

    } catch (error) {
        res.status(200).json({ status: true, message: 'Something went wrong please try again later.', data: error });
    }
};        