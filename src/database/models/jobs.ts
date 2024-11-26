import { Model, DataTypes, Sequelize, CreationOptional, InferAttributes, InferCreationAttributes } from 'sequelize';
import Roles from './roles';

// Define the Job model class
class Job extends Model<InferAttributes<Job>, InferCreationAttributes<Job>> {
  declare id: CreationOptional<number>;
  declare jobName: string;
  declare jobDesc: string;
  declare jobLevelId: number;
  declare companyId: number;
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
      jobLevelId: {
        type: DataTypes.INTEGER,
        allowNull: true, // `jobLevelID` can be nullable
      },
      companyId: {
        type: DataTypes.INTEGER,
        allowNull: false, // `companyID` is required
      },
    },
    {
      sequelize,
      modelName: 'Job', // Sequelize model name
      tableName: 'jobs', // Corresponding table name in DB
    }
  );
}

// Define associations (if necessary)
export function associate() {
  // Example associations (if you have relationships with other models):
  // Job.belongsTo(Company, { foreignKey: 'companyID' });
  Job.hasMany(Roles, { foreignKey: 'jobId', as: 'jobs' });
}
