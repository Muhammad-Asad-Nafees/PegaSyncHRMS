import {
    CreationOptional,
    DataTypes,
    InferAttributes,
    InferCreationAttributes,
    Model,
    Sequelize,
} from 'sequelize';
import UserProfile from './userprofile';
import Company from './company';
// import bcrypt from 'bcrypt';





class Users extends Model<InferAttributes<Users>, InferCreationAttributes<Users>> {
    declare id: CreationOptional<number>;
    declare userRecId: CreationOptional<number>;
    declare hashPassword: CreationOptional<string>;
    declare profileId: number;
    declare firstName: CreationOptional<string>;
    declare companyId: number;
    declare isActive: CreationOptional<number>;
    declare isDeleted: CreationOptional<number>;
    declare createdAt: CreationOptional<Date>;
    declare updatedAt: CreationOptional<Date>;
    declare deletedAt: CreationOptional<Date | null>;
  }
  
  export default Users;
  
  export function init(sequelize: Sequelize) {
    Users.init(
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
          allowNull: false,
        },
        userRecId: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        hashPassword: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        profileId: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        firstName: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        companyId: { // Foreign key column
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: 'company', // Reference to Users table
            key: 'id',      // Foreign key references Users.id
          },
          onDelete: 'CASCADE', // Optional: Delete the user profile if the user is deleted
        },
        isActive: {
          type: DataTypes.INTEGER,
          allowNull: true,
          defaultValue: 1, // Default value is 1 (active)
        },
        isDeleted: {
          type: DataTypes.INTEGER,
          allowNull: true,
          defaultValue: 0, // Default value is 0 (not deleted)
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
        deletedAt: {
          type: DataTypes.DATE,
          allowNull: true,
        },
      },
      {
        sequelize,
        modelName: 'Users',
        tableName: 'users',
        createdAt: 'createdAt',
        updatedAt: 'updatedAt',
        deletedAt: 'deletedAt',
        paranoid: true, // Enables soft deletes
      }
    );
  }
  
  export function associate() {
    Users.hasMany(UserProfile, { foreignKey: 'userId' });
    Users.belongsTo(Company, { foreignKey: 'companyId' }); // Define the association
  }

  export { Users };