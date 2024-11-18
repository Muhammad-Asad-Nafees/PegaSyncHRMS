'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
        // Retrieve the inserted companies to get their IDs
    const companies = await queryInterface.sequelize.query(
      'SELECT id, clientID FROM Company WHERE companyName IN (:companyName)',
      {
        replacements: { companyName: ['Company A', 'Company B'] },
        type: Sequelize.QueryTypes.SELECT,
      }
    );
     await queryInterface.bulkInsert(
      'jobs',
      [
        {
          jobName: 'Manager',
          jobDesc: 'Manager User',
          jobLevelID: 1,
          companyID: companies[0].id,
          isActive: 1,
          isDeleted: 0,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          jobName: 'Employee',
          jobDesc: 'Employee User',
          jobLevelID: 2,
          companyID: companies[1].id,
          isActive: 1,
          isDeleted: 0,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );

    // Insert data into Locations table
    await queryInterface.bulkInsert(
      'locations',
      [
        {
          location: 'Trex Head Office',
          locationUID: '101010',
          companyID: companies[0].id,
          isActive: 1,
          isDeleted: 0,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          location: 'PegaSync Office Bahadurabad',
          locationUID: '121312',
          companyID: companies[1].id,
          isActive: 1,
          isDeleted: 0,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );

      // Retrieve the inserted locations to get their IDs
      const loc = await queryInterface.sequelize.query(
        'SELECT id FROM locations WHERE location IN (:locations)',
        {
          replacements: { locations: ['Trex Head Office', 'PegaSync Office Bahadurabad'] },
          type: Sequelize.QueryTypes.SELECT,
        }
      );

    // Insert data into LocationDetails table
    await queryInterface.bulkInsert(
      'locationDetails',
      [
        {
          latitude: '24.862327386674455',
          longitude: '67.06398107369631',
          locationID: loc[0].id,
          radius: 2,
          timeClockSessionDuration: 1,
          isRangeAlert: 1,
          locationAlertInterval: 1,
          gracePeriod: 1,
          isTimeZoneCheck: 1,
          isScheduled: 1,
          isActive: 1,
          isDeleted: 0,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          latitude: '24.860244748346737',
          longitude: '67.05685370859214',
          locationID: loc[1].id,
          radius: 2,
          timeClockSessionDuration: 1,
          isRangeAlert: 1,
          locationAlertInterval: 1,
          gracePeriod: 1,
          isTimeZoneCheck: 1,
          isScheduled: 1,
          isActive: 1,
          isDeleted: 0,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );

    // Insert data into roles table
    await queryInterface.bulkInsert(
      'roles',
      [
        {
          role: 'Manager Trex',
          roleDesc: 'Manager Trex User',
          locationID: loc[0].id,
          JobID: 1,
          companyID: companies[0].id,
          isActive: 1,
          isDeleted: 0,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          role: 'Employee Trex',
          roleDesc: '67.05685370859214',
          locationID: loc[0].id,
          JobID: 2,
          companyID: companies[0].id,
          isActive: 1,
          isDeleted: 0,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          role: 'Manager PegaSync',
          roleDesc: 'Manager PegaSync User',
          locationID: loc[1].id,
          JobID: 1,
          companyID: companies[1].id,
          isActive: 1,
          isDeleted: 0,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          role: 'Employee PegaSync',
          roleDesc: 'Employee PegaSync User',
          locationID: loc[1].id,
          JobID: 2,
          companyID: companies[1].id,
          isActive: 1,
          isDeleted: 0,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );

    // Retrieve the inserted locations to get their IDs
    const rol = await queryInterface.sequelize.query(
      'SELECT id FROM roles WHERE role IN (:roles)',
      {
        replacements: { roles: ['Manager PegaSync', 'Employee PegaSync'] },
        type: Sequelize.QueryTypes.SELECT,
      }
    );

    const users = await queryInterface.sequelize.query(
      'SELECT id FROM Users WHERE userRecId IN (:userRecId)',
      {
        replacements: { userRecId: [1, 2] },
        type: Sequelize.QueryTypes.SELECT,
      }
    );
     // Insert data into roleassignments table
     await queryInterface.bulkInsert(
      'roleassignments',
      [
        {
       
          roleID: rol[0].id,
          userRecID:users[0].id,
          isActive: 1,
          isDeleted: 0,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          roleID: rol[0].id,
          userRecID: users[1].id,
          isActive: 1,
          isDeleted: 0,
          createdAt: new Date(),
          updatedAt: new Date(),
        },       
      ],
      {}
    );
   
     // Insert data into permissions table
     await queryInterface.bulkInsert(
      'permissions',
      [
        {
       
          permission: 'Time Clock',
          permissionDesc: 'Time Clock',
          companyID:  companies[0].id,
          isActive: 1,
          isDeleted: 0,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          permission: 'Time Card',
          permissionDesc: 'Time Card',
          companyID:  companies[1].id,
          isActive: 1,
          isDeleted: 0,
          createdAt: new Date(),
          updatedAt: new Date(),
        },       
      ],
      {}
    );


     // Retrieve the inserted permissions to get their IDs
     const perm = await queryInterface.sequelize.query(
      'SELECT id FROM permissions WHERE permission IN (:permissions)',
      {
        replacements: { permissions: ['Time Clock', 'Time Card'] },
        type: Sequelize.QueryTypes.SELECT,
      }
    );
    // Insert data into permassignments table
    await queryInterface.bulkInsert(
      'permassignments',
      [
        {
       
          roleID: rol[0].id,
          permID: perm[0].id,
          isActive: 1,
          isDeleted: 0,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          roleID: rol[1].id,
          permID: perm[1].id,
          isActive: 1,
          isDeleted: 0,
          createdAt: new Date(),
          updatedAt: new Date(),
        },       
      ],
      {}
    );
  },

  async down (queryInterface, Sequelize) {
    // Delete records from jobs table
    await queryInterface.bulkDelete('jobs', null, {});

    // Delete records from locations table
    await queryInterface.bulkDelete('locations', null, {});

    // Delete records from locationdetails table
    await queryInterface.bulkDelete('locationdetails', null, {});

    // Delete records from roles table
    await queryInterface.bulkDelete('roles', null, {});

    // Delete records from roleassignment table
    await queryInterface.bulkDelete('roleassignment', null, {});

    // Delete records from permissions table
    await queryInterface.bulkDelete('permissions', null, {});

    // Delete records from permassignments table
    await queryInterface.bulkDelete('permassignments', null, {});
  }
};
