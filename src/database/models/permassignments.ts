import { Model, DataTypes, Sequelize, CreationOptional, InferAttributes, InferCreationAttributes } from 'sequelize';
import Roles from './roles';
import Permissions from './permissions';


// Define the PermAssignment model class
class PermAssignment extends Model<InferAttributes<PermAssignment>, InferCreationAttributes<PermAssignment>> {
  declare id: CreationOptional<number>;
  declare permId: number;
  declare roleId: number;
  declare isActive: CreationOptional<number>;
  
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
      permId: { // Foreign key column
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'permissions', // Reference to Users table
          key: 'id',      // Foreign key references Users.id
        },
        onDelete: 'CASCADE', // Optional: Delete the user profile if the user is deleted
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
      isActive: {
        type: DataTypes.INTEGER,
        defaultValue: 1,
      },
     
    },
    {
      sequelize,
      modelName: 'PermAssignment', // Sequelize model name
      tableName: 'permAssignments', // Corresponding table name in DB
    }
  );
}

// Define associations (if necessary)
export function associate() {
  // Example associations (if you have relationships with other models):
  PermAssignment.belongsTo(Roles, { foreignKey: 'roleId',as : 'rolesPermAssign' });
  PermAssignment.belongsTo(Permissions, { foreignKey: 'permId', as : 'permPermAssign' });
}
