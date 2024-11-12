'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.changeColumn('roleassignments', 'roleID', {
      type: Sequelize.INTEGER,
      allowNull: false,  // Ensure the column is not nullable
      references: {
        model: 'roles',  
        key: 'id',        
      },
      onDelete: 'CASCADE',  // Optional: Delete the company record if the client is deleted
    });
    await queryInterface.changeColumn('roleassignments', 'userRecID', {
      type: Sequelize.INTEGER,
      allowNull: false,  // Ensure the column is not nullable
      references: {
        model: 'users',  // Reference to the Users table
        key: 'id',       // Column in the Users table
      },
      onDelete: 'CASCADE',  // Optional: Delete the role assignment if the user is deleted
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.changeColumn('roleassignments', 'roleID', {
      type: Sequelize.INTEGER,
      allowNull: true,  // Make it nullable or revert it as needed
    });
    await queryInterface.changeColumn('roleassignments', 'userRecID', {
      type: Sequelize.INTEGER,
      allowNull: true,  // Make it nullable or revert it as needed
    });
  }
};
