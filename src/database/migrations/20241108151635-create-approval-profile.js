'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('approvalProfiles', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      requestId: {
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
      tableId: {
        type: Sequelize.INTEGER,
        defaultValue: 19
      },
      isActive: {
        type: Sequelize.INTEGER,
        defaultValue: 1
      },
      isDeleted: {
        type: Sequelize.INTEGER,
        defaultValue: 0
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
    await queryInterface.dropTable('approvalProfiles');
  }
};