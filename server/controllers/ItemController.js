const axios = require("axios");
const { sequelize, Item } = require("../models");
const { development } = require("../database/config/config");

const getItem = async (req, res) => {
    let result;
  
    try {
      result = await sequelize.transaction(async (t) => {
        const itemURL = req.query.itemURL;
        const [item, created] = await Item.findOrCreate({
          where: { siteURL: itemURL },
          transaction: t,
        });
  
        if (created) {
          const scraperURL = `${development.webScraper}/item`;
          const axiosResponse = await axios.get(scraperURL, {
            params: { itemURL: itemURL },
          });
  
          if (axiosResponse.data) {
            console.log(axiosResponse.data)
            const { title, retailer, specifications, image, price } = axiosResponse.data;

            const currentDate = new Date().toISOString();
            const priceHistory = [{ price, date: currentDate }];
  
            const updatedItem = await item.update({
              name: title || null,
              retailer: retailer || null,
              specifications: specifications || {},
              price: price || null,
              priceHistory: priceHistory,
              imageURL: image || null,
            }, { transaction: t });
  
            console.log(updatedItem);
          }
        }
  
        return item ?? {};
      });
    } catch (error) {
      // Rollback the transaction on error
      console.error("Error during transaction:", error);
      res.status(500).json({ error: error.message });
      return;
    }
  
    console.log(result);
    res.json(result);
  };

module.exports = {
  getItem,
};
