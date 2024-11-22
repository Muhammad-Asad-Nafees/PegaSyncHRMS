import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
  Sequelize,
} from 'sequelize';
import Company from './company';
// import bcrypt from 'bcrypt';

class Clients extends Model<InferAttributes<Clients>, InferCreationAttributes<Clients>> {
  declare id: CreationOptional<number>;
  declare clientName: string;
  declare isActive: CreationOptional<number>;
  declare isDeleted: CreationOptional<number>;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
}

export default Clients;

export function init(sequelize: Sequelize) {
  Clients.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,

      },
      clientName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      isActive: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
      },
      isDeleted: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      sequelize,
      modelName: 'Clients',
      tableName: 'clients',
      createdAt: 'createdAt',
      updatedAt: 'updatedAt',
    }
  );
}

// Define associations (optional)
export function associate() {
  Clients.hasMany(Company, { foreignKey: 'clientId' });
}
