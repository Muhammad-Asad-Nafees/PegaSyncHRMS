import { Request, Response } from 'express';
import { Users, Location,EmpAttendanceProfile,EmpAttendanceDetails } from '../database';
import { Op,Sequelize } from 'sequelize';
import EmpAttendanceType from '../database/models/empattendancetypes';
const sequelize = new Sequelize('pegasynchrms', 'root', 'root', {
    host: 'localhost', // Replace with your database host
    dialect: 'mysql',  // Replace with your database dialect (e.g., mysql, postgres, etc.)
});

export const checkLocation = async (req: Request, res: Response): Promise<void> => {
    try {
        const { userRecId,latitude, longitude } = req.body;
        const location = await Location.findAll({
            where:{
                isActive:1
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
                parseFloat(latitude),
                parseFloat(longitude),
                parseFloat(location.latitude),
                parseFloat(location.longitude)
            );
            return distance < 0.2; // Check if within 0.2 km
        });
        if (nearbyLocations.length > 0) {
            res.status(200).json({ status: true, data: nearbyLocations, message: 'Location within radius.' });
        } else {
            res.status(200).json({ status: false, message: 'No locations found within the specified radius.' });
        }
        
    } catch (error) {
        console.error('Error fetching Location:', error);
        res.status(500).send({ error: 'Failed to fetch Location', details: error });
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
                    as : 'attendanceProfileId',
                    where : {
                        activeStatus : 1,
                        isActive:1
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

            res.status(200).json({ status: true, data: addDetails, message: getShiftName+' Successfully' });
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

            res.status(200).json({ status: true, data: addDetails, message: getShiftName+' Successfully' });
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

            res.status(200).json({ status: true, data: addDetails, message: getShiftName+' Successfully' });
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
        res.status(200).json({ 
            status: false, 
            data: null, 
            message: 'Failed to fetch last event. Please try again later.' 
        });
        return;
    }
};

export const getLastEvent = async (req: Request, res: Response): Promise<void> => {
    try {
        const { userRecId,locationId,currentdate } = req.body;
        const getLastData = await EmpAttendanceProfile.findAll({
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
        res.status(200).json({ 
            status: true, 
            data: getLastData, 
            message: 'Data retrieved successfully.' 
        });
    } catch (error) {
        console.error('Error fetching Last Event:', error);
        res.status(200).json({ 
            status: false, 
            data: null, 
            message: 'Failed to fetch last event. Please try again later.' 
        });
    }
};

export const getTimeCareReport = async (req: Request, res: Response): Promise<void> => {
    try {
       // const { userRecId,locationId,currentdate } = req.body;
        const getLastData = await EmpAttendanceProfile.findAll({
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
        res.status(200).json({ status: true, data: getLastData, message: 'Data retrieved successfully.' });
    } catch (error) {
        console.error('Error fetching Time Card Report:', error);
        res.status(200).json({ 
            status: false, 
            data: null, 
            message: 'Failed to fetch last event. Please try again later.' 
        });
    }
};