'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('jobs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      jobName: {
        type: Sequelize.STRING
      },
      jobDesc: {
        type: Sequelize.STRING
      },
      jobLevelID: {
        type: Sequelize.INTEGER
      },
      companyId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        default: 8
      },
      tableId: {
        type: Sequelize.INTEGER,
        defaultValue:8
      },
      isActive: {
        allowNull: false,
        type: Sequelize.INTEGER,
        defaultValue: 1
      },
      isDeleted: {
        allowNull: false,
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
    await queryInterface.dropTable('jobs');
  }
};