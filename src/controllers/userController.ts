import { Request, Response } from 'express';
import { Users,UserProfile,Company,Client } from '../database';
import { body, check, validationResult } from 'express-validator';
import { dispatchSuc, dispatchErr, prepareInput, createUuid, cryptPass, comparePass } from '../lib/tool'
import { log } from 'console';


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
        //Get the validation errors (if any)
        
        const errors = validationResult(req);
    
        if (!errors.isEmpty()) {
         res.status(400).json({ status: false, errors: errors.array() });
        }
      
        const { companyEmail, Password } = req.body;
        
        // Find user profile by company email
        const userProfile = await UserProfile.findOne({ where: { companyEmail:companyEmail } });
        console.log(userProfile);
        if (!userProfile) {
             res.status(400).json({ status: false, message: 'User profile not found' });
        }

        // Find the corresponding user record using the profileId from UserProfile
        const user = await Users.findOne({ where: { profileId: userProfile?.profileID } });

        if (!user) {
             res.status(400).json({ status: false, message: 'User not found' });
        }

        // Compare the provided password with the stored hash
        //const isPasswordValid = await Users.findOne(Password, user.hashPassword);
        //const isPasswordValid = await Users.findOne( Password, user?.hashPassword );

        const isPasswordValid = await Users.findOne({ where: { hashPassword: Password} });
        // if (!isPasswordValid) {
        //     return res.status(400).json({ status: false, message: 'Invalid credentials' });
        // }

        // If the credentials are valid, return the user data (you can omit sensitive data like password)
        const userData = {
            id: user?.id,
            companyEmail: userProfile?.companyEmail,  // Return the companyEmail from UserProfile
            fullName: userProfile?.displayName,
            companyId: user?.companyId,
            profileId: user?.profileId,
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
// export const createUser = async (req: Request, res: Response): Promise<void> => {
//   try {
//     const user = await User.create(req.body);
//     res.status(201).json(user);
//   } catch (error) {
//     res.status(500).send(error.message);
//   }
// };
