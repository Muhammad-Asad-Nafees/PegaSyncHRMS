'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('locations', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      location: {
        type: Sequelize.STRING
      },
      locationUID: {
        type: Sequelize.STRING
      },
      companyId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        foreignKey: true,
        references: {
          model: 'company',
          key: 'id',
        },
        onUpdate: 'cascade',
        onDelete: 'cascade'
      },
      countryId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        foreignKey: true,
        references: {
          model: 'countries',
          key: 'id',
        },
        onUpdate: 'cascade',
        onDelete: 'cascade'
      },
      city: {
        type: Sequelize.STRING
      },
      zipCode: {
        type: Sequelize.STRING
      },
      address: {
        type: Sequelize.STRING
      },
      latitude: {
        type: Sequelize.STRING
      },
      longitude: {
        type: Sequelize.STRING
      },
      radius: {
        type: Sequelize.INTEGER,
        default: 1
      },
      timeClockSessionDuration: {
        type: Sequelize.INTEGER,
        default: 15
      },
      isRangeAlert: {
        type: Sequelize.INTEGER,
        default: 1
      },
      locationAlertInterval: {
        type: Sequelize.INTEGER,
        default: 30
      },
      gracePeriod: {
        type: Sequelize.INTEGER,
        default: 30
      },
      isTimeZoneCheck: {
        type: Sequelize.INTEGER,
        default: 1
      },
      isScheduled: {
        type: Sequelize.INTEGER,
        default: 1
      },
      takeAwayMealHours: {
        allowNull: true,
        type: Sequelize.INTEGER,
        default: 1
      },
      tableId: {
        type: Sequelize.INTEGER,
        defaultValue: 7
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
    await queryInterface.dropTable('locations');
  }
};