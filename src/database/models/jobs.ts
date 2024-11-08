import { Model, DataTypes, Sequelize, CreationOptional, InferAttributes, InferCreationAttributes } from 'sequelize';

// Define the Job model class
class Job extends Model<InferAttributes<Job>, InferCreationAttributes<Job>> {
  declare id: CreationOptional<number>;
  declare jobName: string;
  declare jobDesc: string;
  declare jobLevelID: number;
  declare companyID: number;
  declare isActive: CreationOptional<number>;
  declare isDeleted: CreationOptional<number>;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
}

export default Job;

// Initialize the Job model in Sequelize
export function init(sequelize: Sequelize) {
  Job.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      jobName: {
        type: DataTypes.STRING,
        allowNull: true, // `jobName` can be nullable if it's not required
      },
      jobDesc: {
        type: DataTypes.STRING,
        allowNull: true, // `jobDesc` can be nullable
      },
      jobLevelID: {
        type: DataTypes.INTEGER,
        allowNull: true, // `jobLevelID` can be nullable
      },
      companyID: {
        type: DataTypes.INTEGER,
        allowNull: false, // `companyID` is required
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
      modelName: 'Job', // Sequelize model name
      tableName: 'Jobs', // Corresponding table name in DB
      createdAt: 'createdAt',
      updatedAt: 'updatedAt',
    }
  );
}

// Define associations (if necessary)
export function associate() {
  // Example associations (if you have relationships with other models):
  // Job.belongsTo(Company, { foreignKey: 'companyID' });
  // Job.belongsTo(JobLevel, { foreignKey: 'jobLevelID' });
}
