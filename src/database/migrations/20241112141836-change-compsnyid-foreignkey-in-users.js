'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
  
    await queryInterface.changeColumn('users', 'companyId', {
      type: Sequelize.INTEGER,
      allowNull: false,  // Ensure the column is not nullable
      references: {
        model: 'company',  
        key: 'id',        
      },
      onDelete: 'CASCADE',  // Optional: Delete the company record if the client is deleted
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.changeColumn('users', 'companyId', {
      type: Sequelize.INTEGER,
      allowNull: true,  // Make it nullable or revert it as needed
    });
  }
};
