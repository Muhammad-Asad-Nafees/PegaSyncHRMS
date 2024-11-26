import { Model, DataTypes, Sequelize, CreationOptional, InferAttributes, InferCreationAttributes } from 'sequelize';
import Company from './company';
import Job from './jobs';
import location from './locations';
import RoleAssignment from './roleassignment';
import PermAssignment from './permassignments';

// Define the Role model class
class Roles extends Model<InferAttributes<Roles>, InferCreationAttributes<Roles>> {
  declare id: CreationOptional<number>;
  declare role: string;
  declare roleDesc: string;
  declare locationId: number;
  declare jobId: number;
  declare companyId: number;
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
  Roles.belongsTo(Job, { foreignKey: 'jobId', as: 'job' });
  Roles.belongsTo(location, { foreignKey: 'locationId', as: 'location' });

  
  Roles.hasMany(RoleAssignment, { foreignKey: 'roleId', as: 'roleAssignments' });
  Roles.hasMany(PermAssignment, { foreignKey: 'roleId', as: 'permAssignments' });
  // Example associations (if you have relationships with other models):
  // Role.belongsTo(Location, { foreignKey: 'locationID' });
  // Role.belongsTo(Job, { foreignKey: 'JobID' });
  // Role.belongsTo(Company, { foreignKey: 'companyID' });
}
