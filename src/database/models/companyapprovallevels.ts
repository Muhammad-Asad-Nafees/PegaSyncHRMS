import { Model, DataTypes, Sequelize, CreationOptional, InferAttributes, InferCreationAttributes } from 'sequelize';

// Define the CompanyApprovalLevel model class
class CompanyApprovalLevel extends Model<InferAttributes<CompanyApprovalLevel>, InferCreationAttributes<CompanyApprovalLevel>> {
  declare id: CreationOptional<number>;
  declare companyID: number;
  declare approvalLevel: number;
  declare isActive: CreationOptional<number>;
  declare isDeleted: CreationOptional<number>;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
}

export default CompanyApprovalLevel;

// Initialize the CompanyApprovalLevel model in Sequelize
export function init(sequelize: Sequelize) {
  CompanyApprovalLevel.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      companyID: {
        type: DataTypes.INTEGER,
        allowNull: true, // Assuming `companyID` can be null
      },
      approvalLevel: {
        type: DataTypes.INTEGER,
        allowNull: true, // Assuming `approvalLevel` can be null
      },
      isActive: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1, // Default value for isActive
      },
      isDeleted: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0, // Default value for isDeleted
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
      modelName: 'CompanyApprovalLevel', // Sequelize model name
      tableName: 'CompanyApprovalLevels', // Corresponding table name in DB
      createdAt: 'createdAt',
      updatedAt: 'updatedAt',
    }
  );
}

// Define associations (if necessary)
export function associate() {
  // Example associations (if you have relationships with other models):
  // CompanyApprovalLevel.belongsTo(Company, { foreignKey: 'companyID' });
  // CompanyApprovalLevel.hasMany(Approval, { foreignKey: 'approvalLevel' });
}
