import React from 'react';
import GameCatalog from './components/GameCatalog';
import UserProfile from './components/UserProfile';

function App() {
    return (
        <div>
            <h1>Steam System</h1>
            <GameCatalog />
            <UserProfile />
        </div>
    );
}

export default App;