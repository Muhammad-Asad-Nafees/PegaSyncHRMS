module.exports = {
  development: {
    username: 'root',  // Ensure this is 'root' (not 'root@localhost')
    password: 'root',  // Ensure this is the correct password
    database: 'pegasynchrms',
    host: 'localhost',  // or '127.0.0.1'
    dialect: 'mysql',
  },
  test: {
    username: 'root',
    password: 'sa@spe1',  // Ensure this is the correct password
    database: 'database_test',
    host: 'localhost',  // or '127.0.0.1'
    dialect: 'mysql',
  },
  production: {
    username: 'root',
    password: 'sa@spe1',  // Ensure this is the correct password
    database: 'database_production',
    host: 'localhost',  // or '127.0.0.1'
    dialect: 'mysql',
  }
};
