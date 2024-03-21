const express = require("express");
const {
  createNotification,
  deleteNotification,
  getUserNotificationIds,
  getUserNotificationItems,
} = require("../controllers/PriceNotificationController");

const router = express.Router();

router.get("/user/:userId/notification/ids", getUserNotificationIds);
router.get("/user/:userId/notification/items", getUserNotificationItems);
router.post("/createNotification", createNotification);
router.post("/deleteNotification", deleteNotification);

module.exports = router;
