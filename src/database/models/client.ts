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
