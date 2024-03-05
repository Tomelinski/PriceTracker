const express = require('express');
const { createNotification, deleteNotification, updateNotification, getUserNotifications } = require('../controllers/PriceNotificationController');

const router = express.Router();

router.get('/user/:userId/notifications', getUserNotifications);
router.post('/createNotification', createNotification);
router.post('/deleteNotification', deleteNotification);
router.post('/updateNotification', updateNotification);

module.exports = router;