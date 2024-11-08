import { Model, DataTypes, Sequelize, CreationOptional, InferAttributes, InferCreationAttributes } from 'sequelize';

// Define the EmpAttendanceProfile model class
class EmpAttendanceProfile extends Model<InferAttributes<EmpAttendanceProfile>, InferCreationAttributes<EmpAttendanceProfile>> {
  declare id: CreationOptional<number>;
  declare userRecID: number;
  declare locationID: number;
  declare zoneDateTime: string;
  declare companyID: number;
  declare isActive: CreationOptional<number>;
  declare isDeleted: CreationOptional<number>;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
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
      userRecID: {
        type: DataTypes.INTEGER,
        allowNull: false, // Assuming userRecID is required
      },
      locationID: {
        type: DataTypes.INTEGER,
        allowNull: false, // Assuming locationID is required
      },
      zoneDateTime: {
        type: DataTypes.STRING,
        allowNull: true, // Assuming zoneDateTime can be nullable
      },
      companyID: {
        type: DataTypes.INTEGER,
        allowNull: false, // Assuming companyID is required
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
      modelName: 'EmpAttendanceProfile', // Sequelize model name
      tableName: 'EmpAttendanceProfiles', // Corresponding table name in DB
      createdAt: 'createdAt',
      updatedAt: 'updatedAt',
    }
  );
}

// Define associations (if necessary)
export function associate() {
  // Example associations (if you have relationships with other models):
  // EmpAttendanceProfile.belongsTo(User, { foreignKey: 'userRecID' });
  // EmpAttendanceProfile.belongsTo(Location, { foreignKey: 'locationID' });
  // EmpAttendanceProfile.belongsTo(Company, { foreignKey: 'companyID' });
}
