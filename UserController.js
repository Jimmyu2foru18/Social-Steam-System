const pool = require('../config/database');
const bcrypt = require('bcrypt');

const userController = {
    async createUser(req, res) {
        try {
            const { username, email, password } = req.body;
            const hashedPassword = await bcrypt.hash(password, 10);
            
            const result = await pool.query(
                'INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING id, username, email',
                [username, email, hashedPassword]
            );
            
            res.status(201).json(result.rows[0]);
        } catch (error) {
            res.status(500).json({ error: 'Error creating user' });
        }
    },

    async getAllUsers(req, res) {
        try {
            const result = await pool.query(
                'SELECT id, username, email FROM users'
            );
            res.json(result.rows);
        } catch (error) {
            res.status(500).json({ error: 'Error fetching users' });
        }
    }
};

module.exports = userController;
