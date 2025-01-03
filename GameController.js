const pool = require('../config/database');

const gameController = {
    async createGame(req, res) {
        try {
            const { title, description, releaseDate, developer, publisher, genres } = req.body;
            
            const result = await pool.query(
                'INSERT INTO games (title, description, release_date, developer, publisher, genres) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
                [title, description, releaseDate, developer, publisher, genres]
            );
            
            res.status(201).json(result.rows[0]);
        } catch (error) {
            res.status(500).json({ error: 'Error creating game' });
        }
    },

    async getAllGames(req, res) {
        try {
            const result = await pool.query('SELECT * FROM games');
            res.json(result.rows);
        } catch (error) {
            res.status(500).json({ error: 'Error fetching games' });
        }
    }
};

module.exports = gameController;
