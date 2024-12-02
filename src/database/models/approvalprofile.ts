import { Model, DataTypes, Sequelize, CreationOptional, InferAttributes, InferCreationAttributes } from 'sequelize';

// Define the ApprovalProfile model class
class ApprovalProfile extends Model<InferAttributes<ApprovalProfile>, InferCreationAttributes<ApprovalProfile>> {
  declare id: CreationOptional<number>;
  declare requestId: number;
  declare isApproved: number;
  declare requestDate: Date;
  declare submittedDate: Date;
  declare zoneDateTime: string;
  declare isActive: number;
  declare isDeleted: number;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
}

export default ApprovalProfile;

// Initialize the ApprovalProfile model in Sequelize
export function init(sequelize: Sequelize) {
  ApprovalProfile.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      requestId: {
        type: DataTypes.INTEGER,
        allowNull: true, // Assuming requestID can be nullable
      },
      isApproved: {
        type: DataTypes.INTEGER,
        allowNull: true, // Assuming isApproved can be nullable
      },
      requestDate: {
        type: DataTypes.DATE,
        allowNull: true, // Assuming requestDate can be nullable
      },
      submittedDate: {
        type: DataTypes.DATE,
        allowNull: true, // Assuming submittedDate can be nullable
      },
      zoneDateTime: {
        type: DataTypes.STRING,
        allowNull: true, // Assuming zoneDateTime can be nullable
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
      modelName: 'ApprovalProfile', // Model name in Sequelize
      tableName: 'ApprovalProfiles', // Table name in DB
      createdAt: 'createdAt',
      updatedAt: 'updatedAt',
    }
  );
}

// Define associations (if necessary)
export function associate() {
  // Example associations (if you have relationships with other models):
  // ApprovalProfile.belongsTo(Request, { foreignKey: 'requestID' });
}
