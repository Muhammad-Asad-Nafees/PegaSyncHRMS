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
      userRecId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        foreignKey: true,
        references: {
          model: 'users',
          key: 'id',
        },
        onUpdate: 'cascade',
        onDelete: 'cascade'
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
      tableId: {
        type: Sequelize.INTEGER,
        defaultValue: 18
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
    await queryInterface.dropTable('userAppSessions');
  }
};