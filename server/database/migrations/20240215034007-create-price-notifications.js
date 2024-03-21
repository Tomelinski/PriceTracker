const { PRICE_NOTIFICATION_ATTRIBUTES } = require("../../models/PriceNotification");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('PriceNotifications', PRICE_NOTIFICATION_ATTRIBUTES);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('PriceNotifications');
  },
};
