import { Request, Response } from 'express';
import { Users, Company, Client, RoleAssignment, Roles, Jobs, Location } from '../database';
import { body, check, validationResult } from 'express-validator';
import { dispatchSuc, dispatchErr, prepareInput, createUuid, cryptPass, comparePass,hashPass } from '../lib/tool'
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
       // const users = await Users.findAll({});
       const user = await Users.findOne({
        include: [
            {
                model: Company,
                as: 'company', // Must match the alias in `Users.belongsTo`
                include: [
                    {
                        model: Client,
                        as: 'client', // Must match the alias in `Company.belongsTo`
                    },
                ],
            },
        ],
    });
        res.status(200).json({ status: true, data: user });
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).send({ error: 'Failed to fetch users', details: error });
    }
};

export const loginUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const { companyEmail, Password } = req.body;

        // Check if email exists in the database
        const user = await Users.findOne({
            where: { companyEmail },
            include: [
                {
                    model: Company,
                    as: 'company', // Must match the alias in `Users.belongsTo`
                    include: [
                        {
                            model: Client,
                            as: 'client', // Must match the alias in `Company.belongsTo`
                        },
                    ],
                   
                },
            ],
        });

        if (!user) {
         res.status(400).json({ status: false, message: 'Email not found' });
        }

        if (!user?.hashPassword) {
         res.status(500).json({ status: false, message: 'Password hash is missing for this user' });
        }

        // Check if the password is valid
        try {
            await comparePass(Password, user?.hashPassword!);
        } catch (error) {
         res.status(401).json({ status: false, message: 'Invalid password' });
        }

        // Construct response data
        const userData = {
            id: user?.id,
            companyEmail: user?.companyEmail,
            fullName: user?.displayName,
            companyId : user?.companyId,
            //@ts-ignore
            companyName: user?.company.companyName,
             //@ts-ignore
            clientName: user?.company?.client.clientName,
        };

        res.status(200).json({ status: true, message: 'Login successful', data: userData });
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ status: false, error: 'Failed to login', details: error });
    }
};


// export const registerUser = async (req: Request, res: Response): Promise<void> => {

//     const { firstName, lastName, companyEmail, actualEmail, hiredate, createdby,
//         password, confirmPassword, scheduleID, phoneNo, personalAddress,
//         locationID, zipCode, city, countryID, companyId } = req.body;

//     try {
//         if (password !== confirmPassword) {
//             res.status(400).json({ status: false, message: 'Passwords do not match' });
//             return;
//         }

//         // Hash the password
//         const hashedPassword = await cryptPass(password);

//         console.log(hashedPassword);

//         // Start a transaction
//         const transaction = await sequelize.transaction();
//         const result = await Users.findOne({
//             attributes: [[sequelize.fn('MAX', sequelize.col('profileId')), 'profileId']],
//             raw: true,
//         });
//         const lastProfileId = result?.profileId || 0; // Use 0 if no users exist
//         const newProfileId = lastProfileId + 1;
//         console.log(`Last Profile ID: ${lastProfileId}, New Profile ID: ${newProfileId}`);
//         const user = await Users.create(
//             {
//                 firstName: firstName,
//                 hashPassword: hashedPassword,
//                 profileId: newProfileId,
//                 companyId: companyId
//             }
//         );
//         res.status(200).json({ status: true, message: 'User Created Successful', data: hashedPassword });

//     } catch (error) {

//     }
// };        