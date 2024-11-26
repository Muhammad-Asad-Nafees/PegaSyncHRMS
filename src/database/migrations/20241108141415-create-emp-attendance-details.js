'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('empAttendanceDetails', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      profileId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        foreignKey: true,
        references: {
          model: 'empAttendanceProfiles',
          key: 'id',
        },
        onUpdate: 'cascade',
        onDelete: 'cascade'
      },
      typeId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        foreignKey: true,
        references: {
          model: 'empAttendanceTypes',
          key: 'id',
        },
        onUpdate: 'cascade',
        onDelete: 'cascade'
      },
      typeDateTime: {
        type: Sequelize.STRING
      },
      activeStatus: {
        type: Sequelize.INTEGER
      },
      isMissedPunch: {
        type: Sequelize.INTEGER
      },
      tableId: {
        type: Sequelize.INTEGER,
        defaultValue: 15
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
    await queryInterface.dropTable('empAttendanceDetails');
  }
};