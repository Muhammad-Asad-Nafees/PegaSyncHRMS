import { Request, Response } from 'express';
import { Users, Location,EmpAttendanceProfile,EmpAttendanceDetails, RoleAssignment, Roles } from '../database';
import { Op,Sequelize } from 'sequelize';
import EmpAttendanceType from '../database/models/empattendancetypes';
import {  dispatchSuc,dispatchErr } from '../lib/tool';

const sequelize = new Sequelize('pegasynchrms', 'root', 'root', {
    host: 'localhost', // Replace with your database host
    dialect: 'mysql',  // Replace with your database dialect (e.g., mysql, postgres, etc.)
});

export const checkLocation = async (req: Request, res: Response): Promise<void> => {
    try {
        const { userRecId,latitude, longitude } = req.query;
        const checkUserLocations = await Roles.findAll({
            include : [
                {
                    model: RoleAssignment,
                    as : 'rolesRoleAssign',
                    where : {
                        userRecId : userRecId,
                        isActive : 1
                    },
                }
               
            ]
        });
      
        const location = await Location.findAll({
            where:{
                isActive:1,
                id: checkUserLocations[0].locationId
            }
        });
       
        const toRadians = (degree: number) => (degree * Math.PI) / 180;

        const haversineDistance = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
            const R = 6371; // Earth's radius in kilometers
            const dLat = toRadians(lat2 - lat1);
            const dLon = toRadians(lon2 - lon1);
            const a =
                Math.sin(dLat / 2) * Math.sin(dLat / 2) +
                Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
            const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
            return R * c; // Distance in kilometers
        };
        const nearbyLocations = location.filter((location) => {
            const distance = haversineDistance(
                //@ts-ignore
                parseFloat(latitude),parseFloat(longitude),
                parseFloat(location.latitude),
                parseFloat(location.longitude)
            );
            console.log(distance);
            return distance < location.radius; // Check if within 0.2 km
        });
        
        if (nearbyLocations.length > 0) {
            dispatchSuc(res, { data: nearbyLocations, message: 'Location within radius.'});
        } else {
            dispatchErr(res, { message: 'No locations found within the specified radius.' }, 404);
     
        }
        
    } catch (error) {
        console.error('Error fetching Location:', error);
        dispatchErr(res, { message: 'Something went wrong. Please try again later.' }, 500);
    }
};

export const addTimeClock= async (req: Request, res: Response): Promise<void> => {
    try {
        const { userRecId,locationId,submitteddatetime,profileId,typeId } = req.body;
        
        if (!typeId) {
            res.status(400).json({ status: false, message: 'typeId is required.' });
            return;
        }
        const getShiftName = await EmpAttendanceType.findAll({
            where : {
                id: typeId,
                isActive:1
            },
            include : [
                {
                    model: EmpAttendanceDetails,
                    as : 'detailTypeId',
                    where : {
                        activeStatus : 1,
                       // isActive:1
                    }
                }
            ]
        })
        if (profileId == '' || profileId == null) {
            // Create a new profile if `profileId` is null or empty
            const addProfile = await EmpAttendanceProfile.create({
                userRecId: userRecId,
                locationId: locationId,
                zoneDateTime: submitteddatetime,
            });

            const proId = addProfile.id;

            // Add new attendance detail with the created profileId
            const addDetails = await EmpAttendanceDetails.create({
                profileId: proId,
                typeId: typeId,
                activeStatus: 1,
                typeDateTime: submitteddatetime,
            });

            dispatchSuc(res, { data: addDetails, message: getShiftName+' Successfully' });
            return;
        }
        
         // If typeId = 3, update activeStatus of previous entries to 0 for that typeId and set 1 for the new one
         if (typeId == 3) {
            await EmpAttendanceDetails.update(
                { activeStatus: 0 },
                { where: { typeId: 2, profileId: profileId, activeStatus: 1,isActive:1 } }
            );

            const addDetails = await EmpAttendanceDetails.create({
                profileId: profileId,
                typeId: typeId,
                activeStatus: 0,
                typeDateTime: submitteddatetime,
            });

            dispatchSuc(res, { data: addDetails, message: getShiftName+' Successfully' });
            return;
        }
        if (typeId == 4) {
            await EmpAttendanceDetails.update(
                { activeStatus: 0 },
                { where: { profileId: profileId,isActive:1 } }
            );

            const addDetails = await EmpAttendanceDetails.create({
                profileId: profileId,
                typeId: typeId,
                activeStatus: 0,
                typeDateTime: submitteddatetime,
            });
            dispatchSuc(res, { data: addDetails, message: getShiftName+' Successfully' });
            return;
        }
        const addDetails = await EmpAttendanceDetails.create({
            profileId: profileId,
            typeId: typeId,
            activeStatus: 1,
            typeDateTime: submitteddatetime,
        });
        res.status(200).json({ status: true, data: addDetails, message: getShiftName+' Successfully' });
        return;
    } catch (error) {
        console.error('Error fetching Data:', error);
        dispatchErr(res, { message: 'Something went wrong. Please try again later.' }, 500);
        return;
    }
};

export const getLastEvent = async (req: Request, res: Response): Promise<void> => {
    try {
        const { userRecId,locationId,currentdate } = req.query;
        const getLastData: EmpAttendanceProfile[] = await EmpAttendanceProfile.findAll({
            //@ts-ignore
            where : {
                userRecId: userRecId,
                locationId: locationId,
                [Op.and]: Sequelize.literal(`CAST(zoneDateTime AS DATE) = '${currentdate}'`),
                isActive:1
            },
            include : [
                {
                    model: EmpAttendanceDetails,
                    as : 'attendanceProfileId',
                    where : {
                        activeStatus : 1,
                        isActive:1
                    }
                }
            ]
        })
        dispatchSuc(res, { data: getLastData, message: 'Data retrieved successfully.' });
    } catch (error) {
        console.error('Error fetching Last Event:', error);
        dispatchErr(res, { message: 'Something went wrong. Please try again later.' }, 500);
    }
};

export const getMyTimeCareReport = async (req: Request, res: Response): Promise<void> => {
    try {
       const { userRecId } = req.query;
        const getMyData = await EmpAttendanceProfile.findAll({
            //@ts-ignore
            where :{
                userRecId:userRecId,
                isActive:1
            },
            include : [
                {
                    model: EmpAttendanceDetails,
                    as : 'attendanceProfileId',                  
                }
            ]
        })
        const result = getMyData.map(profile => {
            //@ts-ignore
            const attendanceRecords = profile.attendanceProfileId as EmpAttendanceDetails[];

            // Filter records for typeId: 1 (Shift Start) and typeId: 2 (Shift End)
            const shiftStart = attendanceRecords.find(record => record.typeId === 1);
            const shiftEnd = attendanceRecords.find(record => record.typeId === 4);

            let totalHoursFormatted = null;

            // Calculate difference if both start and end exist
            if (shiftStart && shiftEnd) {
                const start = new Date(shiftStart.typeDateTime);
                const end = new Date(shiftEnd.typeDateTime);
                const diffMs = end.getTime() - start.getTime(); // Difference in milliseconds

                // Convert milliseconds to hours, minutes, and seconds
                const hours = Math.floor(diffMs / (1000 * 60 * 60));
                const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
                const seconds = Math.floor((diffMs % (1000 * 60)) / 1000);

                // Format as HH:mm:ss
                totalHoursFormatted = `${hours.toString().padStart(2, '0')}:${minutes
                    .toString()
                    .padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
            }

            return {
                profileId: profile.id,
                userRecId: profile.userRecId,
                locationId: profile.locationId,
                date: profile.zoneDateTime,
                totalHoursFormatted,
            };
        });
        dispatchSuc(res, { data: result, message: 'Data retrieved successfully.' });
    } catch (error) {
        console.error('Error fetching Time Card Report:', error);
        dispatchErr(res, { message: 'Something went wrong. Please try again later.' }, 500);
    }
};

export const getTeamTimeCareReport = async (req: Request, res: Response): Promise<void> => {
    try {
        const { userRecId} = req.query;
        const getTeamData = await EmpAttendanceProfile.findAll({
            where :{
                isActive:1
            },
            include : [
                {
                    model: EmpAttendanceDetails,
                    as : 'attendanceProfileId',                  
                }
            ]
        })
        const result = getTeamData.map(profile => {
            //@ts-ignore
            const attendanceRecords = profile.attendanceProfileId as EmpAttendanceDetails[];

            // Filter records for typeId: 1 (Shift Start) and typeId: 2 (Shift End)
            const shiftStart = attendanceRecords.find(record => record.typeId === 1);
            const shiftEnd = attendanceRecords.find(record => record.typeId === 4);

            let totalHoursFormatted = null;

            // Calculate difference if both start and end exist
            if (shiftStart && shiftEnd) {
                const start = new Date(shiftStart.typeDateTime);
                const end = new Date(shiftEnd.typeDateTime);
                const diffMs = end.getTime() - start.getTime(); // Difference in milliseconds

                // Convert milliseconds to hours, minutes, and seconds
                const hours = Math.floor(diffMs / (1000 * 60 * 60));
                const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
                const seconds = Math.floor((diffMs % (1000 * 60)) / 1000);

                // Format as HH:mm:ss
                totalHoursFormatted = `${hours.toString().padStart(2, '0')}:${minutes
                    .toString()
                    .padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
            }

            return {
                profileId: profile.id,
                userRecId: profile.userRecId,
                locationId: profile.locationId,
                date: profile.zoneDateTime,
                totalHoursFormatted,
            };
        });
        dispatchSuc(res, { data: result, message: 'Data retrieved successfully.' });
       
    } catch (error) {
        console.error('Error fetching Time Card Report:', error);
        dispatchErr(res, { message: 'Something went wrong. Please try again later.' }, 500);
    }
};

export const getAttendanceTypes= async (req: Request, res: Response): Promise<void> => {
    try {
       // const { userRecId,locationId,currentdate } = req.body;
        const getTypes = await EmpAttendanceType.findAll({
            where :{
                isActive:1
            },
        })
        dispatchSuc(res, { data: getTypes, message: 'Data retrieved successfully.' });
    } catch (error) {
        console.error('Error fetching Attendance Types:', error);
        dispatchErr(res, { message: 'Something went wrong. Please try again later.' }, 500);
    }
};