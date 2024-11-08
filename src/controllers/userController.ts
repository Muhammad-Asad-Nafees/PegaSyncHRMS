import { Request, Response } from 'express';
import { Users } from '../database/models';
import { body, check, validationResult } from 'express-validator';
import { dispatchSuc, dispatchErr, prepareInput, createUuid, cryptPass, comparePass } from '../lib/tool'

export const validate = (method: any) => {
    switch (method) {
        case 'createReader': {
            return [
                body('Email').isEmail().withMessage("Valid email required"),
                body('Full_Name').not().isEmpty().trim().escape().withMessage("Full Name is required"),
                body('Date_Of_Birth').not().isEmpty().trim().escape().withMessage("Date Of Birth is required"),
                body('Country').not().isEmpty().trim().escape().withMessage("Country is required"),
                body('Otp').isLength({ min: 4, max: 4 }).withMessage('must be 4 digit long'),
                body('Password').isLength({ min: 6 }).withMessage('must be at least 6 chars long'),
                body('Password2').isLength({ min: 6 }).withMessage('must be at least 6 chars long')
            ]
        }
    }
}

export const getUsers = async (req: Request, res: Response): Promise<void> => {
    try {
        //const users = await User.findAll();
        dispatchSuc(res, [{ 'msg': 'message', 'code': 'code', "msgs": "succsessfully Inserted" }], 201)
        //res.json('users');
    } catch (error) {
        //res.status(500).send(error.message);
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
