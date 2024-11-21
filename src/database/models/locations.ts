import { Model, DataTypes, Sequelize, CreationOptional, InferAttributes, InferCreationAttributes } from 'sequelize';
import Company from './company';

// Define the Location model class
class Location extends Model<InferAttributes<Location>, InferCreationAttributes<Location>> {
  declare id: CreationOptional<number>;
  declare location: string;
  declare locationUID: string;
  declare companyID: string;

}

export default Location;

// Initialize the Location model in Sequelize
export function init(sequelize: Sequelize) {
  Location.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      location: {
        type: DataTypes.STRING,
        allowNull: true, // `location` can be nullable
      },
      locationUID: {
        type: DataTypes.STRING,
        allowNull: true, // `locationUID` can be nullable
      },
      companyID: {
        type: DataTypes.STRING,
        allowNull: true, // `companyID` can be nullable
      },
     
    },
    {
      sequelize,
      modelName: 'Location', // Sequelize model name
      tableName: 'locations', // Corresponding table name in DB
      createdAt: 'createdAt',
      updatedAt: 'updatedAt',
    }
  );
}

// Define associations (if necessary)
export function associate() {
  Location.belongsTo(Company, { foreignKey: 'companyId', as: 'company' });
  // Example associations (if you have relationships with other models):
  // Location.belongsTo(Company, { foreignKey: 'companyID' });
  // Location.belongsTo(Profile, { foreignKey: 'profileID' });
}
