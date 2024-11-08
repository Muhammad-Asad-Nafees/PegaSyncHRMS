import { Model, DataTypes, Sequelize, CreationOptional, InferAttributes, InferCreationAttributes } from 'sequelize';

// Define the LocationDetail model class
class LocationDetail extends Model<InferAttributes<LocationDetail>, InferCreationAttributes<LocationDetail>> {
  declare id: CreationOptional<number>;
  declare locationID: number;
  declare profileID: number;
  declare latitude: string;
  declare longitude: string;
  declare radius: number;
  declare timeClockSessionDuration: number;
  declare isRangeAlert: number;
  declare locationAlertInterval: number;
  declare gracePeriod: number;
  declare isTimeZoneCheck: number;
  declare isScheduled: number;
  declare isActive: CreationOptional<number>;
  declare isDeleted: CreationOptional<number>;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
}

export default LocationDetail;

// Initialize the LocationDetail model in Sequelize
export function init(sequelize: Sequelize) {
  LocationDetail.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      locationID: {
        type: DataTypes.INTEGER,
        allowNull: true, // locationID can be nullable
      },
      profileID: {
        type: DataTypes.INTEGER,
        allowNull: true, // profileID can be nullable
      },
      latitude: {
        type: DataTypes.STRING,
        allowNull: true, // latitude can be nullable
      },
      longitude: {
        type: DataTypes.STRING,
        allowNull: true, // longitude can be nullable
      },
      radius: {
        type: DataTypes.INTEGER,
        allowNull: true, // radius can be nullable
      },
      timeClockSessionDuration: {
        type: DataTypes.INTEGER,
        allowNull: true, // timeClockSessionDuration can be nullable
      },
      isRangeAlert: {
        type: DataTypes.INTEGER,
        allowNull: true, // isRangeAlert can be nullable
      },
      locationAlertInterval: {
        type: DataTypes.INTEGER,
        allowNull: true, // locationAlertInterval can be nullable
      },
      gracePeriod: {
        type: DataTypes.INTEGER,
        allowNull: true, // gracePeriod can be nullable
      },
      isTimeZoneCheck: {
        type: DataTypes.INTEGER,
        allowNull: true, // isTimeZoneCheck can be nullable
      },
      isScheduled: {
        type: DataTypes.INTEGER,
        allowNull: true, // isScheduled can be nullable
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
      modelName: 'LocationDetail', // Sequelize model name
      tableName: 'LocationDetails', // Corresponding table name in DB
      createdAt: 'createdAt',
      updatedAt: 'updatedAt',
    }
  );
}

// Define associations (if necessary)
export function associate() {
  // Example associations (if you have relationships with other models):
  // LocationDetail.belongsTo(Location, { foreignKey: 'locationID' });
  // LocationDetail.belongsTo(Profile, { foreignKey: 'profileID' });
}
