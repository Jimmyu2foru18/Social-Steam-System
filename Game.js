import React, { useState, useEffect } from 'react';

function Game({ id }) {
    const [game, setGame] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchGame = async () => {
            try {
                const response = await fetch(`/api/games/${id}`);
                const data = await response.json();
                setGame(data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching game:', error);
                setLoading(false);
            }
        };

        fetchGame();
    }, [id]);

    if (loading) return <div>Loading...</div>;
    if (!game) return <div>Game not found</div>;

    return (
        <div className="game-detail">
            <h2>{game.title}</h2>
            <div className="game-info">
                <img src={game.imageUrl} alt={game.title} />
                <div className="game-metadata">
                    <p><strong>Developer:</strong> {game.developer}</p>
                    <p><strong>Publisher:</strong> {game.publisher}</p>
                    <p><strong>Release Date:</strong> {game.releaseDate}</p>
                    <p><strong>Genres:</strong> {game.genres.join(', ')}</p>
                </div>
            </div>
            <div className="game-description">
                <h3>About</h3>
                <p>{game.description}</p>
            </div>
        </div>
    );
}

export default Game;
