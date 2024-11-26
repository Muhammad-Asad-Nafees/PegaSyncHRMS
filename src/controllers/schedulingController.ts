import { Request, Response } from 'express';
import { EmpScheduling,Users ,Location} from '../database';
import { Sequelize } from 'sequelize';
import { parseISO, eachDayOfInterval, differenceInMinutes } from "date-fns";

const sequelize = new Sequelize('pegasynchrms', 'root', 'root', {
    host: 'localhost', // Replace with your database host
    dialect: 'mysql',  // Replace with your database dialect (e.g., mysql, postgres, etc.)
});

export const createScheduling = async (req: Request, res: Response): Promise<void> => {

    const { submittedBy,requestedFor,locationId,startDate,endDate,startTime,endTime,isNight,
        totalHours
    } = req.body;

    try {
        const parsedStartDate = parseISO(startDate);
        const parsedEndDate = parseISO(endDate);
        const datesInRange = eachDayOfInterval({ start: parsedStartDate, end: parsedEndDate });
        // Calculate total hours for each date
        const schedules = datesInRange.map(date => {
            const startDateTime = new Date(`${date.toISOString().split('T')[0]}T${startTime}`);
            const endDateTime = new Date(`${date.toISOString().split('T')[0]}T${endTime}`);

            const minutes = differenceInMinutes(endDateTime, startDateTime);
            const hours = (minutes / 60).toFixed(2);

            return {
                submittedBy,
                requestedFor,
                locationId,
                startDate: date, // Current date in range
                endDate: date, // Same as startDate for a single day's schedule
                startTime,
                endTime,
                isNight,
                totalHours: hours,
            };
        });
        console.log(schedules);
        const empScheduling = await EmpScheduling.bulkCreate(schedules);
        res.status(200).json({ status: true, message: 'Schedule Created Successful', data: empScheduling });

    } catch (error) {
        res.status(200).json({ status: true, message: 'Something went wrong', data: error });
    }
 };     

 export const getSchduleReport = async (req: Request, res: Response): Promise<void> => {
    try {
       
       const getSchdeule = await EmpScheduling.findAll({
        include:[
            {
                model: Users,
                as: 'submittedByUser',
            },
            {
                model: Users,
                as: 'requestedForUser',
            },
            {
                model: Location,
                as: 'submitBylocation',
            },
        ]
        
    });

    if (!getSchdeule || getSchdeule.length === 0) {
         res.status(404).json({ status: false, message: 'No schedule data found.' });
    }

    const schedules = getSchdeule.map((schedule) => ({
        id: schedule.id,
        //@ts-ignore
        submittedBy: schedule.submittedByUser?.displayName,
        //@ts-ignore
        requestedFor: schedule.requestedForUser?.displayName,
        //@ts-ignore
        locationName: schedule.submitBylocation?.location,
        startDate: schedule.startDate,
        endDate: schedule.endDate,
        startTime: schedule.startTime,
        endTime: schedule.endTime,
        totalHours: schedule.totalHours,
    }));
        res.status(200).json({ status: true, data: schedules });
    } catch (error) {
        res.status(500).send({ error: 'Failed to fetch EmpScheduling', data: error });
    }
};