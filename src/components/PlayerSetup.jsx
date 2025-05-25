// src/components/PlayerSetup.jsx
import React, { useState } from 'react';
import { EMOJI_CATEGORIES } from '../constants';
import './PlayerSetup.css'; // Ensure you have this CSS file or styles

const PlayerSetup = ({ onSetupComplete }) => {
  const [player1Name, setPlayer1Name] = useState('');
  const [player2Name, setPlayer2Name] = useState('');
  const [player1Category, setPlayer1Category] = useState(Object.keys(EMOJI_CATEGORIES)[0]);
  const [player2Category, setPlayer2Category] = useState(Object.keys(EMOJI_CATEGORIES)[1]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!player1Name.trim() || !player2Name.trim()) {
      alert("Please enter names for both players.");
      return;
    }
    if (player1Category === player2Category) {
      alert("Players must choose different emoji categories!");
      return;
    }
    onSetupComplete(
      player1Name.trim(),
      player1Category,
      player2Name.trim(),
      player2Category
    );
  };

  return (
    <div className="player-setup-overlay">
      <form className="player-setup-form" onSubmit={handleSubmit}>
        <h1 className="game-title-setup">✨ Blink Tac Toe ✨</h1> {/* Game Title Added */}
        <h2>Player Setup</h2>
        <b><p>Enter your names and choose your emoji fighter category!</p></b>

        <div className="player-input-group">
          <label htmlFor="player1-name">Player 1 Name:</label>
          <input
            type="text"
            id="player1-name"
            value={player1Name}
            onChange={(e) => setPlayer1Name(e.target.value)}
            placeholder="Enter Player's Name"
            required
          />
          <label htmlFor="player1-category">Player 1 Category:</label>
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

        <div className="player-input-group">
          <label htmlFor="player2-name">Player 2 Name:</label>
          <input
            type="text"
            id="player2-name"
            value={player2Name}
            onChange={(e) => setPlayer2Name(e.target.value)}
            placeholder="Enter Player's Name"
            required
          />
          <label htmlFor="player2-category">Player 2 Category:</label>
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