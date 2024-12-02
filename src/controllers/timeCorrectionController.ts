import { Request, Response } from 'express';

import { Sequelize } from 'sequelize';
import TimeCorrection from '../database/models/timecorrection';
import {  dispatchSuc,dispatchErr } from '../lib/tool';

const sequelize = new Sequelize('pegasynchrms', 'root', 'root', {
    host: 'localhost', // Replace with your database host
    dialect: 'mysql',  // Replace with your database dialect (e.g., mysql, postgres, etc.)
});

export const addTimeCorrection = async (req: Request, res: Response): Promise<void> => {

    const { submittedBy,requestedFor,typeId,correctionTime,comment,empProfileId,empDetailId  }= req.body;

    try {
        const set = await TimeCorrection.create({
            submittedBy: submittedBy,
            requestedFor: requestedFor,
            typeId: typeId,
            correctionTime: correctionTime,
            comment: comment,
            empProfileId: empProfileId,
            empDetailId: empDetailId,
            createdAt: new Date(),
            updatedAt: new Date(),
        });
        dispatchSuc(res, { data: set, message: 'TimeCorrection Created Successful.'});

    } catch (error) {
        dispatchErr(res, { message: 'Something went wrong. Please try again later.' }, 500);
    }
};