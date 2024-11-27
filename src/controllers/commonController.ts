import { Request, Response } from 'express';
import { Users, Company, Client, RoleAssignment, Roles, Jobs, Location,Country } from '../database';
import { body, check, validationResult } from 'express-validator';
import { dispatchSuc, dispatchErr, prepareInput, createUuid, cryptPass, comparePass,hashPass,generateToken } from '../lib/tool'
import { log } from 'console';
import { Sequelize } from 'sequelize';
import PermAssignment from '../database/models/permassignments';
import Permissions from '../database/models/permissions';
import Job from '../database/models/jobs';
export const getUsers = async (req: Request, res: Response): Promise<void> => {
    try {
        if (!Users) {
            throw new Error('Users model is not initialized.');
        }

        const users = await Users.findAll({
            where:{
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
                                    include: [
                                        {
                                            model: Permissions,
                                            as: 'permission',
                                            where:{
                                                isActive:1
                                            },
                                        },
                                    ],
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
                                    include: [
                                        {
                                            model: Client,
                                            as: 'client',
                                            where:{
                                                isActive:1
                                            },
                                        },
                                    ],
                                },
                            ],
                        },
                    ],
                },
            ],
        });

        const userData = users.map((user) => ({
            //@ts-ignore
            id: user?.id,
            //@ts-ignore
            companyEmail: user?.companyEmail,
            //@ts-ignore
            fullName: user?.displayName,
            //@ts-ignore
            companyId: user?.companyId,
            //@ts-ignore
            roleName: user?.roleAssignments?.[0]?.role?.role,
            //@ts-ignore
            jobName: user?.roleAssignments?.[0]?.role?.job?.jobName,
            //@ts-ignore
            locationName: user?.roleAssignments?.[0]?.role?.location?.location,
            //@ts-ignore
            latitude: user?.roleAssignments?.[0]?.role?.location?.latitude,
            //@ts-ignore
            longitude: user?.roleAssignments?.[0]?.role?.location?.longitude,
            //@ts-ignore
            companyName: user?.roleAssignments?.[0]?.role?.company?.companyName,
            //@ts-ignore
            clientName: user?.roleAssignments?.[0]?.role?.company?.client?.clientName,
        }));

        res.status(200).json({ status: true, data: userData, message: 'Data fetched Successfully' });
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(200).json({ 
            status: false, 
            data: null, 
            message: 'Failed to fetch data. Please try again later.' 
        });
    }
};



export const getCountries = async (req: Request, res: Response): Promise<void> => {
    try {
        if (!Country) {
            throw new Error('Countries model is not initialized.');
        }
       // const users = await Users.findAll({});
       const countries = await Country.findAll({
        where:{
            isActive:1
        },
       });
       res.status(200).json({ status: true, data: countries, message: 'Data fetched Successfully' });
    } catch (error) {
        console.error('Error fetching countries:', error);
        res.status(200).json({ 
            status: false, 
            data: null, 
            message: 'Failed to fetch data. Please try again later.' 
        });
    }
};
export const getCompany = async (req: Request, res: Response): Promise<void> => {
    try {
        if (!Company) {
            throw new Error('Company model is not initialized.');
        }
       // const users = await Users.findAll({});
       const user = await Company.findAll({
        where:{
            isActive:1
        },
       });
       res.status(200).json({ status: true, data: user, message: 'Data fetched Successfully' });
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(200).json({ 
            status: false, 
            data: null, 
            message: 'Failed to fetch data. Please try again later.' 
        });
    }
};

export const getLocations = async (req: Request, res: Response): Promise<void> => {
    try {
        if (!Location) {
            throw new Error('Location model is not initialized.');
        }
       // const users = await Users.findAll({});
       const user = await Location.findAll({
        where:{
            isActive:1
        },
       });
       res.status(200).json({ status: true, data: user, message: 'Data fetched Successfully' });
    } catch (error) {
        console.error('Error fetching Location:', error);
        res.status(200).json({ 
            status: false, 
            data: null, 
            message: 'Failed to fetch data. Please try again later.' 
        });
    }
};

export const getJobs = async (req: Request, res: Response): Promise<void> => {
    try {
        if (!Job) {
            throw new Error('Job model is not initialized.');
        }
       // const users = await Users.findAll({});
       const user = await Job.findAll({
        where:{
            isActive:1
        },
    });
    res.status(200).json({ status: true, data: user, message: 'Data fetched Successfully' });
    } catch (error) {
        console.error('Error fetching Job:', error);
        res.status(200).json({ 
            status: false, 
            data: null, 
            message: 'Failed to fetch data. Please try again later.' 
        });
    }
};