const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const app = express();
const PORT = process.env.PORT || 5000;

// Security middleware
app.use(helmet());
app.use(cors());

// Rate limiting
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100 // limit each IP to 100 requests per windowMs
});
app.use(limiter);

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