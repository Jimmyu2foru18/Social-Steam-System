const pool = require('../config/database');

const reviewController = {
    async createReview(req, res) {
        try {
            const { userId, gameId, rating, content } = req.body;
            
            const result = await pool.query(
                'INSERT INTO reviews (user_id, game_id, rating, content) VALUES ($1, $2, $3, $4) RETURNING *',
                [userId, gameId, rating, content]
            );
            
            res.status(201).json(result.rows[0]);
        } catch (error) {
            res.status(500).json({ error: 'Error creating review' });
        }
    },

    async getGameReviews(req, res) {
        try {
            const { gameId } = req.params;
            const result = await pool.query(
                'SELECT r.*, u.username FROM reviews r JOIN users u ON r.user_id = u.id WHERE game_id = $1',
                [gameId]
            );
            res.json(result.rows);
        } catch (error) {
            res.status(500).json({ error: 'Error fetching reviews' });
        }
    }
};

module.exports = reviewController;
