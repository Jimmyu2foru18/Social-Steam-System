-- Users table
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    avatar_url VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Games table
CREATE TABLE games (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    release_date DATE,
    developer VARCHAR(255),
    publisher VARCHAR(255),
    image_url VARCHAR(255),
    price DECIMAL(10,2),
    genres TEXT[],
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Reviews table
CREATE TABLE reviews (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    game_id INTEGER REFERENCES games(id),
    rating INTEGER CHECK (rating >= 1 AND rating <= 5),
    content TEXT,
    helpful_count INTEGER DEFAULT 0,
    unhelpful_count INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Review votes table
CREATE TABLE review_votes (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    review_id INTEGER REFERENCES reviews(id),
    vote_type VARCHAR(10) CHECK (vote_type IN ('helpful', 'unhelpful')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user_id, review_id)
);

-- User game library table
CREATE TABLE user_games (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    game_id INTEGER REFERENCES games(id),
    purchase_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    playtime_minutes INTEGER DEFAULT 0,
    UNIQUE(user_id, game_id)
);

-- Create indexes
CREATE INDEX idx_games_title ON games(title);
CREATE INDEX idx_reviews_game_id ON reviews(game_id);
CREATE INDEX idx_reviews_user_id ON reviews(user_id);
CREATE INDEX idx_user_games_user_id ON user_games(user_id); 