import { Model, DataTypes, Sequelize, CreationOptional, InferAttributes, InferCreationAttributes } from 'sequelize';

// Define the Permission model class
class Permission extends Model<InferAttributes<Permission>, InferCreationAttributes<Permission>> {
  declare id: CreationOptional<number>;
  declare permission: string;
  declare permissionDesc: string;
  declare companyID: number;
  declare isActive: CreationOptional<number>;
  declare isDeleted: CreationOptional<number>;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
}

export default Permission;

// Initialize the Permission model in Sequelize
export function init(sequelize: Sequelize) {
  Permission.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      permission: {
        type: DataTypes.STRING,
        allowNull: true, // `permission` can be nullable
      },
      permissionDesc: {
        type: DataTypes.STRING,
        allowNull: true, // `permissionDesc` can be nullable
      },
      companyID: {
        type: DataTypes.INTEGER,
        allowNull: true, // `companyID` can be nullable
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
      modelName: 'Permission', // Sequelize model name
      tableName: 'Permissions', // Corresponding table name in DB
      createdAt: 'createdAt',
      updatedAt: 'updatedAt',
    }
  );
}

// Define associations (if necessary)
export function associate() {
  // Example associations (if you have relationships with other models):
  // Permission.belongsTo(Company, { foreignKey: 'companyID' });
}
