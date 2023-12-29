const axios = require("axios");
const { sequelize, Item } = require("../models");
const { development } = require("../database/config/config");
const { response } = require("express");

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
            console.log(specifications);
            console.log(priceHistory);
  
            const updatedItem = await item.update({
              name: title || null,
              retailer: retailer || null,
              specifications: specifications || {},
              priceHistory: priceHistory,
              imageURL: image || null,
            }, { transaction: t });
  
            console.log(updatedItem);
          }
        }
  
        console.log(item);
  
        return item ?? {};
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
