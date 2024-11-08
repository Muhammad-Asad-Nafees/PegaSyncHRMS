import { Model, DataTypes, Sequelize, CreationOptional, InferAttributes, InferCreationAttributes } from 'sequelize';

// Define the EmpAttendanceDetail model class
class EmpAttendanceDetail extends Model<InferAttributes<EmpAttendanceDetail>, InferCreationAttributes<EmpAttendanceDetail>> {
  declare id: CreationOptional<number>;
  declare profileID: number;
  declare typeID: number;
  declare typeDateTime: number;
  declare isMissedPunch: number;
  declare isActive: CreationOptional<number>;
  declare isDeleted: CreationOptional<number>;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
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
      profileID: {
        type: DataTypes.INTEGER,
        allowNull: false, // Assuming profileID is required
      },
      typeID: {
        type: DataTypes.STRING,
        allowNull: false, // Assuming typeID is required
      },
      typeDateTime: {
        type: DataTypes.INTEGER,
        allowNull: false, // Assuming typeDateTime is required
      },
      isMissedPunch: {
        type: DataTypes.INTEGER,
        allowNull: false, // Assuming isMissedPunch is required
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
      modelName: 'EmpAttendanceDetail', // Sequelize model name
      tableName: 'EmpAttendanceDetails', // Corresponding table name in DB
      createdAt: 'createdAt',
      updatedAt: 'updatedAt',
    }
  );
}

// Define associations (if necessary)
export function associate() {
  // Example associations (if you have relationships with other models):
  // EmpAttendanceDetail.belongsTo(Profile, { foreignKey: 'profileID' });
  // EmpAttendanceDetail.belongsTo(AttendanceType, { foreignKey: 'typeID' });
}
