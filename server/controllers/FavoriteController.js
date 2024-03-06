const { Favorite } = require("../models");

const getUserFavorites = async (req, res) => {
  try {
    const userFavorites = await Favorite.findAll({
      where: {
        userId: req.params.userId,
      },
    });

    if (!userFavorites) {
      res.status(404).json({ error: "Favorites not found" });
    } else {
        const favoriteIds = userFavorites.map((favorite) => favorite.itemId);
    
        res.json(favoriteIds);
    }
  } catch (e) {
    res.status(500).json({ error: e });
  }
};

const createFavorite = async (req, res) => {
  try {
    const itemId = req.body.itemId;
    const userId = req.body.userId;

    const existingFavorite = await Favorite.findOne({
      where: { userId: userId, itemId: itemId },
    });

    if (existingFavorite) {
      res.status(409).json({ success: false, message: "Item already favorited" });
    } else {
      await Favorite.create({
        itemId: itemId,
        userId: userId,
      });
      res.status(200).json({ success: true, message: "Item favorited" });
    }
  } catch (e) {
    console.log("error: ", e);
    res.status(500).json({ error: e.message });
  }
};

const deleteFavorite = async (req, res) => {
  try {
    const itemId = req.body.itemId;
    const userId = req.body.userId;

    const favoriteItem = await Favorite.findOne({
      where: { userId: userId, itemId: itemId },
    });

    if (!favoriteItem) {
      res.status(404).json({ success: false, message: "User or FavoriteItem not found" });
    } else {
      await favoriteItem.destroy();
      res.status(200).json({ success: true, message: "Item Deleted" });
    }
  } catch (e) {
    console.log("error: ", e);
    res.status(500).json({ error: e.message });
  }
};

module.exports = {
  getUserFavorites,
  createFavorite,
  deleteFavorite,
};
