import { Model, DataTypes, Sequelize, CreationOptional, InferAttributes, InferCreationAttributes } from 'sequelize';

// Define the Country model class
class Country extends Model<InferAttributes<Country>, InferCreationAttributes<Country>> {
  declare id: CreationOptional<number>;
  declare countryName: string;
  declare countryCode: string;
  declare isActive: CreationOptional<number>;
}

export default Country;

// Initialize the Country model in Sequelize
export function init(sequelize: Sequelize) {
  Country.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      countryName: {
        type: DataTypes.STRING,
        allowNull: false, // Assuming country name is required
      },
      countryCode: {
        type: DataTypes.STRING,
        allowNull: false, // Assuming country code is required
      },
      isActive: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1, // Default to active
      },
      
    },
    {
      sequelize,
      modelName: 'Country', // Model name in Sequelize
      tableName: 'countries', // Table name in DB
    }
  );
}

// Define associations (if necessary)
export function associate() {
  // Example associations (if you have relationships with other models):
  // Country.hasMany(Country, { foreignKey: 'countryID' });
}
