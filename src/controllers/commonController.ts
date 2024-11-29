import { Request, Response } from 'express';
import { Users, Company, Client, RoleAssignment, Roles, Jobs, Location,Country } from '../database';
import PermAssignment from '../database/models/permassignments';
import Permissions from '../database/models/permissions';
import Job from '../database/models/jobs';
export const getUsers = async (req: Request, res: Response): Promise<void> => {
    try {
        const {userRecId,companyId} = req.query;
        if (!Users) {
            throw new Error('Users model is not initialized.');
        }

        const users = await Users.findAll({
            //@ts-ignore
            where:{
                isActive:1,
                companyId:companyId
            },
            include: [
                {
                    model: RoleAssignment,
                    as: 'userRoleAssign',
                    where:{
                        isActive:1
                    },
                    include: [
                        {
                            model: Roles,
                            as: 'rolesRoleAssign',
                            where:{
                                isActive:1
                            },
                            include: [
                                {
                                    model: PermAssignment,
                                    as: 'rolesPermAssign', // Include the PermAssignment table
                                    where:{
                                        isActive:1
                                    },
                                    include: [
                                        {
                                            model: Permissions,
                                            as: 'permPermAssign',
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
            roleName: user?.userRoleAssign?.[0]?.rolesRoleAssign?.role,
            //@ts-ignore
            jobName: user?.userRoleAssign?.[0]?.rolesRoleAssign?.job?.jobName,
            //@ts-ignore
            locationName: user?.userRoleAssign?.[0]?.rolesRoleAssign?.location?.location,
            //@ts-ignore
            latitude: user?.userRoleAssign?.[0]?.rolesRoleAssign?.location?.latitude,
            //@ts-ignore
            longitude: user?.userRoleAssign?.[0]?.rolesRoleAssign?.location?.longitude,
            //@ts-ignore
            companyName: user?.userRoleAssign?.[0]?.rolesRoleAssign?.company?.companyName,
            //@ts-ignore
            clientName: user?.userRoleAssign?.[0]?.rolesRoleAssign?.company?.client?.clientName,
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
        const {userRecId} = req.query;
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
        const { userRecId,companyId } = req.query;
        if (!Location) {
            throw new Error('Location model is not initialized.');
        }
       // const users = await Users.findAll({});
       const user = await Location.findAll({
         //@ts-ignore
        where:{
            isActive:1,
            companyId:companyId
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
        // Accessing parameters from the URL
        const { userRecId, companyId } = req.query;

        if (!Job) {
            throw new Error('Job model is not initialized.');
        }

        // Ensure companyId is provided (since it's needed for the query)
        if (!companyId) {
            res.status(400).json({ 
                status: false, 
                data: null, 
                message: 'companyId parameter is required' 
            });
            return;
        }

        // Fetch the jobs using the companyId from query parameters
        const job = await Job.findAll({
           //@ts-ignore
            where: {
                isActive: 1,
                companyId: companyId,
            },
        });

        res.status(200).json({ 
            status: true, 
            data: job, 
            message: 'Data fetched successfully' 
        });
    } catch (error) {
        console.error('Error fetching Job:', error);
        res.status(500).json({ 
            status: false, 
            data: null, 
            message: 'Failed to fetch data. Please try again later.' 
        });
    }
};