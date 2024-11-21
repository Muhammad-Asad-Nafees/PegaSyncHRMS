'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'countries',
      [
        {
          countryName: 'Pakistan',
          countryCode: 'PK',
          tableId: 1,
          isActive: 1,
          isDeleted: 0,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
     // Retrieve the inserted clients to get their IDs
     const country = await queryInterface.sequelize.query(
      'SELECT id FROM countries WHERE countryName IN (:countryName)',
      {
        replacements: { countryName: ['Pakistan'] },
        type: Sequelize.QueryTypes.SELECT,
      }
    );
    await queryInterface.bulkInsert(
      'clients',
      [
        {
          clientName: 'Hassan Khan',
          tableId: 2,
          isActive: 1,
          isDeleted: 0,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
     // Retrieve the inserted clients to get their IDs
     const clients = await queryInterface.sequelize.query(
      'SELECT id FROM clients WHERE clientName IN (:clientName)',
      {
        replacements: { clientName: ['Hassan Khan'] },
        type: Sequelize.QueryTypes.SELECT,
      }
    );
    await queryInterface.bulkInsert(
      'company',
      [
        {
          clientId: clients[0].id,
          companyName: "PegaSync",
          companyAddress: "Block 6 , PegaSync, Gulshan",
          zipCode: "50130",
          countryId: country[0].id,
          city: "Karachi",
          state: "Sindh",
          tableId: 3,
          isActive: 1,
          isDeleted: 0,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
     // Retrieve the inserted clients to get their IDs
     const company = await queryInterface.sequelize.query(
      'SELECT id FROM company WHERE companyName IN (:companyName)',
      {
        replacements: { companyName: ['PegaSync'] },
        type: Sequelize.QueryTypes.SELECT,
      }
    );
    await queryInterface.bulkInsert(
      'locations',
      [
        {
          location: "PegaSync",
          locationUID: "Block 6 , PegaSync, Gulshan",
          companyId: company[0].id,
          countryId: country[0].id,
          city: "Karachi",
          zipCode: "51234",
          address: "Block 6 , PegaSync, Gulshan",
          latitude: "24.8624770655178",
          longitude: "67.06400592698236",
          radius: 2,
          timeClockSessionDuration: 30,
          isRangeAlert: 1,
          locationAlertInterval: 30,
          gracePeriod: 30,
          isTimeZoneCheck: 1,
          isScheduled: 1,
          takeAwayMealHours: 1,
          tableId: 7,
          isActive: 1,
          isDeleted: 0,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
     // Retrieve the inserted clients to get their IDs
     const loc = await queryInterface.sequelize.query(
      'SELECT id FROM locations WHERE location IN (:location)',
      {
        replacements: { location: ['PegaSync'] },
        type: Sequelize.QueryTypes.SELECT,
      }
    );
    await queryInterface.bulkInsert(
      'jobs',
      [
        {
          jobName: 'Manager',
          jobDesc: 'Manager',
          jobLevelID: 1,
          companyId: company[0].id,
          tableId: 8,
          isActive: 1,
          isDeleted: 0,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
    // Retrieve the inserted clients to get their IDs
    const job = await queryInterface.sequelize.query(
      'SELECT id FROM jobs WHERE jobName IN (:jobName)',
      {
        replacements: { jobName: ['Manager'] },
        type: Sequelize.QueryTypes.SELECT,
      }
    );
    await queryInterface.bulkInsert(
      'roles',
      [
        {
          role: 'Manager Role',
          roleDesc: 'Manager Role',
          locationId: loc[0].id,
          jobId: job[0].id,
          companyId: company[0].id,
          tableId: 9,
          isActive: 1,
          isDeleted: 0,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
    await queryInterface.bulkInsert(
      'permissions',
      [
        {
          permission: 'Time Clock',
          permissionDesc: 'Time Clock',
          companyId: company[0].id,
          tableId: 11,
          isActive: 1,
          isDeleted: 0,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
    await queryInterface.bulkInsert(
      'empAttendanceTypes',
      [
        {
          typeName: 'Shift Start',
          companyId: company[0].id,
          tableId: 13,
          isActive: 1,
          isDeleted: 0,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          typeName: 'Out for Meal',
          companyId: company[0].id,
          tableId: 13,
          isActive: 1,
          isDeleted: 0,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          typeName: 'Back from Meal',
          companyId: company[0].id,
          tableId: 13,
          isActive: 1,
          isDeleted: 0,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          typeName: 'Shift End',
          companyId: company[0].id,
          tableId: 13,
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
    await queryInterface.bulkDelete('countries', null, {});
    await queryInterface.bulkDelete('clients', null, {});
    await queryInterface.bulkDelete('company', null, {});
    await queryInterface.bulkDelete('locations', null, {});
    await queryInterface.bulkDelete('jobs', null, {});
    await queryInterface.bulkDelete('roles', null, {});
    await queryInterface.bulkDelete('permissions', null, {});
    await queryInterface.bulkDelete('empAttendanceTypes', null, {});
  }
};
