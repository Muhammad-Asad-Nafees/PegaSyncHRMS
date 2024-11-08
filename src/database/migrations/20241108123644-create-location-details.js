'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('LocationDetails', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      locationID: {
        type: Sequelize.INTEGER
      },
      profileID: {
        type: Sequelize.INTEGER
      },
      latitude: {
        type: Sequelize.STRING
      },
      longitude: {
        type: Sequelize.STRING
      },
      radius: {
        type: Sequelize.INTEGER
      },
      timeClockSessionDuration: {
        type: Sequelize.INTEGER
      },
      isRangeAlert: {
        type: Sequelize.INTEGER
      },
      locationAlertInterval: {
        type: Sequelize.INTEGER
      },
      gracePeriod: {
        type: Sequelize.INTEGER
      },
      isTimeZoneCheck: {
        type: Sequelize.INTEGER
      },
      isScheduled: {
        type: Sequelize.INTEGER
      },
      isActive: {
        allowNull: false,
        type: Sequelize.INTEGER,
        default: 1
      },
      isDeleted: {
        allowNull: false,
        type: Sequelize.INTEGER,
        default: 0
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('LocationDetails');
  }
};