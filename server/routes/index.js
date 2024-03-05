const express = require('express');

const userRoutes = require('./User');
const itemRoutes = require('./Item');
const authRoutes = require('./Auth');
const favoriteRoutes = require('./Favorite');

const router = express.Router();

router.use('/api', userRoutes);
router.use('/api', itemRoutes);
router.use('/api', favoriteRoutes);

//Google OAuth
router.use('/auth', authRoutes);

module.exports = router;
