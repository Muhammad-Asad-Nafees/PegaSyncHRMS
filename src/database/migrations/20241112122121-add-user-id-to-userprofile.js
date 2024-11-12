'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Add userId column to the user_profile table
    await queryInterface.addColumn('userprofile', 'userId', {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'users',  // Reference to the Users table
        key: 'id',       // The column in the Users table
      },
      onDelete: 'CASCADE', // Optional: Delete the profile if the associated user is deleted
    });
  },

  async down(queryInterface, Sequelize) {
    // Remove userId column from user_profile table if rolling back
    await queryInterface.removeColumn('userprofile', 'userId');
  }
};
