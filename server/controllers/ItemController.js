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
        transaction: t, // Pass transaction to findOrCreate
      });

      // if (!item) {
      //     item = Item.create({ siteURL: req.body.itemURL });
      // }
      if (created) {
        const url = development.webScraper;
        const response = await axios.get(url, { params: { url: itemURL } });

        console.log(response.data);
      }

      return item;
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
    return; // Don't proceed further if there's an error
  }

  res.json(result); // Now you can access the result outside the try-catch block
};

module.exports = {
  getItem,
};
