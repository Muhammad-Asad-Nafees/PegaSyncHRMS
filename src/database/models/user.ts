import {
    CreationOptional,
    DataTypes,
    InferAttributes,
    InferCreationAttributes,
    Model,
    Sequelize,
} from 'sequelize';
import UserProfile from './userprofile';
import Company from './company';

class Users extends Model<InferAttributes<Users>, InferCreationAttributes<Users>> {
    declare id: CreationOptional<number>;
    declare userRecId: CreationOptional<number>;
    declare hashPassword: CreationOptional<string>;
    declare profileId: number;
    declare firstName: CreationOptional<string>;
    declare companyId: number;
    declare isActive: CreationOptional<number>;
    declare isDeleted: CreationOptional<number>;
    declare createdAt: CreationOptional<Date>;
    declare updatedAt: CreationOptional<Date>;
    declare deletedAt: CreationOptional<Date | null>;
}



export function init(sequelize: Sequelize) {
    Users.init(
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
                allowNull: false,
            },
            userRecId: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            hashPassword: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            profileId: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            firstName: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            companyId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: 'company', // Reference the Company table
                    key: 'id',
                },
                onDelete: 'CASCADE',
            },
            isActive: {
                type: DataTypes.INTEGER,
                allowNull: true,
                defaultValue: 1,
            },
            isDeleted: {
                type: DataTypes.INTEGER,
                allowNull: true,
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
            deletedAt: {
                type: DataTypes.DATE,
                allowNull: true,
            },
        },
        {
            sequelize,
            modelName: 'Users',
            tableName: 'users',
            createdAt: 'createdAt',
            updatedAt: 'updatedAt',
            deletedAt: 'deletedAt',
            paranoid: true,
        }
    );
}

export function associate() {
}

export default Users;
