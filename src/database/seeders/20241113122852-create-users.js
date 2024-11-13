'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Insert data into Clients table
    await queryInterface.bulkInsert(
      'Clients',
      [
        {
          clientName: 'Test Client 1',
          isActive: 1,
          isDeleted: 0,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          clientName: 'Test Client 2',
          isActive: 1,
          isDeleted: 0,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );

    // Retrieve the inserted clients to get their IDs
    const clients = await queryInterface.sequelize.query(
      'SELECT id FROM Clients WHERE clientName IN (:clientName)',
      {
        replacements: { clientName: ['Test Client 1', 'Test Client 2'] },
        type: Sequelize.QueryTypes.SELECT,
      }
    );

    // Insert data into Company table
    await queryInterface.bulkInsert(
      'Company',
      [
        {
          clientID: clients[0].id, // Reference the first client
          companyName: 'Company A',
          companyAddress: '123 Main Street',
          zipCode: '12345',
          city: 'City A',
          countryID: 1, // Assuming 1 represents a valid country ID
          takeAwayMealHours: 2,
          isActive: 1,
          isDeleted: 0,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          clientID: clients[1].id, // Reference the second client
          companyName: 'Company B',
          companyAddress: '456 Elm Street',
          zipCode: '67890',
          city: 'City B',
          countryID: 2, // Assuming 2 represents a valid country ID
          takeAwayMealHours: 3,
          isActive: 1,
          isDeleted: 0,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );

    // Retrieve the inserted companies to get their IDs
    const companies = await queryInterface.sequelize.query(
      'SELECT id, clientID FROM Company WHERE companyName IN (:companyName)',
      {
        replacements: { companyName: ['Company A', 'Company B'] },
        type: Sequelize.QueryTypes.SELECT,
      }
    );

    // Insert data into Users table
    await queryInterface.bulkInsert(
      'Users',
      [
        {
          userRecId: 1,
          hashPassword: 'hashedPassword123',
          profileId: 1,
          firstName: 'John',
          companyId: companies[0].id, // Reference the first company
          isActive: 1,
          isDeleted: 0,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userRecId: 2,
          hashPassword: 'hashedPassword456',
          profileId: 2,
          firstName: 'Jane',
          companyId: companies[1].id, // Reference the second company
          isActive: 1,
          isDeleted: 0,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );

    // Retrieve the inserted users to get their IDs
    const users = await queryInterface.sequelize.query(
      'SELECT id FROM Users WHERE userRecId IN (:userRecId)',
      {
        replacements: { userRecId: [1, 2] },
        type: Sequelize.QueryTypes.SELECT,
      }
    );

    // Insert data into UserProfile table
    await queryInterface.bulkInsert(
      'userprofile',
      [
        {
          userId: users[0].id, // Reference the first user
          profileID: 1,
          employeeID: 1001,
          firstName: 'John',
          lastName: 'Doe',
          displayName: 'John Doe',
          phoneNo: '123-456-7890',
          companyEmail: 'john.doe@company.com',
          actualEmail: 'john.doe@gmail.com',
          personalAddress: '123 Main Street',
          hireDate: new Date(),
          isActive: 1,
          isDeleted: 0,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: users[1].id, // Reference the second user
          profileID: 2,
          employeeID: 1002,
          firstName: 'Jane',
          lastName: 'Smith',
          displayName: 'Jane Smith',
          phoneNo: '987-654-3210',
          companyEmail: 'jane.smith@company.com',
          actualEmail: 'jane.smith@gmail.com',
          personalAddress: '456 Elm Street',
          hireDate: new Date(),
          isActive: 1,
          isDeleted: 0,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    // Delete records from UserProfile table
    await queryInterface.bulkDelete('userprofile', null, {});

    // Delete records from Users table
    await queryInterface.bulkDelete('Users', null, {});

    // Delete records from Company table
    await queryInterface.bulkDelete('Company', null, {});

    // Delete records from Clients table
    await queryInterface.bulkDelete('Clients', null, {});
  },
};
