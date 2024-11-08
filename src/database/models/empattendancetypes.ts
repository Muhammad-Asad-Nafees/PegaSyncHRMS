import { Model, DataTypes, Sequelize, CreationOptional, InferAttributes, InferCreationAttributes } from 'sequelize';

// Define the EmpAttendanceType model class
class EmpAttendanceType extends Model<InferAttributes<EmpAttendanceType>, InferCreationAttributes<EmpAttendanceType>> {
  declare id: CreationOptional<number>;
  declare typeName: string;
  declare isActive: CreationOptional<number>;
  declare isDeleted: CreationOptional<number>;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
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
      modelName: 'EmpAttendanceType', // Sequelize model name
      tableName: 'EmpAttendanceTypes', // Corresponding table name in DB
      createdAt: 'createdAt',
      updatedAt: 'updatedAt',
    }
  );
}

// Define associations (if necessary)
export function associate() {
  // Example associations (if you have relationships with other models):
  // EmpAttendanceType.hasMany(EmpAttendanceDetail, { foreignKey: 'typeID' });
}
