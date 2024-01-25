const axios = require("axios");
const { sequelize, Item } = require("../models");
const { development } = require("../database/config/config");

const getItem = async (req, res) => {
  let result;
  const itemId = req.params.itemId ?? null;
  const itemURL = req.query.itemURL ?? null;

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
          const { title, retailer, specifications, image, price } =
            axiosResponse.data;

          const currentDate = new Date().toISOString().split("T")[0];
          const priceHistory = [{ price, date: currentDate }];

          const updatedItem = await item.update(
            {
              name: title || null,
              retailer: retailer || null,
              specifications: specifications || {},
              price: price || null,
              priceHistory: priceHistory,
              imageURL: image || null,
            },
            { transaction: t }
          );
        }
      }

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

const getFlyer = async (req, res) => {
  let result;
  const flyerURL = req.query.flyerURL ?? null;

  try {
    const scraperURL = `${development.webScraper}/flyer`;
    const axiosResponse = await axios.get(scraperURL, {
      params: { flyerURL: flyerURL },
    }).catch((error) => {
      console.error("Error in Axios request:", error);
      res.json(false);
    });

    if (axiosResponse.status === 200 && axiosResponse.data) {
      console.log(axiosResponse.data);
      result = await sequelize.transaction(async (t) => {
        for (const itemObj of axiosResponse.data) {
          let created = null;
          let item = {};
          let inStoreOnly = false

          try {
            if (itemObj.url === "url not found"){
              [item, created] = await Item.findOrCreate({
                where: { name: itemObj.title, siteURL: itemObj.url },
                transaction: t,
              });
              inStoreOnly = true
            } else {
              [item, created] = await Item.findOrCreate({
                where: { siteURL: itemObj.url },
                transaction: t,
              });
            }
            
            if (!created) {
              return;
            }

            const { retailer, title, image, price, specifications } =
              itemObj;

            const currentDate = new Date().toISOString().split("T")[0];
            const priceHistory = [{ price, date: currentDate }];

            const updatedItem = await item.update(
              {
                name: title || null,
                retailer: retailer || null,
                inStoreOnly: inStoreOnly,
                specifications: specifications || {},
                price: price || null,
                priceHistory: priceHistory,
                imageURL: image || null,
              },
              { transaction: t }
            );
          } catch (error) {
            console.error("Error processing item:", error);
            res.json(false);
          }
        }
      });
    }
  } catch (error) {
    console.error(
      `Error: Could not reach ${development.webScraper}/flyer`,
      error
    );
    res.json(false);
  }

  res.json(true);
};

module.exports = {
  getItem,
  getFlyer,
};
