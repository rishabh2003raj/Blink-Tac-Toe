// src/components/PlayerSetup.jsx
import React, { useState } from 'react';
import { EMOJI_CATEGORIES } from '../constants';
import './PlayerSetup.css';

const PlayerSetup = ({ onSetupComplete }) => {
  const [player1Category, setPlayer1Category] = useState(Object.keys(EMOJI_CATEGORIES)[0]);
  const [player2Category, setPlayer2Category] = useState(Object.keys(EMOJI_CATEGORIES)[1]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (player1Category === player2Category) {
      alert("Players must choose different emoji categories!");
      return;
    }
    onSetupComplete(player1Category, player2Category);
  };

  return (
    <div className="player-setup-overlay">
      <form className="player-setup-form" onSubmit={handleSubmit}>
        <h2>Player Setup</h2>
        <p>Choose your emoji fighter category!</p>
        <div className="category-selector">
          <label htmlFor="player1-category">Player 1:</label>
          <select
            id="player1-category"
            value={player1Category}
            onChange={(e) => setPlayer1Category(e.target.value)}
          >
            {Object.entries(EMOJI_CATEGORIES).map(([key, { name }]) => (
              <option key={key} value={key}>{name}</option>
            ))}
          </select>
        </div>
        <div className="category-selector">
          <label htmlFor="player2-category">Player 2:</label>
          <select
            id="player2-category"
            value={player2Category}
            onChange={(e) => setPlayer2Category(e.target.value)}
          >
            {Object.entries(EMOJI_CATEGORIES).map(([key, { name }]) => (
              <option key={key} value={key}>{name}</option>
            ))}
          </select>
        </div>
        <button type="submit" className="start-game-btn">Start Game</button>
      </form>
    </div>
  );
};

export default PlayerSetup;