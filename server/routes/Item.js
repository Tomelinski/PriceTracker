const express = require('express');
const { getItem, getFlyer, getDeals } = require('../controllers/ItemController');

const router = express.Router();

router.get('/item', getItem);
router.get('/item/:itemId', getItem);
router.get('/flyer', getFlyer);
router.get('/Deals', getDeals);

module.exports = router;