import { Sequelize } from 'sequelize';
import Users, { init as initUsers } from './models/Users';
import UserProfile, { init as initUserProfile } from './models/UserProfile';

async function seedData() {
  const sequelize = new Sequelize('database', 'username', 'password', {
    host: 'localhost',
    dialect: 'mysql', // Or your preferred dialect
  });

  initUsers(sequelize);
  initUserProfile(sequelize);

  try {
    await sequelize.sync({ force: false });

    // Create a user
    const user = await Users.create({
      userRecId: 1,
      hashPassword: 'hashedPassword123',
      profileId: 1,
      firstName: 'John',
      companyId: 1,
      isActive: 1,
    });

    // Create a user profile
    const userProfile = await UserProfile.create({
      userId: user.id,
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
    });

    console.log('User and Profile seeded:', user.toJSON(), userProfile.toJSON());
  } catch (error) {
    console.error('Error seeding data:', error);
  } finally {
    await sequelize.close();
  }
}

seedData();
