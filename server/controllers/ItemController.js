const axios = require("axios");
const { sequelize, Item } = require("../models");
const { development } = require("../database/config/config");

const getItem = async (req, res) => {
    let result;
    const itemId = req.params.itemId ?? null;
    const itemURL = req.query.itemURL ?? null;
    console.log(itemId, itemURL);
  
    try {
      result = await sequelize.transaction(async (t) => {
        let created = null;
        let item = {};
        if (itemURL) {
          [item, created] = await Item.findOrCreate({
            where: { siteURL: itemURL },
            transaction: t,
          });
        } else if (itemId) {
          item = await Item.findByPk(itemId, { transaction: t });
        }
  
        if (created) {
          const scraperURL = `${development.webScraper}/item`;
          const axiosResponse = await axios.get(scraperURL, {
            params: { itemURL: itemURL },
          });
  
          if (axiosResponse.data) {
            const { title, retailer, specifications, image, price } = axiosResponse.data;

            const currentDate = new Date().toISOString().split('T')[0];
            const priceHistory = [{ price, date: currentDate }];
  
            const updatedItem = await item.update({
              name: title || null,
              retailer: retailer || null,
              specifications: specifications || {},
              price: price || null,
              priceHistory: priceHistory,
              imageURL: image || null,
            }, { transaction: t });
          }
        }
  
        console.log(item);
        return item;
      });
    } catch (error) {
      // Rollback the transaction on error
      console.error("Error during transaction:", error);
      res.status(500).json({ error: error.message });
      return;
    }
  
    res.json(result);
  };

module.exports = {
  getItem,
};
