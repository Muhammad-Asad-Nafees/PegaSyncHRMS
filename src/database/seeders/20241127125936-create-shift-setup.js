'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'scheduletypes',
      [
        {
          name: 'Morning Shift',
          description: 'Start from 12 PM to 9 PM',
          startTime: '12:00:00',
          endTime: '21:00:00',
          isNight: 0,
          companyId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Day Night Shift',
          description: 'Start from 3 PM to 12 AM',
          startTime: '15:00:00',
          endTime: '00:00:00',
          isNight: 0,
          companyId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Night Shift',
          description: 'Start from 6 PM to 3 AM',
          startTime: '18:00:00',
          endTime: '3:00:00',
          isNight: 1,
          companyId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('scheduletypes', null, {});
  }
};
