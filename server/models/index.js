const Sequelize = require('sequelize');
const userModel = require('./User');
const itemModel = require('./Item');

const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../database/config/config.js')[env];

const sequelize = new Sequelize(config);

const User = userModel(sequelize);
const Item = itemModel(sequelize);

const db = {
  sequelize,
  Sequelize,
  User,
  Item,
};

module.exports = db;
