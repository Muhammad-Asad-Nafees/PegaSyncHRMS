'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('userAppSessions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userRecID: {
        type: Sequelize.INTEGER
      },
      latitude: {
        type: Sequelize.STRING
      },
      longitude: {
        type: Sequelize.STRING
      },
      loginDateTime: {
        type: Sequelize.DATE
      },
      ipAddress: {
        type: Sequelize.STRING
      },
      isWebMobile: {
        type: Sequelize.INTEGER
      },
      deviceToken: {
        type: Sequelize.STRING
      },
      deviceName: {
        type: Sequelize.STRING
      },
      deviceModel: {
        type: Sequelize.STRING
      },
      platform: {
        type: Sequelize.STRING
      },
      OSVersion: {
        type: Sequelize.STRING
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
    await queryInterface.dropTable('userAppSessions');
  }
};