import { Model, DataTypes, Sequelize, CreationOptional, InferAttributes, InferCreationAttributes } from 'sequelize';
import Company from './company';
import Roles from './roles';
import EmpScheduleMaster from './empschedulemaster';
import EmpAttendanceDetail from './empattendancedetails';
import EmpAttendanceProfile from './empattendanceprofile';

// Define the Location model class
class Location extends Model<InferAttributes<Location>, InferCreationAttributes<Location>> {
  declare id: CreationOptional<number>;
  declare location: string;
  declare locationUID: string;
  declare latitude: string;
  declare longitude: string;
  declare companyId: string;
  declare isActive: CreationOptional<number>;

}

export default Location;

// Initialize the Location model in Sequelize
export function init(sequelize: Sequelize) {
  Location.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      location: {
        type: DataTypes.STRING,
        allowNull: true, // `location` can be nullable
      },
      locationUID: {
        type: DataTypes.STRING,
        allowNull: true, // `locationUID` can be nullable
      },
      latitude: {
        type: DataTypes.STRING,
        allowNull: true, // `location` can be nullable
      },
      longitude: {
        type: DataTypes.STRING,
        allowNull: true, // `location` can be nullable
      },
      companyId: {
        type: DataTypes.INTEGER,
        allowNull: true, // `companyID` can be nullable
      },
      isActive: {
        type: DataTypes.INTEGER,
        defaultValue:1
      },
    },
    {
      sequelize,
      modelName: 'Location', // Sequelize model name
      tableName: 'locations', // Corresponding table name in DB
      createdAt: 'createdAt',
      updatedAt: 'updatedAt',
    }
  );
}

// Define associations (if necessary)
export function associate() {
  Location.belongsTo(Company, { foreignKey: 'companyId', as: 'company' });
  Location.hasMany(Roles, { foreignKey: 'locationId', as: 'roles' });

  Location.hasMany(EmpScheduleMaster, { foreignKey: 'locationId', as: 'submitBylocation' });

  Location.hasMany(EmpAttendanceProfile, { foreignKey: 'locationId', as: 'attendancelocation' });
}
