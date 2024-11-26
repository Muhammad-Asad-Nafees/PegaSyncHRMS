import { Model, DataTypes, Sequelize, CreationOptional, InferAttributes, InferCreationAttributes } from 'sequelize';
import Users from './user';
import Location  from './locations';

// Define the EmpScheduleMaster model class
class EmpScheduleMaster extends Model<InferAttributes<EmpScheduleMaster>, InferCreationAttributes<EmpScheduleMaster>> {
  declare id: CreationOptional<number>;
  declare submittedBy: number;
  declare requestedFor: number;
  declare locationId: number;
  declare startDate: Date;
  declare endDate: Date;
  declare startTime: string;
  declare endTime: string;
  declare isNight: number;
  declare totalHours: string;
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
      locationId: {
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
      isNight: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      totalHours: {
        type: DataTypes.STRING,
        allowNull: true, // Assuming totalHours can be nullable
      },
    },
    {
      sequelize,
      modelName: 'EmpScheduleMaster', // Model name in Sequelize
      tableName: 'EmpScheduleMasters', // Table name in DB
    }
  );
}

// Define associations (if necessary)
export function associate() {
  EmpScheduleMaster.belongsTo(Users, { foreignKey: 'submittedBy',as : 'submittedByUser' });
  EmpScheduleMaster.belongsTo(Users, { foreignKey: 'requestedFor',as : 'requestedForUser' });
  EmpScheduleMaster.belongsTo(Location, { foreignKey: 'locationId',as : 'submitBylocation' });
}
