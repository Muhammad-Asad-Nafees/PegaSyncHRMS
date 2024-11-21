import { Op, Sequelize, Transaction } from 'sequelize'
import * as models from './models'
import {
    Users,
    Company,
    Client,
    Jobs,
    Roles,
    RoleAssignment,
    Permissions,
    PermAssignments,
    Location

} from './models'


const DATABASE_CONNECTION_URI = `mysql://root:root@localhost:3306/pegasynchrms`;

// Direct connection using the DATABASE_CONNECTION_URI from environment variable
const sequelize = new Sequelize(DATABASE_CONNECTION_URI, {
    dialect: 'mysql',
    logging: true,  // Logs SQL queries in the console
});

sequelize.authenticate()
    .then(() => {
        console.log('Database connection established successfully.');
    })
    .catch((err) => {
        console.error('Error connecting to the database:', err);
    });

export default sequelize;

function initModels() {
    models.initUsers(sequelize);
    models.initClient(sequelize);
    models.initCompany(sequelize);
    models.initJobs(sequelize);
    models.initLocation(sequelize);
    models.initRoles(sequelize);
    models.initRoleAssignment(sequelize);
    models.initPermissions(sequelize);
    models.initPermAssignments(sequelize);
   
}

function associateModels() {
    models.associateUsers();
    models.associateClient();
    models.associateCompany();
    models.associateJobs();
    models.associateLocation();
    models.associateRoles();
    models.associateRoleAssignment();
    models.associatePermissions();
    models.associatePermAssignments();

}

initModels()
associateModels()

export { sequelize, Sequelize, Transaction, Op }
export {
    Users,
    Company,
    Client,
    Jobs,
    Roles,
    RoleAssignment,
    Permissions,
    PermAssignments,
    Location
}