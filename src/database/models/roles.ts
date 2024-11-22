import { Model, DataTypes, Sequelize, CreationOptional, InferAttributes, InferCreationAttributes } from 'sequelize';
import Company from './company';

// Define the Role model class
class Roles extends Model<InferAttributes<Roles>, InferCreationAttributes<Roles>> {
  declare id: CreationOptional<number>;
  declare role: string;
  declare roleDesc: string;
  declare locationId: number;
  declare jobId: number;
  declare companyId: number;
  declare isActive: CreationOptional<number>;
  declare isDeleted: CreationOptional<number>;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
}

export default Roles;

// Initialize the Role model in Sequelize
export function init(sequelize: Sequelize) {
    Roles.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      role: {
        type: DataTypes.STRING,
        allowNull: true, // `role` can be nullable
      },
      roleDesc: {
        type: DataTypes.STRING,
        allowNull: true, // `roleDesc` can be nullable
      },
      locationId: {
        type: DataTypes.INTEGER,
        allowNull: true, // `locationID` can be nullable
      },
      jobId: {
        type: DataTypes.INTEGER,
        allowNull: true, // `JobID` can be nullable
      },
      companyId: {
        type: DataTypes.INTEGER,
        allowNull: true, // `companyID` can be nullable
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
      modelName: 'Roles', // Sequelize model name
      tableName: 'roles', // Corresponding table name in DB
      createdAt: 'createdAt',
      updatedAt: 'updatedAt',
    }
  );
}

// Define associations (if necessary)
export function associate() {
  Roles.belongsTo(Company, { foreignKey: 'companyId', as: 'company' });
  // Example associations (if you have relationships with other models):
  // Role.belongsTo(Location, { foreignKey: 'locationID' });
  // Role.belongsTo(Job, { foreignKey: 'JobID' });
  // Role.belongsTo(Company, { foreignKey: 'companyID' });
}
