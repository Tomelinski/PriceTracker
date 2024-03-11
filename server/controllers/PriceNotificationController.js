const { priceNotification } = require("../models");

const getUserNotifications = async (req, res) => {
  try {
    const userNotifications = await priceNotification.findAll({
      where: {
        userId: req.params.userId,
      },
    });

    if (!userNotifications) {
      res.status(404).json({ error: "Notifications not found" });
    } else {
      res.json(userNotifications);
    }
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

const createNotification = async (req, res) => {
  const userId = req.body.userId;
  const itemId = req.body.itemId;
  const threshold = req.body.threshold;

  try {
    const existingNotification = await priceNotification.findOne({
      where: { userId: userId, itemId: itemId },
    });

    if (existingNotification) {
      res.status(409).json({ success: false, message: "Notification already exists" });
    } else {
      priceNotification.create({
        userId,
        itemId,
        threshold,
      });
    }
    res.status(200).json({ success: true, message: "Item notification created" });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

const deleteNotification = async (req, res) => {
  const userId = req.body.userId;
  const itemId = req.body.itemId;

  try {
    const notification = priceNotification.findOne({
      where: {
        userId,
        itemId,
      },
    });

    if (!notification) {
      res.status(404).json({ success: false, message: "notification not found" });
    } else {
      notification.destroy();
      res.status(200).json({ success: true, message: "notification deleted" });
    }
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

const updateNotification = async (req, res) => {
  try {
    const itemId = req.body.itemId;
    const userId = req.body.userId;

    const notification = await priceNotification.findOne({
      where: { userId: userId, itemId: itemId },
    });

    if (!notification) {
      res.status(404).json({ success: false, message: "Notification not found" });
    } else {
      await notification.update({ threshold: req.body.threshold });
      res.status(200).json({ success: true, message: "notification updated" });
    }
  } catch (e) {
    console.log("error: ", e);
    res.status(500).json({ error: e.message });
  }
};

module.exports = {
  getUserNotifications,
  createNotification,
  deleteNotification,
  updateNotification,
};
