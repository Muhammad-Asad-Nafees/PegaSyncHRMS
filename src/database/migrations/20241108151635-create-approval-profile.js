'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('ApprovalProfiles', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      requestID: {
        type: Sequelize.INTEGER
      },
      isApproved: {
        type: Sequelize.INTEGER
      },
      requestDate: {
        type: Sequelize.DATE
      },
      submittedDate: {
        type: Sequelize.DATE
      },
      zoneDateTime: {
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
    await queryInterface.dropTable('ApprovalProfiles');
  }
};