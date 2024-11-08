import { Model, DataTypes, Sequelize, CreationOptional, InferAttributes, InferCreationAttributes } from 'sequelize';

// Define the TimeZoneAssignment model class
class TimeZoneAssignment extends Model<InferAttributes<TimeZoneAssignment>, InferCreationAttributes<TimeZoneAssignment>> {
  declare id: CreationOptional<number>;
  declare countryID: number;
  declare timeZoneID: number;
  declare isActive: CreationOptional<number>;
  declare isDeleted: CreationOptional<number>;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
}

export default TimeZoneAssignment;

// Initialize the TimeZoneAssignment model in Sequelize
export function init(sequelize: Sequelize) {
  TimeZoneAssignment.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      countryID: {
        type: DataTypes.INTEGER,
        allowNull: false, // Assuming it's required
      },
      timeZoneID: {
        type: DataTypes.INTEGER,
        allowNull: false, // Assuming it's required
      },
      isActive: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1, // Default value for active status
      },
      isDeleted: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0, // Default value for deleted status
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
      modelName: 'TimeZoneAssignment', // Model name in Sequelize
      tableName: 'TimeZoneAssignments', // Table name in DB
      createdAt: 'createdAt',
      updatedAt: 'updatedAt',
    }
  );
}

// Define associations (if necessary)
export function associate() {
  // Example associations (if you have relationships with other models):
  // TimeZoneAssignment.belongsTo(Country, { foreignKey: 'countryID' });
  // TimeZoneAssignment.belongsTo(TimeZone, { foreignKey: 'timeZoneID' });
}
