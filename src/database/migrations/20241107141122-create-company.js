'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('company', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      clientId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        foreignKey: true,
        references: {
          model: 'clients',
          key: 'id',
        },
        onUpdate: 'cascade',
        onDelete: 'cascade'
      },
      companyName: {
        allowNull: false,
        type: Sequelize.STRING
      },
      companyAddress: {
        allowNull: false,
        type: Sequelize.STRING
      },
      zipCode: {
        allowNull: false,
        type: Sequelize.STRING
      },
      countryId: {
        allowNull: true,
        type: Sequelize.INTEGER,
        foreignKey: true,
        references: {
          model: 'countries',
          key: 'id',
        },
        onUpdate: 'cascade',
        onDelete: 'cascade',
      },
      city: {
        allowNull: true,
        type: Sequelize.STRING
      },
      state: {
        allowNull: true,
        type: Sequelize.STRING
      },
      tableId: {
        type: Sequelize.INTEGER,
        defaultValue:3
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
    await queryInterface.dropTable('company');
  }
};