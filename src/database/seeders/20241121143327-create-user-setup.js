'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    
    await queryInterface.bulkInsert(
      'users',
      [
        {
          hashPassword: '$2b$12$xTl5HxZgXCfwhgkU2nsG9ePXGWRQyFlNpzytEQ.tabAo8RO0RFM2a',
          firstName: 'Asad',
          lastName: 'Nafees',
          displayName: 'Asad Nafees',
          companyEmail: 'asad.nafees@pegasync.com',
          actualEmail: 'asadsheikh406@gmail.com',
          phoneNo: '0318-0730179',        
          zipCode: '12134',
          address: 'Korangi,Crossing Lucknow Society, House No CI-14',
          countryId:1,
          city: 'Karachi',
          state: 'Sindh',
          companyId: 1,
          tableId: 6,
          isActive: 1,
          isDeleted: 0,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
     // Retrieve the inserted clients to get their IDs
     const user = await queryInterface.sequelize.query(
      'SELECT id FROM users WHERE displayName IN (:displayName)',
      {
        replacements: { displayName: ['Asad Nafees'] },
        type: Sequelize.QueryTypes.SELECT,
      }
    );
    await queryInterface.bulkInsert(
      'roleAssignments',
      [
        {
          roleId: 1,
          userRecId: user[0].id,
          tableId: 10,
          isActive: 1,
          isDeleted: 0,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
    await queryInterface.bulkInsert(
      'permAssignments',
      [
        {
          permId: 1,
          roleId: 1,
          tableId: 12,
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
    await queryInterface.bulkDelete('users', null, {});
    await queryInterface.bulkDelete('roleAssignments', null, {});
    await queryInterface.bulkDelete('permAssignments', null, {});
  }
};
