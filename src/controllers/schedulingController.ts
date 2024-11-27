import { Request, Response } from 'express';
import { EmpScheduling,Users ,Location, ScheduleTypes} from '../database';
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
        const empScheduling = await EmpScheduling.bulkCreate(schedules);
        res.status(200).json({ status: true, message: 'Schedule Created Successful', data: empScheduling });

    } catch (error) {
        res.status(200).json({ status: true, message: 'Something went wrong please try again later.', data: error });
    }
 };     

 export const getSchduleReport = async (req: Request, res: Response): Promise<void> => {
    try {
       
       const getSchdeule = await EmpScheduling.findAll({
        where:{
            isActive:1
        },
        include:[
            {
                model: Users,
                as: 'submittedByUser',
                where:{
                    isActive:1
                },
            },
            {
                model: Users,
                as: 'requestedForUser',
                where:{
                    isActive:1
                },
            },
            {
                model: Location,
                as: 'submitBylocation',
                where:{
                    isActive:1
                },
            },
        ]
        
    });

    if (!getSchdeule || getSchdeule.length === 0) {
         res.status(404).json({ status: false, message: 'No schedule data found.', data: null });
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
        res.status(200).json({ status: true, message: 'Data Fetched Successfully',data: schedules });
    } catch (error) {
        res.status(500).send({ status: false,message: 'Failed to fetch EmpScheduling', data: error });
    }
};

export const scheduleTypes = async (req: Request, res: Response): Promise<void> => {
    try {
       
       const getSchdeule = await ScheduleTypes.findAll({
        where:{
            isActive:1
        },
           
    });
        
    res.status(200).json({ status: true, message: 'Data Fetched Successfully',data: getSchdeule });
    } catch (error) {
        res.status(500).send({ status: false,message: 'Failed to fetch EmpScheduling', data: error });
    }
};