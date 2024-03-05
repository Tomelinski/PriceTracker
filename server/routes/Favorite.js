const express = require('express');
const { createFavorite, deleteFavorite, getFavoritesByUserId } = require('../controllers/FavoriteController');

const router = express.Router();

router.post('/createFavorite', createFavorite);
router.post('/deleteFavorite', deleteFavorite);
router.get('/user/:id/favorites', getFavoritesByUserId);

module.exports = router;