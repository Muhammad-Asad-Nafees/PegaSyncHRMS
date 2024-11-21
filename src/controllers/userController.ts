import { Request, Response } from 'express';
import { Users,UserProfile,Company,Client, RoleAssignment, Roles ,Jobs,Location,LocationDetails} from '../database';
import { body, check, validationResult } from 'express-validator';
import { dispatchSuc, dispatchErr, prepareInput, createUuid, cryptPass, comparePass } from '../lib/tool'
import { log } from 'console';
import { Sequelize } from 'sequelize';

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
export const getUsers = async (req: Request, res: Response): Promise<void> => {
    try {
        if (!Users) {
            throw new Error('Users model is not initialized.');
        }
        const users = await Users.findAll({});
        res.status(200).json({ status: true, data: users });
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).send({ error: 'Failed to fetch users', details: error });
    }
};

export const loginUser = async (req: Request, res: Response): Promise<void> => {
    try {
        
         //const errors = validationResult(req);
    
        // if (!errors.isEmpty()) {
        //  res.status(400).json({ status: false, errors: errors.array() });
        // }
        
        const { companyEmail, Password } = req.body;
        
        const userProfile = await UserProfile.findOne({ where: { companyEmail:companyEmail } });
        
        if (!userProfile) {
             res.status(400).json({ status: false, message: 'User profile not found' });
        }

        const user = await Users.findOne({ where: { profileId: userProfile?.profileID } });

        if (!user) {
             res.status(400).json({ status: false, message: 'User not found' });
        }

        const comp = await Company.findOne({ where: { id: user?.companyId } });

        if (!comp) {
            res.status(400).json({ status: false, message: 'Company not found' });
        }

        const cli = await Client.findOne({ where: { id: comp?.clientID } });

        if (!cli) {
            res.status(400).json({ status: false, message: 'Client not found' });
        }

        const rolA = await RoleAssignment.findOne({ where: { userRecID: user?.id } });

        if (!rolA) {
            res.status(400).json({ status: false, message: 'RoleAssignment not found' });
        }

        const rol = await Roles.findOne({ where: { id: rolA?.roleID } });

        if (!rol) {
            res.status(400).json({ status: false, message: 'Roles not found' });
        }

        const jobs = await Jobs.findOne({ where: { id: rol?.JobID } });

        if (!jobs) {
            res.status(400).json({ status: false, message: 'jobs not found' });
        }

        const loc = await Location.findOne({ where: { id: rol?.locationID } });

        if (!loc) {
            res.status(400).json({ status: false, message: 'Location not found' });
        }

        const locdet = await LocationDetails.findOne({ where: { locationID: rol?.locationID } });

        if (!locdet) {
            res.status(400).json({ status: false, message: 'Location Details not found' });
        }

        const isPasswordValid = await Users.findOne({ where: { hashPassword: Password} });
       
        if (!isPasswordValid) {
            res.status(400).json({ status: false, message: 'Invalid Credentials' });
        }
        
        const userData = {
            id: user?.id,
            companyEmail: userProfile?.companyEmail, 
            fullName: userProfile?.displayName,
            companyId: user?.companyId,
            companyName: comp?.companyName,
            clientID: comp?.clientID,
            clientName: cli?.clientName,
            profileId: user?.profileId,
            jobName: jobs?.jobName,
            roleName: rol?.role,
            locationName: loc?.location,
            latitude: locdet?.latitude,
            longitude: locdet?.longitude,
            isActive: user?.isActive,
            createdAt: user?.createdAt,
            updatedAt: user?.updatedAt,
        };

         res.status(200).json({ status: true, message: 'Login successful', data: userData });

    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ status: false, error: 'Failed to login', details: error });
    }
};

export const registerUser = async (req: Request, res: Response): Promise<void> => {
    
    const { firstName, lastName,companyEmail,actualEmail,hiredate,createdby,
        password,confirmPassword,scheduleID,phoneNo,personalAddress,
    locationID,zipCode,city,countryID,companyId } = req.body;

    try {
        if (password !== confirmPassword) {
            res.status(400).json({ status: false, message: 'Passwords do not match' });
            return;
        }

        // Hash the password
        const hashedPassword = await cryptPass(password);
        
        console.log(hashedPassword);

        // Start a transaction
        const transaction = await sequelize.transaction();
        const result = await Users.findOne({
            attributes: [[sequelize.fn('MAX', sequelize.col('profileId')), 'profileId']],
            raw: true,
        });
        const lastProfileId = result?.profileId || 0; // Use 0 if no users exist
        const newProfileId = lastProfileId + 1;
        console.log(`Last Profile ID: ${lastProfileId}, New Profile ID: ${newProfileId}`);
        const user = await Users.create(
            { 
                firstName:firstName,     
                hashPassword: hashedPassword,
                profileId:newProfileId,
                companyId:companyId
            }
        );
        res.status(200).json({ status: true, message: 'User Created Successful', data: hashedPassword });

    }catch(error){

    }
};        