import { Model, DataTypes, Sequelize, CreationOptional, InferAttributes, InferCreationAttributes } from 'sequelize';
import Roles from './roles';
import Permissions from './permissions';


// Define the PermAssignment model class
class PermAssignment extends Model<InferAttributes<PermAssignment>, InferCreationAttributes<PermAssignment>> {
  declare id: CreationOptional<number>;
  declare permID: number;
  declare roleID: number;
  declare isActive: CreationOptional<number>;
  declare isDeleted: CreationOptional<number>;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
}

export default PermAssignment;

// Initialize the PermAssignment model in Sequelize
export function init(sequelize: Sequelize) {
  PermAssignment.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      permID: { // Foreign key column
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'permissions', // Reference to Users table
          key: 'id',      // Foreign key references Users.id
        },
        onDelete: 'CASCADE', // Optional: Delete the user profile if the user is deleted
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
      modelName: 'PermAssignment', // Sequelize model name
      tableName: 'PermAssignments', // Corresponding table name in DB
      createdAt: 'createdAt',
      updatedAt: 'updatedAt',
    }
  );
}

// Define associations (if necessary)
export function associate() {
  // Example associations (if you have relationships with other models):
  PermAssignment.belongsTo(Permissions, { foreignKey: 'permID' });
  PermAssignment.belongsTo(Roles, { foreignKey: 'roleID' });
}
