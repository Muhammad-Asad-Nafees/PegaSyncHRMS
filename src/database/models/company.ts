import { Sequelize, DataTypes, Model, CreationOptional, InferAttributes, InferCreationAttributes } from 'sequelize';
import Clients from './client';
import Users from './user';
import Roles from './roles';
import Location from './locations';

// Define the Company model class with the provided fields
class Company extends Model<InferAttributes<Company>, InferCreationAttributes<Company>> {
  declare id: CreationOptional<number>;
  declare clientId: number;
  declare companyName: string;
  declare companyAddress: string;
  declare zipCode: string;
  declare city: string;
  declare countryID: number;
}

export default Company;

// Initialize the Company model in Sequelize
export function init(sequelize: Sequelize) {
  Company.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      clientId: { // Foreign key column
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'clients', // Reference to Users table
          key: 'id',      // Foreign key references Users.id
        },
        onDelete: 'CASCADE', // Optional: Delete the user profile if the user is deleted
      },
      companyName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      companyAddress: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      zipCode: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      city: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      countryID: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },

    },
    {
      sequelize,
      modelName: 'Company', // Model name in Sequelize
      tableName: 'company', // Table name in DB (you can change this)
    }
  );
}

// Define associations (if necessary)
export function associate() {
  Company.belongsTo(Clients, { foreignKey: 'clientId', as: 'client' });
  Company.hasMany(Users, { foreignKey: 'companyId', as: 'company3' });
  Company.hasMany(Roles, { foreignKey: 'companyId', as: 'company1' });
  Company.hasMany(Location, { foreignKey: 'companyId', as: 'company2' });

}
