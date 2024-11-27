import { Model, DataTypes, Sequelize, CreationOptional, InferAttributes, InferCreationAttributes } from 'sequelize';
class ScheduleTypes extends Model<InferAttributes<ScheduleTypes>, InferCreationAttributes<ScheduleTypes>> {
    declare id: CreationOptional<number>;
    declare name: string;
    declare description: string;
    declare startTime: number;
    declare endTime: number;
    declare isNight: CreationOptional<number>;
    declare companyId: CreationOptional<number>;
    declare isActive: CreationOptional<number>;
  }
  export default ScheduleTypes;

// Initialize the Role model in Sequelize
export function init(sequelize: Sequelize) {
    ScheduleTypes.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: true, // `role` can be nullable
      },
      description: {
        type: DataTypes.STRING,
        allowNull: true, // `roleDesc` can be nullable
      },
      startTime: {
        type: DataTypes.TIME,
        allowNull: true, // `locationID` can be nullable
      },
      endTime: {
        type: DataTypes.TIME,
        allowNull: true, // `JobID` can be nullable
      },
      isNight: {
        type: DataTypes.INTEGER,
        allowNull: true, // `companyID` can be nullable
      },
      companyId: {
        type: DataTypes.INTEGER,
        allowNull: true, // `companyID` can be nullable
      },
      isActive: {
        type: DataTypes.INTEGER,
        defaultValue: 1,
      },
   
    },
    {
      sequelize,
      modelName: 'ScheduleTypes', // Sequelize model name
      tableName: 'scheduletypes', // Corresponding table name in DB
    }
  );
}

// Define associations (if necessary)
export function associate() {

}
