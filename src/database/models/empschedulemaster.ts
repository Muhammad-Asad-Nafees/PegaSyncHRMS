import { Model, DataTypes, Sequelize, CreationOptional, InferAttributes, InferCreationAttributes } from 'sequelize';

// Define the EmpScheduleMaster model class
class EmpScheduleMaster extends Model<InferAttributes<EmpScheduleMaster>, InferCreationAttributes<EmpScheduleMaster>> {
  declare id: CreationOptional<number>;
  declare submittedBy: number;
  declare requestedFor: number;
  declare locationID: number;
  declare startDate: Date;
  declare endDate: Date;
  declare startTime: string;
  declare endTime: string;
  declare inNight: number;
  declare totalHours: string;
  declare isActive: number;
  declare isDeleted: number;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
}

export default EmpScheduleMaster;

// Initialize the EmpScheduleMaster model in Sequelize
export function init(sequelize: Sequelize) {
  EmpScheduleMaster.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      submittedBy: {
        type: DataTypes.INTEGER,
        allowNull: false, // Assuming submittedBy is mandatory
      },
      requestedFor: {
        type: DataTypes.INTEGER,
        allowNull: false, // Assuming requestedFor is mandatory
      },
      locationID: {
        type: DataTypes.INTEGER,
        allowNull: false, // Assuming locationID is mandatory
      },
      startDate: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      endDate: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      startTime: {
        type: DataTypes.TIME,
        allowNull: false,
      },
      endTime: {
        type: DataTypes.TIME,
        allowNull: false,
      },
      inNight: {
        type: DataTypes.INTEGER,
        allowNull: true, // Assuming inNight can be nullable
      },
      totalHours: {
        type: DataTypes.STRING,
        allowNull: true, // Assuming totalHours can be nullable
      },
      isActive: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1, // Default to active
      },
      isDeleted: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0, // Default to not deleted
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
      modelName: 'EmpScheduleMaster', // Model name in Sequelize
      tableName: 'EmpScheduleMasters', // Table name in DB
      createdAt: 'createdAt',
      updatedAt: 'updatedAt',
    }
  );
}

// Define associations (if necessary)
export function associate() {
  // Example associations (if you have relationships with other models):
  // EmpScheduleMaster.belongsTo(User, { foreignKey: 'submittedBy' });
  // EmpScheduleMaster.belongsTo(User, { foreignKey: 'requestedFor' });
}
