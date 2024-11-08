import { Model, DataTypes, Sequelize, CreationOptional, InferAttributes, InferCreationAttributes } from 'sequelize';

// Define the ApprovalDetail model class
class ApprovalDetail extends Model<InferAttributes<ApprovalDetail>, InferCreationAttributes<ApprovalDetail>> {
  declare id: CreationOptional<number>;
  declare profileID: number;
  declare approverID: number;
  declare comment: string;
  declare isDeclined: number;
  declare isActive: number;
  declare isDeleted: number;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
}

export default ApprovalDetail;

// Initialize the ApprovalDetail model in Sequelize
export function init(sequelize: Sequelize) {
  ApprovalDetail.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      profileID: {
        type: DataTypes.INTEGER,
        allowNull: true, // Assuming profileID can be nullable
      },
      approverID: {
        type: DataTypes.INTEGER,
        allowNull: true, // Assuming approverID can be nullable
      },
      comment: {
        type: DataTypes.STRING,
        allowNull: true, // Assuming comment can be nullable
      },
      isDeclined: {
        type: DataTypes.INTEGER,
        allowNull: true, // Assuming isDeclined can be nullable
      },
      isActive: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1, // Default to active
      },
      isDeleted: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0, // Default to not deleted
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
      modelName: 'ApprovalDetail', // Model name in Sequelize
      tableName: 'ApprovalDetails', // Table name in DB
      createdAt: 'createdAt',
      updatedAt: 'updatedAt',
    }
  );
}

// Define associations (if necessary)
export function associate() {
  // Example associations (if you have relationships with other models):
  // ApprovalDetail.belongsTo(Profile, { foreignKey: 'profileID' });
  // ApprovalDetail.belongsTo(Approver, { foreignKey: 'approverID' });
}
