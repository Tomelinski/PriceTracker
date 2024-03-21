const express = require("express");

const userRoutes = require("./User");
const itemRoutes = require("./Item");
const authRoutes = require("./Auth");
const favoriteRoutes = require("./Favorite");
const priceNotificationRoutes = require("./PriceNotification");

const router = express.Router();

router.use("/api", favoriteRoutes);
router.use("/api", priceNotificationRoutes);
router.use("/api", itemRoutes);
router.use("/api", userRoutes);

// Google OAuth
router.use("/auth", authRoutes);

module.exports = router;
