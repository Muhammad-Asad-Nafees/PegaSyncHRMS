import { Model, DataTypes, Sequelize, CreationOptional, InferAttributes, InferCreationAttributes } from 'sequelize';

// Define the CompanyConfigValue model class
class CompanyConfigValue extends Model<InferAttributes<CompanyConfigValue>, InferCreationAttributes<CompanyConfigValue>> {
  declare id: CreationOptional<number>;
  declare compConfigValueID: number;
  declare periodTypeID: number;
  declare companyID: number;
  declare isActive: CreationOptional<number>;
  declare isDeleted: CreationOptional<number>;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
}

export default CompanyConfigValue;

// Initialize the CompanyConfigValue model in Sequelize
export function init(sequelize: Sequelize) {
  CompanyConfigValue.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      compConfigValueID: {
        type: DataTypes.INTEGER,
        allowNull: false, // Add constraints if necessary (e.g., foreign key)
      },
      periodTypeID: {
        type: DataTypes.INTEGER,
        allowNull: false, // Add constraints if necessary
      },
      companyID: {
        type: DataTypes.INTEGER,
        allowNull: false, // Add constraints if necessary
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
      modelName: 'CompanyConfigValue', // Model name in Sequelize
      tableName: 'CompanyConfigValue', // Table name in DB
      createdAt: 'createdAt',
      updatedAt: 'updatedAt',
    }
  );
}

// Define associations (if necessary)
export function associate() {
  // Example associations (if you have relationships with other models):
  // CompanyConfigValue.belongsTo(Company, { foreignKey: 'companyID' });
  // CompanyConfigValue.belongsTo(CompConfigValue, { foreignKey: 'compConfigValueID' });
  // CompanyConfigValue.belongsTo(PeriodType, { foreignKey: 'periodTypeID' });
}
