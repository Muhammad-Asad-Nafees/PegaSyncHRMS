import { Model, DataTypes, Sequelize, CreationOptional, InferAttributes, InferCreationAttributes } from 'sequelize';

// Define the UserAppSession model class
class UserAppSession extends Model<InferAttributes<UserAppSession>, InferCreationAttributes<UserAppSession>> {
  declare id: CreationOptional<number>;
  declare userRecID: number;
  declare latitude: string;
  declare longitude: string;
  declare loginDateTime: Date;
  declare ipAddress: string;
  declare isWebMobile: number;
  declare deviceToken: string;
  declare deviceName: string;
  declare deviceModel: string;
  declare platform: string;
  declare OSVersion: string;
  declare isActive: number;
  declare isDeleted: number;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
}

export default UserAppSession;

// Initialize the UserAppSession model in Sequelize
export function init(sequelize: Sequelize) {
  UserAppSession.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      userRecID: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      latitude: {
        type: DataTypes.STRING,
        allowNull: true, // Assuming latitude can be nullable
      },
      longitude: {
        type: DataTypes.STRING,
        allowNull: true, // Assuming longitude can be nullable
      },
      loginDateTime: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      ipAddress: {
        type: DataTypes.STRING,
        allowNull: true, // Assuming ipAddress can be nullable
      },
      isWebMobile: {
        type: DataTypes.INTEGER,
        allowNull: true, // Assuming isWebMobile can be nullable
      },
      deviceToken: {
        type: DataTypes.STRING,
        allowNull: true, // Assuming deviceToken can be nullable
      },
      deviceName: {
        type: DataTypes.STRING,
        allowNull: true, // Assuming deviceName can be nullable
      },
      deviceModel: {
        type: DataTypes.STRING,
        allowNull: true, // Assuming deviceModel can be nullable
      },
      platform: {
        type: DataTypes.STRING,
        allowNull: true, // Assuming platform can be nullable
      },
      OSVersion: {
        type: DataTypes.STRING,
        allowNull: true, // Assuming OSVersion can be nullable
      },
      isActive: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1, // Default to active
      },
      isDeleted: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0, // Default to not deleted
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW, // Default to current timestamp
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW, // Default to current timestamp
      },
    },
    {
      sequelize,
      modelName: 'UserAppSession', // Model name in Sequelize
      tableName: 'userAppSessions', // Table name in DB
      createdAt: 'createdAt',
      updatedAt: 'updatedAt',
    }
  );
}

// Define associations (if necessary)
export function associate() {
  // Example associations (if you have relationships with other models):
  // UserAppSession.belongsTo(User, { foreignKey: 'userRecID' });
}
