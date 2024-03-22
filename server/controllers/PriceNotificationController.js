// const paginate = require("../helpers/route/pagination");
const userPagination = require("../helpers/route/userPagination");
const { PriceNotification, Item } = require("../models");

const getUserNotificationIds = async (req, res) => {
  try {
    const userNotifications = await PriceNotification.findAll({
      where: {
        userId: req.params.userId,
      },
    });

    if (userNotifications?.length > 0) {
      const notification = userNotifications.map(
        (notif) => notif.itemId,
      );

      res.json(notification);
    } else {
      res.status(404).json({ error: "Notifications not found" });
    }
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

const getUserNotificationItems = async (req, res) => {
  try {
    const { userId } = req.params;
    const association = 'notifications';
    const page = req.query.page || 1;
    const limit = req.query.limit || 3;
    const include = {
      include: [
        {
          model: Item,
          as: association,
          through: {
            attributes: ["threshold"],
          },
        },
      ],
    };

    const result = await userPagination(
      association,
      userId,
      page,
      limit,
      include,
    );

    res.status(200).json(result);
  } catch (e) {
    console.log("error: ", e);
    res.status(500).json({ message: "Unexpected error occurred", error: e });
  }
};

const createNotification = async (req, res) => {
  const { userId } = req.body;
  const { itemId } = req.body;
  const { threshold } = req.body;

  try {
    const existingNotification = await PriceNotification.findOne({
      where: { userId, itemId },
    });

    if (existingNotification) {
      res
        .status(409)
        .json({ success: false, message: "Notification already exists" });
    } else {
      PriceNotification.create({
        userId,
        itemId,
        threshold,
      });
    }
    res
      .status(200)
      .json({ success: true, message: "Item notification created" });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

const deleteNotification = async (req, res) => {
  const { userId } = req.body;
  const { itemId } = req.body;

  try {
    const notification = PriceNotification.findOne({
      where: {
        userId,
        itemId,
      },
    });

    if (!notification) {
      res
        .status(404)
        .json({ success: false, message: "notification not found" });
    } else {
      notification.destroy();
      res.status(200).json({ success: true, message: "notification deleted" });
    }
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

module.exports = {
  getUserNotificationIds,
  getUserNotificationItems,
  createNotification,
  deleteNotification,
};
