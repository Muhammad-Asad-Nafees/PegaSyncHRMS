import {
    CreationOptional,
    DataTypes,
    InferAttributes,
    InferCreationAttributes,
    Model,
    Sequelize,
} from 'sequelize';
import Company from './company';
import RoleAssignment from './roleassignment';
import EmpScheduleMaster from './empschedulemaster';
import EmpAttendanceProfile from './empattendanceprofile';
import EmpAttendanceDetail from './empattendancedetails';

class Users extends Model<InferAttributes<Users>, InferCreationAttributes<Users>> {
    declare id: CreationOptional<number>;
    declare hashPassword: CreationOptional<string>;
    declare firstName:  CreationOptional<string>;
    declare lastName: CreationOptional<string>;
    declare displayName:  CreationOptional<string>;
    declare companyEmail: CreationOptional<string>;
    declare actualEmail:  CreationOptional<string>;
    declare phoneNo: CreationOptional<string>;
    declare zipCode: CreationOptional<string>;
    declare address: CreationOptional<string>;
    declare countryId: number;
    declare city: CreationOptional<string>;
    declare state: CreationOptional<string>;
    declare companyId: number;
    declare isActive: CreationOptional<number>;
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
            hashPassword: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            firstName: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            lastName: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            displayName: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            companyEmail: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            actualEmail: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            phoneNo: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            zipCode: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            address: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            countryId: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            city: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            state: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            companyId: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            isActive: {
                type: DataTypes.INTEGER,
                defaultValue: 1,
            },
        },
        {
            sequelize,
            modelName: 'Users',
            tableName: 'users',
        }
    );
}

export function associate() {
    Users.belongsTo(Company, { foreignKey: 'companyId', as: 'company' });

    Users.hasMany(RoleAssignment, { foreignKey: 'userRecId', as: 'userRoleAssign' });

    Users.hasMany(EmpScheduleMaster, { foreignKey: 'submittedBy', as: 'submittedByUser' });
    Users.hasMany(EmpScheduleMaster, { foreignKey: 'requestedFor', as: 'requestedForUser' });

    Users.hasMany(EmpAttendanceProfile, { foreignKey: 'userRecId', as: 'attendanceUser' });
   
}

export default Users;
