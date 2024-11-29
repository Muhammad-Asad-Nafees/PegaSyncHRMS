'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'hrmsTables',
      [
        {
          tableName: 'countries',
          pk_Name: 'id',
          fk_Name: 'tableId',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          tableName: 'clients',
          pk_Name: 'id',
          fk_Name: 'tableId',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          tableName: 'company',
          pk_Name: 'id',
          fk_Name: 'clientId,countryId,tableId',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          tableName: 'companyConfigValue',
          pk_Name: 'id',
          fk_Name: 'companyId,tableId',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          tableName: 'companyApprovalLevels',
          pk_Name: 'id',
          fk_Name: 'companyId,tableId',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          tableName: 'users',
          pk_Name: 'id',
          fk_Name: 'countryId,companyId,tableId',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          tableName: 'locations',
          pk_Name: 'id',
          fk_Name: 'countryId,companyId,tableId',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          tableName: 'jobs',
          pk_Name: 'id',
          fk_Name: 'companyId,tableId',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          tableName: 'roles',
          pk_Name: 'id',
          fk_Name: 'companyId,locationId,jobId,tableId',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          tableName: 'roleAssignments',
          pk_Name: 'id',
          fk_Name: 'roleId,userRecId,tableId',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          tableName: 'permissions',
          pk_Name: 'id',
          fk_Name: 'companyId,tableId',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          tableName: 'permAssignments',
          pk_Name: 'id',
          fk_Name: 'permId,roleId,tableId',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          tableName: 'empAttendanceTypes',
          pk_Name: 'id',
          fk_Name: 'companyId,tableId',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          tableName: 'empAttendanceProfiles',
          pk_Name: 'id',
          fk_Name: 'userRecId,locationId,tableId',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          tableName: 'empAttendanceDetails',
          pk_Name: 'id',
          fk_Name: 'profileId,typeId,tableId',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          tableName: 'empAttendanceAlerts',
          pk_Name: 'id',
          fk_Name: 'tableId',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          tableName: 'empAttendanceCoordinates',
          pk_Name: 'id',
          fk_Name: 'userRecId,tableId',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          tableName: 'timeCorrections',
          pk_Name: 'id',
          fk_Name: 'submittedBy,requestedFor,typeId,empProfileId,empDetailId,tableId',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          tableName: 'approvalProfiles',
          pk_Name: 'id',
          fk_Name: 'tableId',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          tableName: 'approvalDetails',
          pk_Name: 'id',
          fk_Name: 'profileId,tableId',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          tableName: 'userAppSessions',
          pk_Name: 'id',
          fk_Name: 'userRecId,tableId',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          tableName: 'empScheduleMasters',
          pk_Name: 'id',
          fk_Name: 'submittedBy,requestedFor,locationId,tableId',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          tableName: 'scheduletypes',
          pk_Name: 'id',
          fk_Name: 'companyId,tableId',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );

  },

  async down (queryInterface, Sequelize) {
     // Delete records from UserProfile table
     await queryInterface.bulkDelete('hrmsTables', null, {});

  }
};
