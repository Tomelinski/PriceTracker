const express = require('express');
const { getItem, getFlyer } = require('../controllers/ItemController');

const router = express.Router();

router.get('/item', getItem);
router.get('/item/:itemId', getItem);
router.get('/flyer', getFlyer);

module.exports = router;