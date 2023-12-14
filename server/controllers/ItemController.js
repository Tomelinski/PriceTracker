const { Item } = require('../models');

const createItem = async (req, res) => {
  try {
    const item = await Item.findOne({
        where: { siteURL: req.body.itemURL },
      });

    if (!item) {
        item = Item.create({ siteURL: req.body.itemURL });
    }

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getUsers,
  getUserById,
};