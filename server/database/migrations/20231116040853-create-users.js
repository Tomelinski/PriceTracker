const { USER_ATTRIBUTES } = require("../../models/User");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Users', USER_ATTRIBUTES);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Users');
  },
};
