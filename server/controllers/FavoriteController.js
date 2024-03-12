const paginate = require("../helpers/route/pagination");
const { Favorite, User, Item } = require("../models");

const getUserFavoriteIds = async (req, res) => {
  try {
    const userFavorites = await Favorite.findAll({
      where: {
        userId: req.params.userId,
      },
    });

    if (userFavorites?.length > 0) {
      const favoriteIds = userFavorites.map((favorite) => favorite.itemId);

      res.json(favoriteIds);
    } else {
      res.json([]);
    }
  } catch (e) {
    res.status(500).json({ error: e });
  }
};

const getUserFavoriteItems = async (req, res) => {
  try {
    const userId = req.params.userId;
    const page = req.query.page || 1;
    const limit = req.query.limit || 3; 

    const result = await paginate(User, {
      id: userId,
    }, page, limit, {
      include: [
        {
          model: Item,
          as: 'favorites',
          through: {
            attributes: []
          },
        },
      ],
    });

    res.json(result);
    // const user = await User.findOne({
    //   where: {
    //     id: req.params.userId,
    //   },
    //   include: [
    //     {
    //       model: Item,
    //       as: 'favorites',
    //       through: {
    //         attributes: []
    //       }
    //     },
    //   ],
    // });

    // if (user) {
    //   res.json(user.favorites);
    // } else {
    //   res.json([]);
    // }
  } catch (e) {
    console.log("error: ", e);
    res.status(500).json({ message: "Unexpected error occurred", error: e });
  }
};

const createFavorite = async (req, res) => {
  try {
    const userId = req.body.userId;
    const itemId = req.body.itemId;

    const existingFavorite = await Favorite.findOne({
      where: { userId: userId, itemId: itemId },
    });

    if (existingFavorite) {
      res
        .status(409)
        .json({ success: false, message: "Item already favorited" });
    } else {
      const fav = await Favorite.create({
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
      res
        .status(404)
        .json({ success: false, message: "User or FavoriteItem not found" });
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
  getUserFavoriteIds,
  getUserFavoriteItems,
  createFavorite,
  deleteFavorite,
};
