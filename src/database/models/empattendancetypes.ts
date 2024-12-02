import { Model, DataTypes, Sequelize, CreationOptional, InferAttributes, InferCreationAttributes } from 'sequelize';
import EmpAttendanceDetail from './empattendancedetails';

// Define the EmpAttendanceType model class
class EmpAttendanceType extends Model<InferAttributes<EmpAttendanceType>, InferCreationAttributes<EmpAttendanceType>> {
  declare id: CreationOptional<number>;
  declare typeName: string;
  declare isActive: CreationOptional<number>;
}

export default EmpAttendanceType;

// Initialize the EmpAttendanceType model in Sequelize
export function init(sequelize: Sequelize) {
  EmpAttendanceType.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      typeName: {
        type: DataTypes.STRING,
        allowNull: false, // Assuming typeName is required
      },
      isActive: {
        type: DataTypes.INTEGER,
        defaultValue: 1, // Default value for isActive (active)
      },
    },
    {
      sequelize,
      modelName: 'EmpAttendanceType', // Sequelize model name
      tableName: 'EmpAttendanceTypes', // Corresponding table name in DB
      createdAt: 'createdAt',
      updatedAt: 'updatedAt',
    }
  );
}

// Define associations (if necessary)
export function associate() {
  EmpAttendanceType.hasMany(EmpAttendanceDetail, {foreignKey: 'typeId',as : 'detailTypeId' })
  
  // Example associations (if you have relationships with other models):
  // EmpAttendanceType.hasMany(EmpAttendanceDetail, { foreignKey: 'typeID' });
}
