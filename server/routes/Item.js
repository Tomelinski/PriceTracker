const express = require('express');
const { getItem, getFlyer, getFlyerDeals } = require('../controllers/ItemController');

const router = express.Router();

router.get('/item', getItem);
router.get('/item/:itemId', getItem);
router.get('/flyer', getFlyer);
router.get('/flyerDeals', getFlyerDeals);

module.exports = router;