const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/reviewController');
const auth = require('../middleware/authenticationMiddleware');

router.post('/', auth, reviewController.createReview);
router.get('/game/:gameId', reviewController.getGameReviews);

module.exports = router;
