import { Model, DataTypes, Sequelize, CreationOptional, InferAttributes, InferCreationAttributes } from 'sequelize';
import Roles from './roles';
import Users from './user';

// Define the RoleAssignment model class
class RoleAssignment extends Model<InferAttributes<RoleAssignment>, InferCreationAttributes<RoleAssignment>> {
  declare id: CreationOptional<number>;
  declare roleId: number;
  declare userRecId: number;
  declare isActive: CreationOptional<number>;
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
      roleId: { // Foreign key column
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'roles', // Reference to Users table
          key: 'id',      // Foreign key references Users.id
        },
        onDelete: 'CASCADE', // Optional: Delete the user profile if the user is deleted
      },
      userRecId: { // Foreign key column
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
        defaultValue: 1,
      },
    },
    {
      sequelize,
      modelName: 'RoleAssignments', // Sequelize model name
      tableName: 'roleAssignments', // Corresponding table name in DB
    }
  );
}

// Define associations (if necessary)
export function associate() {
  // Example associations (if you have relationships with other models):
   RoleAssignment.belongsTo(Roles, { foreignKey: 'roleId',as : 'role' });
   RoleAssignment.belongsTo(Users, { foreignKey: 'userRecId', as : 'user' });

}
