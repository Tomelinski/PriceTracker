'use strict';
const { ITEM_ATTRIBUTES } = require("../../models/Item");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Items', ITEM_ATTRIBUTES);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Items');
  },
};