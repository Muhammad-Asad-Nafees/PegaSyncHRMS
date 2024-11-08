import { Model, DataTypes, Sequelize, CreationOptional, InferAttributes, InferCreationAttributes } from 'sequelize';

// Define the EmpAttendanceCoordinate model class
class EmpAttendanceCoordinate extends Model<InferAttributes<EmpAttendanceCoordinate>, InferCreationAttributes<EmpAttendanceCoordinate>> {
  declare id: CreationOptional<number>;
  declare userRecID: number;
  declare latitude: string;
  declare longitude: string;
  declare isActive: CreationOptional<number>;
  declare isDeleted: CreationOptional<number>;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
}

export default EmpAttendanceCoordinate;

// Initialize the EmpAttendanceCoordinate model in Sequelize
export function init(sequelize: Sequelize) {
  EmpAttendanceCoordinate.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      userRecID: {
        type: DataTypes.INTEGER,
        allowNull: false, // Assuming userRecID is required
      },
      latitude: {
        type: DataTypes.STRING,
        allowNull: true, // Latitude could be nullable
      },
      longitude: {
        type: DataTypes.STRING,
        allowNull: true, // Longitude could be nullable
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
      modelName: 'EmpAttendanceCoordinate', // Sequelize model name
      tableName: 'EmpAttendanceCoordinates', // Corresponding table name in DB
      createdAt: 'createdAt',
      updatedAt: 'updatedAt',
    }
  );
}

// Define associations (if necessary)
export function associate() {
  // Example associations (if you have relationships with other models):
  // EmpAttendanceCoordinate.belongsTo(User, { foreignKey: 'userRecID' });
}
