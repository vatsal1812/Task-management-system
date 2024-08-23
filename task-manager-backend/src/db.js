const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('task_manager', 'username', 'password', {
  host: 'localhost',
  dialect: 'postgres',
});

module.exports = sequelize;
