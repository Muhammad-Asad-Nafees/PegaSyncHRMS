import { Model, DataTypes, Sequelize, CreationOptional, InferAttributes, InferCreationAttributes } from 'sequelize';

// Define the EmpAttendanceAlert model class
class EmpAttendanceAlert extends Model<InferAttributes<EmpAttendanceAlert>, InferCreationAttributes<EmpAttendanceAlert>> {
  declare id: CreationOptional<number>;
  declare alertID: number;
  declare domainID: number;
  declare message: string;
  declare endpoint: string;
  declare isActive: CreationOptional<number>;
  declare isDeleted: CreationOptional<number>;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
}

export default EmpAttendanceAlert;

// Initialize the EmpAttendanceAlert model in Sequelize
export function init(sequelize: Sequelize) {
  EmpAttendanceAlert.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      alertID: {
        type: DataTypes.INTEGER,
        allowNull: false, // Assuming alertID is required
      },
      domainID: {
        type: DataTypes.INTEGER,
        allowNull: false, // Assuming domainID is required
      },
      message: {
        type: DataTypes.STRING,
        allowNull: false, // Assuming message is required
      },
      endpoint: {
        type: DataTypes.STRING,
        allowNull: false, // Assuming endpoint is required
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
      modelName: 'EmpAttendanceAlert', // Sequelize model name
      tableName: 'EmpAttendanceAlerts', // Corresponding table name in DB
      createdAt: 'createdAt',
      updatedAt: 'updatedAt',
    }
  );
}

// Define associations (if necessary)
export function associate() {
  // Example associations (if you have relationships with other models):
  // EmpAttendanceAlert.belongsTo(OtherModel, { foreignKey: 'alertID' });
}
