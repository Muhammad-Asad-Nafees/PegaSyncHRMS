'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('companyConfigValue', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      periodTypeId: {
        type: Sequelize.INTEGER
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
        allowNull: false,
        defaultValue: 4
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
    await queryInterface.dropTable('companyConfigValue');
  }
};