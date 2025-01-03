const express = require('express');
const router = express.Router();
const gameController = require('../controllers/gameController');

// Define game routes
router.post('/', gameController.createGame);
router.get('/', gameController.getAllGames);

module.exports = router;