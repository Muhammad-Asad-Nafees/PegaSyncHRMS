import { Model, DataTypes, Sequelize, CreationOptional, InferAttributes, InferCreationAttributes } from 'sequelize';
import Roles from './roles';
import Users from './user';

// Define the RoleAssignment model class
class RoleAssignment extends Model<InferAttributes<RoleAssignment>, InferCreationAttributes<RoleAssignment>> {
  declare id: CreationOptional<number>;
  declare roleID: number;
  declare userRecID: number;
  declare isActive: CreationOptional<number>;
  declare isDeleted: CreationOptional<number>;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
}

export default RoleAssignment;

// Initialize the RoleAssignment model in Sequelize
export function init(sequelize: Sequelize) {
  RoleAssignment.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      roleID: { // Foreign key column
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'roles', // Reference to Users table
          key: 'id',      // Foreign key references Users.id
        },
        onDelete: 'CASCADE', // Optional: Delete the user profile if the user is deleted
      },
      userRecID: { // Foreign key column
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'users', // Reference to Users table
          key: 'id',      // Foreign key references Users.id
        },
        onDelete: 'CASCADE', // Optional: Delete the user profile if the user is deleted
      },
      isActive: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1, // Default value for isActive (active)
      },
      isDeleted: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0, // Default value for isDeleted (not deleted)
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
      modelName: 'RoleAssignments', // Sequelize model name
      tableName: 'RoleAssignments', // Corresponding table name in DB
      createdAt: 'createdAt',
      updatedAt: 'updatedAt',
    }
  );
}

// Define associations (if necessary)
export function associate() {
  // Example associations (if you have relationships with other models):
   RoleAssignment.belongsTo(Roles, { foreignKey: 'id' });
   RoleAssignment.belongsTo(Users, { foreignKey: 'id' });
}
