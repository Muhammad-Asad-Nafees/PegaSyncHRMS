'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('approvalDetails', {
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
          model: 'approvalProfiles',
          key: 'id',
        },
        onUpdate: 'cascade',
        onDelete: 'cascade'
      },
      approverID: {
        type: Sequelize.INTEGER
      },
      comment: {
        type: Sequelize.STRING
      },
      isDeclined: {
        type: Sequelize.INTEGER
      },
      tableId: {
        type: Sequelize.INTEGER,
        defaultValue: 20
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
    await queryInterface.dropTable('approvalDetails');
  }
};