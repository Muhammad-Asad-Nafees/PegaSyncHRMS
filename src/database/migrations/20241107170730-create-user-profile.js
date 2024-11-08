'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('UserProfiles', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      profileID: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      employeeID: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      firstName: {
        allowNull: false,
        type: Sequelize.STRING
      },
      lastName: {
        allowNull: false,
        type: Sequelize.STRING
      },
      displayName: {
        allowNull: false,
        type: Sequelize.STRING
      },
      phoneNo: {
        allowNull: false,
        type: Sequelize.STRING
      },
      companyEmail: {
        allowNull: false,
        type: Sequelize.STRING
      },
      actualEmail: {
        allowNull: false,
        type: Sequelize.STRING
      },
      personalAddress: {
        allowNull: false,
        type: Sequelize.STRING
      },
      hireDate: {
        allowNull: false,
        type: Sequelize.DATE
      },
      personalAddress: {
        allowNull: false,
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
    await queryInterface.dropTable('UserProfiles');
  }
};