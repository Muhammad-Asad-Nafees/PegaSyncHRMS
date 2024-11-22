'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('permissions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      permission: {
        type: Sequelize.STRING
      },
      permissionDesc: {
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
      tableId: {
        type: Sequelize.INTEGER,
        defaultValue: 11
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
    await queryInterface.dropTable('permissions');
  }
};