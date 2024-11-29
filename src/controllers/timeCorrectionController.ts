import { Request, Response } from 'express';

import { Sequelize } from 'sequelize';
import TimeCorrection from '../database/models/timecorrection';

const sequelize = new Sequelize('pegasynchrms', 'root', 'root', {
    host: 'localhost', // Replace with your database host
    dialect: 'mysql',  // Replace with your database dialect (e.g., mysql, postgres, etc.)
});

export const addTimeCorrection = async (req: Request, res: Response): Promise<void> => {

    const { submittedBy,requestedFor,typeId,correctionTime,comment,empProfileID,empDetailID  }= req.body;

    try {
        const set = await TimeCorrection.create({
            submittedBy: submittedBy,
            requestedFor: requestedFor,
            typeId: typeId,
            correctionTime: correctionTime,
            comment: comment,
            empProfileID: empProfileID,
            empDetailID: empDetailID
        });
        res.status(200).json({ status: true, message: 'TimeCorrection Created Successful', data: set });

    } catch (error) {
        res.status(500).json({ status: true, message: 'Something went wrong please try again later.', data: error });
    }
};