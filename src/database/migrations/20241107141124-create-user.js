'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      userRecId: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      hashPassword: {
        type: Sequelize.STRING,
      },
      profileId: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      firstName: {
        type: Sequelize.STRING,
      },
      companyId: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      isActive: {
        type: Sequelize.INTEGER,
        defaultValue: 1,  
      },
      isDeleted: {
        type: Sequelize.INTEGER,
        defaultValue: 0,  
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      deletedAt: {
        type: Sequelize.DATE,
        allowNull: true,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Users');
  }
};