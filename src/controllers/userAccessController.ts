import { Request, Response } from 'express';
import { Users, Company, Client, RoleAssignment, Roles, Jobs, Location } from '../database';
import { body, check, validationResult } from 'express-validator';
import { dispatchSuc, dispatchErr, prepareInput, createUuid, cryptPass, comparePass,hashPass,generateToken } from '../lib/tool'
import { log } from 'console';
import { Sequelize } from 'sequelize';
import PermAssignment from '../database/models/permassignments';
import Permissions from '../database/models/permissions';
import Job from '../database/models/jobs';

const sequelize = new Sequelize('pegasynchrms', 'root', 'root', {
    host: 'localhost', // Replace with your database host
    dialect: 'mysql',  // Replace with your database dialect (e.g., mysql, postgres, etc.)
});

export const createClient = async (req: Request, res: Response): Promise<void> => {

    const { clientName }= req.body;

    try {
        const set = await Client.create({
            clientName: clientName,
        });
        res.status(200).json({ status: true, message: 'Client Created Successful', data: set });

    } catch (error) {
        res.status(500).json({ status: true, message: 'Something went wrong please try again later.', data: error });
    }
};        

export const createCompany = async (req: Request, res: Response): Promise<void> => {

    const { clientId,companyName,companyAddress, zipCode,city,countryID}= req.body;
    try {
        const set = await Company.create({
            clientId: clientId,
            companyName: companyName,
            companyAddress: companyAddress,
            zipCode: zipCode,   
            city: city,
            countryID: countryID,
        });
        res.status(200).json({ status: true, message: 'Company Created Successful', data: set });

    } catch (error) {
        res.status(500).json({ status: true, message: 'Something went wrong please try again later.', data: error });
    }
};        

export const createLocation = async (req: Request, res: Response): Promise<void> => {

    const { location,locationUID,latitude,longitude, address,companyId,countryId}= req.body;
    try {
        const set = await Location.create({
            location: location,
            locationUID: locationUID,
            latitude: latitude,
            longitude: longitude,
            address: address,   
            companyId: companyId,
            countryId: countryId
        });
        res.status(200).json({ status: true, message: 'Location Created Successful', data: set });

    } catch (error) {
        res.status(500).json({ status: true, message: 'Something went wrong please try again later.', data: error });
    }
};  

export const createJobs = async (req: Request, res: Response): Promise<void> => {

    const { jobName,jobDesc,jobLevelId,companyId}= req.body;
    try {
        const set = await Job.create({
            jobName: jobName,
            jobDesc: jobDesc,
            jobLevelId: jobLevelId,
            companyId: companyId 
        })
        res.status(200).json({ status: true, message: 'Job Created Successful', data: set });

    } catch (error) {
        res.status(500).json({ status: true, message: 'Something went wrong please try again later.', data: error });
    }
};

export const createRoles = async (req: Request, res: Response): Promise<void> => {

    const { role,roleDesc,locationId,jobId, companyId}= req.body;
    try {
        const set = await Roles.create({
            role: role,
            roleDesc: roleDesc,
            locationId: locationId,
            jobId: jobId,
            companyId: companyId   
        })
        res.status(200).json({ status: true, message: 'Roles Created Successful', data: set });

    } catch (error) {
        res.status(500).json({ status: true, message: 'Something went wrong please try again later.', data: error });
    }
}; 

export const createPermissions = async (req: Request, res: Response): Promise<void> => {

    const { permission,permissionDesc,companyId}= req.body;
    try {
        const set = await Permissions.create({
            permission: permission,
            permissionDesc: permissionDesc,
            companyId: companyId,
        })
        res.status(200).json({ status: true, message: 'Permissions Created Successful', data: set });

    } catch (error) {
        res.status(500).json({ status: true, message: 'Something went wrong please try again later.', data: error });
    }
}; 

export const userRolesAssignment = async (req: Request, res: Response): Promise<void> => {

    const { userRecId,roleId}= req.body;
    try {
        const userIds = userRecId.split(',').map((id: string) => id.trim());
        const roleIds = roleId.split(',').map((id: string) => id.trim());

        // Collect all assignments to create
        const assignments: { userRecId: string; roleId: string }[] = [];

        userIds.forEach((userId: string) => {
            roleIds.forEach((role: string) => {
                assignments.push({
                    userRecId: userId,
                    roleId: role,
                });
            });
        });

        // Bulk create all assignments
        //@ts-ignore
        const createdAssignments = await RoleAssignment.bulkCreate(assignments);

        res.status(200).json({ status: true, message: 'Roles Assign Successfully', data: createdAssignments });

    } catch (error) {
        res.status(500).json({ status: true, message: 'Something went wrong please try again later.', data: error });
    }
}; 

export const assignModulePermissions = async (req: Request, res: Response): Promise<void> => {

    const { permId,roleId}= req.body;
    try {
        const permIds = permId.split(',').map((id: string) => id.trim());
        const roleIds = roleId.split(',').map((id: string) => id.trim());
        
        const existingAssignments = await PermAssignment.findAll({
            where: {
                roleId: roleIds,
                isActive : 1
            },
        });
         // Create a map of existing assignments for quick lookup
         const existingMap = new Map(
            existingAssignments.map((assignment: any) => [`${assignment.permId}_${assignment.roleId}`, assignment])
        );

        const assignmentsToInsert: { permId: string; roleId: string; isActive: number }[] = [];
        const assignmentsToUpdate: { id: number; isActive: number }[] = [];
        const activeKeys = new Set<string>();

        permIds.forEach((permId: string) => {
            roleIds.forEach((roleId: string) => {
                const key = `${permId}_${roleId}`;
                activeKeys.add(key);

                if (existingMap.has(key)) {
                    // If the assignment exists, keep it active
                    const existingAssignment = existingMap.get(key);
                    if (existingAssignment.isActive == 0) {
                        assignmentsToUpdate.push({ id: existingAssignment.id, isActive: 1 });
                    }
                } else {
                    // If the assignment does not exist, add it to the insert list
                    assignmentsToInsert.push({ permId, roleId, isActive: 1 });
                }
            });
        });
        
        const assignmentsToDeactivate = existingAssignments.filter(
            (assignment: any) => !activeKeys.has(`${assignment.permId}_${assignment.roleId}`) && assignment.isActive == 1
        );
       
        // Deactivate missing assignments
        for (const assignment of assignmentsToDeactivate) {
            assignmentsToUpdate.push({ id: assignment.id, isActive: 0 });
        }

        // Perform updates
        if (assignmentsToDeactivate.length > 0) {
            await PermAssignment.update(
                { isActive: 0 },
                {
                    where: {
                        id: assignmentsToDeactivate.map((assignment: any) => assignment.id),
                    },
                }
            );
        }

         // Insert new assignments
         if (assignmentsToInsert.length > 0) {
            //@ts-ignore
            await PermAssignment.bulkCreate(assignmentsToInsert);
        }
        res.status(200).json({ status: true, message: 'Permission Assign Successfully', data: assignmentsToInsert });

    } catch (error) {
        res.status(500).json({ status: true, message: 'Something went wrong please try again later.', data: error });
    }
}; 

