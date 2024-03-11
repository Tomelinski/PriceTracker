const express = require('express');
const { createFavorite, deleteFavorite, getUserFavoriteIds, getUserFavoriteItems } = require('../controllers/FavoriteController');

const router = express.Router();

router.get('/user/:userId/favorite/ids', getUserFavoriteIds);
router.get('/user/:userId/favorite/items', getUserFavoriteItems);
router.post('/createFavorite', createFavorite);
router.post('/deleteFavorite', deleteFavorite);

module.exports = router;