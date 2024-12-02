import { Model, DataTypes, Sequelize, CreationOptional, InferAttributes, InferCreationAttributes } from 'sequelize';
import ApprovalProfile from './approvalprofile';

// Define the TimeCorrection model class
class TimeCorrection extends Model<InferAttributes<TimeCorrection>, InferCreationAttributes<TimeCorrection>> {
  declare id: CreationOptional<number>;
  declare submittedBy: number;
  declare requestedFor: number;
  declare typeId: number;
  declare correctionTime: string;
  declare comment: string;
  declare empProfileId: number;
  declare empDetailId: number;
  declare isActive: CreationOptional<number>;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
}

export default TimeCorrection;

// Initialize the TimeCorrection model in Sequelize
export function init(sequelize: Sequelize) {
  TimeCorrection.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      submittedBy: {
        type: DataTypes.INTEGER,
        allowNull: false, // Assuming it's required
      },
      requestedFor: {
        type: DataTypes.INTEGER,
        allowNull: false, // Assuming it's required
      },
      typeId: {
        type: DataTypes.INTEGER,
        allowNull: false, // Assuming it's required
      },
      correctionTime: {
        type: DataTypes.STRING,
        allowNull: true, // Nullable as it could be a time string
      },
      comment: {
        type: DataTypes.STRING,
        allowNull: true, // Nullable for additional comments
      },
      empProfileId: {
        type: DataTypes.INTEGER,
        allowNull: false, // Assuming it's required
      },
      empDetailId: {
        type: DataTypes.INTEGER,
        allowNull: false, // Assuming it's required
      },
      isActive: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1, // Default value for isActive (active)
      },
      createdAt: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      updatedAt: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      
    },
    {
      sequelize,
      modelName: 'TimeCorrection', // Model name in Sequelize
      tableName: 'TimeCorrections', // Table name in DB
    }
  );
  // TimeCorrection.afterCreate(async (timeCorrection, options) => {
  //   try {
  //     // Create an ApprovalProfile record
  //     await ApprovalProfile.create({
  //       requestId: timeCorrection.id,
  //       isApproved: 0, // Default to not approved
  //       requestDate: new Date(),
  //       submittedDate: new Date(),
  //       zoneDateTime: timeCorrection.correctionTime, // Using correctionTime as an example
  //       isActive: 1,
  //       isDeleted: 0,
  //       createdAt: new Date(),
  //       updatedAt: new Date()
  //     });
  //     console.log(`ApprovalProfile created for TimeCorrection ID: ${timeCorrection.id}`);
  //   } catch (error) {
  //     console.error('Error creating ApprovalProfile:', error);
  //   }
  // });
}

// Define associations (if necessary)
export function associate() {
  // Example associations (if you have relationships with other models):
  // TimeCorrection.belongsTo(EmployeeProfile, { foreignKey: 'empProfileID' });
  // TimeCorrection.belongsTo(EmployeeDetail, { foreignKey: 'empDetailID' });
  // TimeCorrection.belongsTo(User, { foreignKey: 'submittedBy' });
}
