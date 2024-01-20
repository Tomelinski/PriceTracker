const express = require('express');
const { getItem } = require('../controllers/ItemController');

const router = express.Router();

router.get('/item', getItem);
router.get('/item/:itemId', getItem);

module.exports = router;