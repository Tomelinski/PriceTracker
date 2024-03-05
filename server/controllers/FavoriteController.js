const { Favorite } = require("../models");

const getFavoritesByUserId = async (req, res) => {
  try {
    const userFavorites = await Favorite.findAll({
      where: {
        userId: req.query.userId,
      },
    });

    if (!userFavorites) {
      res.status(404).json({ error: "Favorites not found" });
    } else {
      res.json(userFavorites);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createFavorite = async (req, res) => {
    try {
      const itemId = req.query.itemId;
      const userId = req.query.userId;
      console.log(itemId, userId);
  
      await Favorite.create({
        itemId: itemId,
        userId: userId,
      });
  
      res.status(200).json({ message: "Item favorited" });
    } catch (e) {
      console.log("error: ", e);
      res.status(500).json({ error: "Error Creating item", e });
    }
  };

  const deleteFavorite = async (req, res) => {
    try {
      const itemId = req.query.itemId;
      const userId = req.query.userId;
  
      const favoriteItem = await Favorite.findOne({ where: { userId: userId, itemId: itemId } });
  
      if (favoriteItem) {
        await Favorite.destroy({ where: { userId: userId, itemId: itemId } });
        res.status(200).json({ message: "Item Deleted" });
      } else {
        res.status(404).json({ message: "User or FavoriteItem not found" });
      }
    } catch (e) {
      console.log("error: ", e);
      res.status(500).json({ error: "Internal Server Error" });
    }
  };

module.exports = {
  createFavorite,
  deleteFavorite,
  getFavoritesByUserId,
};
