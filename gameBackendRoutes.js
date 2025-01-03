<<<<<<< HEAD
const express = require('express');
const router = express.Router();
const gameController = require('../controllers/gameController');

// Define game routes
router.post('/', gameController.createGame);
router.get('/', gameController.getAllGames);

=======
const express = require('express');
const router = express.Router();
const gameController = require('../controllers/gameController');

// Define game routes
router.post('/', gameController.createGame);
router.get('/', gameController.getAllGames);

>>>>>>> f96cd300ce63ab6e97d82b915d97ec530bc203d3
module.exports = router;