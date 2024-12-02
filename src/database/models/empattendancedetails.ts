import { Model, DataTypes, Sequelize, CreationOptional, InferAttributes, InferCreationAttributes } from 'sequelize';
import EmpAttendanceProfile from './empattendanceprofile';
import EmpAttendanceType from './empattendancetypes';

// Define the EmpAttendanceDetail model class
class EmpAttendanceDetail extends Model<InferAttributes<EmpAttendanceDetail>, InferCreationAttributes<EmpAttendanceDetail>> {
  declare id: CreationOptional<number>;
  declare profileId: number;
  declare typeId: number;
  declare typeDateTime: number;
  declare activeStatus: number;
  declare isActive: CreationOptional<number>;
}

export default EmpAttendanceDetail;

// Initialize the EmpAttendanceDetail model in Sequelize
export function init(sequelize: Sequelize) {
  EmpAttendanceDetail.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      profileId: {
        type: DataTypes.INTEGER,
        allowNull: false, // Assuming profileID is required
      },
      typeId: {
        type: DataTypes.STRING,
        allowNull: false, // Assuming typeID is required
      },
      typeDateTime: {
        type: DataTypes.INTEGER,
        allowNull: false, // Assuming typeDateTime is required
      },
      activeStatus: {
        type: DataTypes.INTEGER,
        allowNull: false, // Assuming isMissedPunch is required
      },
      isActive: {
        type: DataTypes.INTEGER,
        defaultValue: 1,
      },
    },
    {
      sequelize,
      modelName: 'EmpAttendanceDetail', // Sequelize model name
      tableName: 'EmpAttendanceDetails', // Corresponding table name in DB
    }
  );
}

// Define associations (if necessary)
export function associate() {
  EmpAttendanceDetail.belongsTo(EmpAttendanceProfile, { foreignKey: 'profileId',as : 'attendanceProfileId' });

  EmpAttendanceDetail.belongsTo(EmpAttendanceType,{foreignKey: 'typeId',as : 'detailTypeId' })
}
