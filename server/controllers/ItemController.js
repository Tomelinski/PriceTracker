const axios = require("axios");
const { sequelize, Item } = require("../models");
const { development } = require("../database/config/app.config.js");
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
  } catch (e) {
    // Rollback the transaction on error
    console.error("Error during transaction:", e);
    res.status(500).json({ error: e.message });
    return;
  }

  return res.json(result);
};

const getFlyer = async (req, res) => {
  let result;
  let counter = 0;
  let errors = [];
  const flyerURL = req.query.flyerURL ?? null;

  try {
    const scraperURL = `${development.webScraper}/flyer`;
    const axiosResponse = await axios
      .get(scraperURL, {
        params: { flyerURL: flyerURL },
      })
      .catch((e) => {
        console.error("Error in Axios request:", e);
        errors.push(e);
      });

    if (
      axiosResponse.status === 200 &&
      axiosResponse.data &&
      axiosResponse.data.length > 0
    ) {
      result = await sequelize.transaction(async (t) => {
        for (const itemObj of axiosResponse.data) {
          let created = null;
          let item = {};
          let inStoreOnly = false;

          try {
            if (itemObj.url === null) {
              [item, created] = await Item.findOrCreate({
                where: { name: itemObj.title, siteURL: itemObj.url },
                transaction: t,
              });
              inStoreOnly = true;
            } else {
              [item, created] = await Item.findOrCreate({
                where: { siteURL: itemObj.url },
                transaction: t,
              });
            }

            if (!created) {
              return;
            }
            counter++;

            const {
              retailer,
              title,
              image,
              price,
              originalPrice,
              flyerDates,
              specifications,
            } = itemObj;

            const startDate = new Date(flyerDates.startDate);
            const currentDate = new Date();
            const priceHistory = [];

            const dayBeforeStartDate = new Date(startDate);
            dayBeforeStartDate.setDate(dayBeforeStartDate.getDate() - 1);
            priceHistory.push({
              price: originalPrice,
              date: dayBeforeStartDate.toISOString().split("T")[0],
            });

            for (
              let date = startDate;
              date <= currentDate;
              date.setDate(date.getDate() + 1)
            ) {
              const formattedDate = date.toISOString().split("T")[0];

              priceHistory.push({ price, date: formattedDate });
            }

            const dealAmount = originalPrice - price;
            const dealPercent = parseFloat(
              ((1 - price / originalPrice) * 100).toFixed(2)
            );

            const dealAmountWeight = 1.1;
            const dealPercentWeight = 0.8;
            const dealScoreAssists = 1.2;

            const dealAmountScore =
              Math.max(Math.min(dealAmount / originalPrice, 1), 0) * 10;
            const dealPercentScore =
              Math.max(Math.min(dealPercent / 100, 1), 0) * 10;

            const dealScore =
              (dealAmountScore * dealAmountWeight +
                dealPercentScore * dealPercentWeight) *
              dealScoreAssists;

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
          } catch (e) {
            console.error("Error processing item:", e);
            errors.push(e);
          }
        }
      });
    } else {
      e = "No item retrieved";
      console.log(e);
      errors.push(e);
    }
  } catch (e) {
    console.error(`Error: Could not reach ${development.webScraper}/flyer`, e);
    errors.push(e);
  }

  if (errors.length > 0) {
    return res
      .status(422)
      .json({
        success: false,
        message: `${counter} items created`,
        error: errors,
      });
  }
  return res
    .status(201)
    .json({ success: true, message: `${counter} items created` });
};

const getDeals = async (req, res) => {
  try {
    const conditions =
      req.query.inStoreOnly !== undefined
        ? { inStoreOnly: req.query.inStoreOnly === "true" || false }
        : {};
    const page = req.query.page || 1;
    const limit = req.query.limit || 3;

    const order = {
      order: [["dealScore", "DESC"]],
    };

    const { totalCount, data } = await paginate(
      Item,
      conditions,
      page,
      limit,
      order
    );

    return res.json({ totalCount, data });
  } catch (e) {
    console.error("Error fetching deals:", e);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  getItem,
  getFlyer,
  getDeals,
};
