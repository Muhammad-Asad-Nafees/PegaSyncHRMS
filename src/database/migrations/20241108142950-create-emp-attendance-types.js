'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('EmpAttendanceTypes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      typeName: {
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
    await queryInterface.dropTable('EmpAttendanceTypes');
  }
};