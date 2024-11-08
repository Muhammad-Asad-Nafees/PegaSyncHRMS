import { Model, DataTypes, Sequelize, CreationOptional, InferAttributes, InferCreationAttributes } from 'sequelize';

// Define the TimeZone model class
class TimeZone extends Model<InferAttributes<TimeZone>, InferCreationAttributes<TimeZone>> {
  declare id: CreationOptional<number>;
  declare timeZone: string;
  declare timeZoneDesc: string;
  declare isActive: CreationOptional<number>;
  declare isDeleted: CreationOptional<number>;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
}

export default TimeZone;

// Initialize the TimeZone model in Sequelize
export function init(sequelize: Sequelize) {
  TimeZone.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      timeZone: {
        type: DataTypes.STRING,
        allowNull: false, // Assuming it's required
      },
      timeZoneDesc: {
        type: DataTypes.STRING,
        allowNull: true, // Nullable description field
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
      modelName: 'TimeZone', // Model name in Sequelize
      tableName: 'TimeZones', // Table name in DB
      createdAt: 'createdAt',
      updatedAt: 'updatedAt',
    }
  );
}

// Define associations (if necessary)
export function associate() {
  // Example associations (if you have relationships with other models):
  // TimeZone.hasMany(Employee, { foreignKey: 'timeZoneID' });
}
