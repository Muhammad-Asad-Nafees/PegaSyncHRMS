'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('TimeCorrections', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      submittedBy: {
        type: Sequelize.INTEGER
      },
      requestedFor: {
        type: Sequelize.INTEGER
      },
      typeID: {
        type: Sequelize.INTEGER
      },
      correctionTime: {
        type: Sequelize.STRING
      },
      comment: {
        type: Sequelize.STRING
      },
      empProfileID: {
        type: Sequelize.INTEGER
      },
      empDetailID: {
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
    await queryInterface.dropTable('TimeCorrections');
  }
};