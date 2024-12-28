const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

// Import routes
const userRoutes = require('../routes/userRoutes');
const gameRoutes = require('../routes/gameRoutes');
const reviewRoutes = require('../routes/reviewRoutes');

// Use routes
app.use('/api/users', userRoutes);
app.use('/api/games', gameRoutes);
app.use('/api/reviews', reviewRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});