'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    // Modify the existing clientID column to add the foreign key constraint
    await queryInterface.changeColumn('company', 'clientID', {
      type: Sequelize.INTEGER,
      allowNull: false,  // Ensure the column is not nullable
      references: {
        model: 'clients',  // Reference to the Clients table
        key: 'id',         // Column in the Clients table
      },
      onDelete: 'CASCADE',  // Optional: Delete the company record if the client is deleted
    });
  },

  async down (queryInterface, Sequelize) {
    // Revert the changes (remove the foreign key constraint)
    await queryInterface.changeColumn('company', 'clientID', {
      type: Sequelize.INTEGER,
      allowNull: true,  // Make it nullable or revert it as needed
    });
  }
};
