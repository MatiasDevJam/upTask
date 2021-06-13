require('dotenv').config({path: 'process.env'});

module.exports = {
  "development": {
    "username": process.env.BD_USER,
    "password": null,
    "database": process.env.BD_NAME,
    "host": process.env.BD_HOST,
    "dialect": "mysql"
  },
  "test": {
    "username": "root",
    "password": null,
    "database": "database_test",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "production": {
    "username": "root",
    "password": null,
    "database": "database_production",
    "host": "127.0.0.1",
    "dialect": "mysql"
  }
}
