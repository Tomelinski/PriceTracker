const axios = require("axios");
const { sequelize, Item } = require("../models");
const { development } = require("../database/config/config");
const paginate = require("../helpers/route/pagination");

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

            const { retailer, title, image, price, originalPrice, flyerDates, specifications } =
              itemObj;

            const startDate = new Date(flyerDates.startDate);
            const currentDate = new Date();
            const priceHistory = [];

            const dayBeforeStartDate = new Date(startDate);
            dayBeforeStartDate.setDate(dayBeforeStartDate.getDate() - 1);
            priceHistory.push({ price: originalPrice, date: dayBeforeStartDate.toISOString().split("T")[0] });

            for (let date = startDate; date <= currentDate; date.setDate(date.getDate() + 1)) {
              const formattedDate = date.toISOString().split("T")[0];
            
              priceHistory.push({ price, date: formattedDate });
            }

            const dealAmount = originalPrice - price;
            const dealPercent = parseFloat(((1 - (price / originalPrice)) * 100).toFixed(2));
            
            const dealAmountWeight = 0.9;
            const dealPercentWeight = 0.7;
            const dealScoreAssists = 1.2;

            const dealAmountScore = Math.max(Math.min(dealAmount / originalPrice, 1), 0) * 10;
            const dealPercentScore = Math.max(Math.min(dealPercent / 100, 1), 0) * 10;

            const dealScore = ((dealAmountScore * dealAmountWeight) + (dealPercentScore * dealPercentWeight)) * dealScoreAssists;

            const updatedItem = await item.update(
              {
                name: title || null,
                retailer: retailer || null,
                inStoreOnly: inStoreOnly,
                specifications: specifications || {},
                price: price,
                prevPrice: originalPrice,
                dealAmount: dealAmount,
                dealPercent: dealPercent,
                dealScore: dealScore,
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

const getDeals = async (req, res) => {
  try {
    const inStoreOnly = req.query.inStoreOnly === 'true' || false;
    const page = req.query.page || 1;
    const limit = req.query.limit || 3;

    const conditions = inStoreOnly && { inStoreOnly };
    const order = {
      order: [['dealScore', 'DESC']], 
    };

    const { totalCount, data } = await paginate(Item, conditions, page, limit, order);

    res.json({ totalCount, data });
  } catch (error) {
    console.error('Error fetching deals:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = {
  getItem,
  getFlyer,
  getDeals,
};
