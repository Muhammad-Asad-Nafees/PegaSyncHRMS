import { Model, DataTypes, Sequelize, CreationOptional, InferAttributes, InferCreationAttributes } from 'sequelize';
import Users from './user';
import Location from './locations';
import EmpAttendanceDetail from './empattendancedetails';

// Define the EmpAttendanceProfile model class
class EmpAttendanceProfile extends Model<InferAttributes<EmpAttendanceProfile>, InferCreationAttributes<EmpAttendanceProfile>> {
  declare id: CreationOptional<number>;
  declare userRecId: number;
  declare locationId: number;
  declare zoneDateTime: string;
  declare isActive: CreationOptional<number>;
}

export default EmpAttendanceProfile;

// Initialize the EmpAttendanceProfile model in Sequelize
export function init(sequelize: Sequelize) {
  EmpAttendanceProfile.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      userRecId: {
        type: DataTypes.INTEGER,
        allowNull: false, // Assuming userRecID is required
      },
      locationId: {
        type: DataTypes.INTEGER,
        allowNull: false, // Assuming locationID is required
      },
      zoneDateTime: {
        type: DataTypes.STRING,
        allowNull: true, // Assuming zoneDateTime can be nullable
      },
      isActive: {
        type: DataTypes.INTEGER,
        defaultValue: 1,
      },
    },
    {
      sequelize,
      modelName: 'EmpAttendanceProfile', // Sequelize model name
      tableName: 'empAttendanceProfiles', // Corresponding table name in DB
    }
  );
}

// Define associations (if necessary)
export function associate() {
  EmpAttendanceProfile.belongsTo(Users, { foreignKey: 'userRecId',as : 'attendanceUser' });
  EmpAttendanceProfile.belongsTo(Location, { foreignKey: 'locationId',as : 'attendancelocation' });

  EmpAttendanceProfile.hasMany(EmpAttendanceDetail, { foreignKey: 'profileId', as: 'attendanceProfileId' });
}
