const { FAVORITE_ATTRIBUTES } = require("../../models/Favorite");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Favorites', FAVORITE_ATTRIBUTES);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Favorites');
  },
};
