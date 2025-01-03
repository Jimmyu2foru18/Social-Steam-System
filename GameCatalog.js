import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function GameCatalog() {
    const [games, setGames] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [filters, setFilters] = useState({
        genre: '',
        minRating: 0,
        sortBy: 'releaseDate'
    });

    useEffect(() => {
        fetchGames();
    }, [filters]);

    const fetchGames = async () => {
        try {
            const queryParams = new URLSearchParams({
                ...filters,
                search: searchTerm
            });
            
            const response = await fetch(`/api/games?${queryParams}`);
            const data = await response.json();
            setGames(data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching games:', error);
            setLoading(false);
        }
    };

    const handleSearch = (e) => {
        e.preventDefault();
        fetchGames();
    };

    const handleFilterChange = (name, value) => {
        setFilters(prev => ({
            ...prev,
            [name]: value
        }));
    };

    if (loading) return <div>Loading...</div>;

    return (
        <div className="game-catalog">
            <div className="catalog-header">
                <h2>Game Catalog</h2>
                <form onSubmit={handleSearch} className="search-form">
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Search games..."
                    />
                    <button type="submit">Search</button>
                </form>
            </div>

            <div className="filters">
                <select
                    value={filters.genre}
                    onChange={(e) => handleFilterChange('genre', e.target.value)}
                >
                    <option value="">All Genres</option>
                    <option value="action">Action</option>
                    <option value="rpg">RPG</option>
                    <option value="strategy">Strategy</option>
                    <option value="sports">Sports</option>
                </select>

                <select
                    value={filters.sortBy}
                    onChange={(e) => handleFilterChange('sortBy', e.target.value)}
                >
                    <option value="releaseDate">Release Date</option>
                    <option value="rating">Rating</option>
                    <option value="title">Title</option>
                </select>
            </div>

            <div className="games-grid">
                {games.map(game => (
                    <Link to={`/games/${game.id}`} key={game.id} className="game-card">
                        <img src={game.imageUrl} alt={game.title} />
                        <div className="game-info">
                            <h3>{game.title}</h3>
                            <div className="game-meta">
                                <span className="rating">★ {game.averageRating.toFixed(1)}</span>
                                <span className="genre">{game.genre}</span>
                            </div>
                            <p className="price">${game.price}</p>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}

export default GameCatalog;