import {
    CreationOptional,
    DataTypes,
    InferAttributes,
    InferCreationAttributes,
    Model,
    Sequelize,
} from 'sequelize';
import Users from './user';
// import bcrypt from 'bcrypt';

class UserProfile extends Model<InferAttributes<UserProfile>, InferCreationAttributes<UserProfile>> {
  declare id: CreationOptional<number>;
  declare userId: number; // Foreign key to Users table
  declare profileID: number;
  declare employeeID: number;
  declare firstName: string;
  declare lastName: string;
  declare displayName: string;
  declare phoneNo: string;
  declare companyEmail: string;
  declare actualEmail: string;
  declare personalAddress: string;
  declare hireDate: Date;
  declare isActive: CreationOptional<number>;
  declare isDeleted: CreationOptional<number>;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
}

export default UserProfile;

export function init(sequelize: Sequelize) {
  UserProfile.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      userId: { // Foreign key column
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'users', // Reference to Users table
          key: 'id',      // Foreign key references Users.id
        },
        onDelete: 'CASCADE', // Optional: Delete the user profile if the user is deleted
      },
      profileID: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      employeeID: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      displayName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      phoneNo: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      companyEmail: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      actualEmail: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      personalAddress: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      hireDate: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      isActive: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1, 
      },
      isDeleted: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0, 
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW, 
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW, 
      },
    },
    {
      sequelize,
      modelName: 'UserProfile', 
      tableName: 'user_profile', 
      createdAt: 'createdAt',
      updatedAt: 'updatedAt',
    }
  );
}

// Define associations (optional)
export function associate() {
  UserProfile.belongsTo(Users, { foreignKey: 'userId' }); // Define the association
}
