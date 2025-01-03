import React, { useState, useEffect } from 'react';

function User({ id }) {
    const [user, setUser] = useState(null);
    const [userGames, setUserGames] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const [userResponse, gamesResponse] = await Promise.all([
                    fetch(`/api/users/${id}`),
                    fetch(`/api/users/${id}/games`)
                ]);
                
                const userData = await userResponse.json();
                const gamesData = await gamesResponse.json();
                
                setUser(userData);
                setUserGames(gamesData);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching user data:', error);
                setLoading(false);
            }
        };

        fetchUserData();
    }, [id]);

    if (loading) return <div>Loading...</div>;
    if (!user) return <div>User not found</div>;

    return (
        <div className="user-profile">
            <div className="user-info">
                <h2>{user.username}'s Profile</h2>
                <p>Member since: {new Date(user.createdAt).toLocaleDateString()}</p>
            </div>
            
            <div className="user-games">
                <h3>Game Library</h3>
                <div className="games-grid">
                    {userGames.map(game => (
                        <div key={game.id} className="game-card">
                            <img src={game.imageUrl} alt={game.title} />
                            <h4>{game.title}</h4>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default User;
