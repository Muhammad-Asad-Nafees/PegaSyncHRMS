import { Model, DataTypes, Sequelize, CreationOptional, InferAttributes, InferCreationAttributes } from 'sequelize';

// Define the TimeCorrection model class
class TimeCorrection extends Model<InferAttributes<TimeCorrection>, InferCreationAttributes<TimeCorrection>> {
  declare id: CreationOptional<number>;
  declare submittedBy: number;
  declare requestedFor: number;
  declare typeID: number;
  declare correctionTime: string;
  declare comment: string;
  declare empProfileID: number;
  declare empDetailID: number;
  declare isActive: CreationOptional<number>;
  declare isDeleted: CreationOptional<number>;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
}

export default TimeCorrection;

// Initialize the TimeCorrection model in Sequelize
export function init(sequelize: Sequelize) {
  TimeCorrection.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      submittedBy: {
        type: DataTypes.INTEGER,
        allowNull: false, // Assuming it's required
      },
      requestedFor: {
        type: DataTypes.INTEGER,
        allowNull: false, // Assuming it's required
      },
      typeID: {
        type: DataTypes.INTEGER,
        allowNull: false, // Assuming it's required
      },
      correctionTime: {
        type: DataTypes.STRING,
        allowNull: true, // Nullable as it could be a time string
      },
      comment: {
        type: DataTypes.STRING,
        allowNull: true, // Nullable for additional comments
      },
      empProfileID: {
        type: DataTypes.INTEGER,
        allowNull: false, // Assuming it's required
      },
      empDetailID: {
        type: DataTypes.INTEGER,
        allowNull: false, // Assuming it's required
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
      modelName: 'TimeCorrection', // Model name in Sequelize
      tableName: 'TimeCorrections', // Table name in DB
      createdAt: 'createdAt',
      updatedAt: 'updatedAt',
    }
  );
}

// Define associations (if necessary)
export function associate() {
  // Example associations (if you have relationships with other models):
  // TimeCorrection.belongsTo(EmployeeProfile, { foreignKey: 'empProfileID' });
  // TimeCorrection.belongsTo(EmployeeDetail, { foreignKey: 'empDetailID' });
  // TimeCorrection.belongsTo(User, { foreignKey: 'submittedBy' });
}
