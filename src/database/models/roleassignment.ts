import { Model, DataTypes, Sequelize, CreationOptional, InferAttributes, InferCreationAttributes } from 'sequelize';

// Define the RoleAssignment model class
class RoleAssignment extends Model<InferAttributes<RoleAssignment>, InferCreationAttributes<RoleAssignment>> {
  declare id: CreationOptional<number>;
  declare roleID: number;
  declare userRecID: number;
  declare isActive: CreationOptional<number>;
  declare isDeleted: CreationOptional<number>;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
}

export default RoleAssignment;

// Initialize the RoleAssignment model in Sequelize
export function init(sequelize: Sequelize) {
  RoleAssignment.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      roleID: {
        type: DataTypes.INTEGER,
        allowNull: false, // Assume roleID is required
      },
      userRecID: {
        type: DataTypes.INTEGER,
        allowNull: false, // Assume userRecID is required
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
      modelName: 'RoleAssignments', // Sequelize model name
      tableName: 'RoleAssignments', // Corresponding table name in DB
      createdAt: 'createdAt',
      updatedAt: 'updatedAt',
    }
  );
}

// Define associations (if necessary)
export function associate() {
  // Example associations (if you have relationships with other models):
  // RoleAssignment.belongsTo(Role, { foreignKey: 'roleID' });
  // RoleAssignment.belongsTo(User, { foreignKey: 'userRecID' });
}
