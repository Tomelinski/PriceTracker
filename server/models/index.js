const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const process = require('process');

const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(`${__dirname}/../database/config/config.js`)[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, {
    host: config.host,
    dialect: config.dialect,
    // automatically log the time taken for each Query
    benchmark: true,
    logging: (query, options) => {
      console.log(`Query executed: ${query}`);
    },
  });
}

fs
  .readdirSync(__dirname)
  .filter((file) => (
    file.indexOf('.') !== 0
      && file !== basename
      && file.slice(-3) === '.js'
      && file.indexOf('.test.js') === -1
  ))
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

Object.values(db).forEach((model) => {
  if (model.associate) {
    model.associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;

// const Sequelize = require('sequelize');
// const path = require('path');
// const userModel = require('./User');
// const itemModel = require('./Item');
// const priceNotificationModel = require('./PriceNotification');
// const FavoriteModel = require('./Favorite');

// const env = process.env.NODE_ENV || 'development';
// const config = require(path.join(__dirname, '/../database/config/config.js'))[env];

// // console.log(config);
// // const sequelize = new Sequelize(config, {logging: console.log});
// const sequelize = new Sequelize(config.database, config.username, config.password, {
//   host: config.host,
//   dialect: config.dialect,
//   //automatically log the time taken for each Query
//   benchmark: true,
//   logging: (query, options) => {
//     console.log(`Query executed: ${query}`);
//   },
// });

// const Favorite = FavoriteModel(sequelize);
// const Item = itemModel(sequelize);
// const priceNotification = priceNotificationModel(sequelize);
// const User = userModel(sequelize);

// const db = {
//   sequelize,
//   Sequelize,
//   priceNotification,
//   Favorite,
//   User,
//   Item,
// };

// module.exports = db;
