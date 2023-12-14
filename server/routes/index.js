const express = require('express');

const userRoutes = require('./User');
const itemRoutes = require('./Item');
const authRoutes = require('./Auth');

const router = express.Router();

router.use('/api', userRoutes);
router.use('/api', itemRoutes);

//Google OAuth
router.use('/auth', authRoutes);


module.exports = router;
