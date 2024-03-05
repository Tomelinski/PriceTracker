const express = require('express');
const { createFavorite, deleteFavorite, getUserFavorites } = require('../controllers/FavoriteController');

const router = express.Router();

router.get('/user/:userId/favorites', getUserFavorites);
router.post('/createFavorite', createFavorite);
router.post('/deleteFavorite', deleteFavorite);

module.exports = router;