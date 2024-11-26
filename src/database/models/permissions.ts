import { Model, DataTypes, Sequelize, CreationOptional, InferAttributes, InferCreationAttributes } from 'sequelize';
import PermAssignment from './permassignments';

// Define the Permission model class
class Permission extends Model<InferAttributes<Permission>, InferCreationAttributes<Permission>> {
  declare id: CreationOptional<number>;
  declare permission: string;
  declare permissionDesc: string;
  declare companyID: number;
}

export default Permission;

// Initialize the Permission model in Sequelize
export function init(sequelize: Sequelize) {
  Permission.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      permission: {
        type: DataTypes.STRING,
        allowNull: true, // `permission` can be nullable
      },
      permissionDesc: {
        type: DataTypes.STRING,
        allowNull: true, // `permissionDesc` can be nullable
      },
      companyID: {
        type: DataTypes.INTEGER,
        allowNull: true, // `companyID` can be nullable
      },
    },
    {
      sequelize,
      modelName: 'Permission', // Sequelize model name
      tableName: 'permissions', // Corresponding table name in DB
    }
  );
}

// Define associations (if necessary)
export function associate() {
  // Example associations (if you have relationships with other models):
  Permission.hasMany(PermAssignment, { foreignKey: 'permId', as: 'permAssignments' });
}
