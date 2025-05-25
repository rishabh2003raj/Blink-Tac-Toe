// src/components/HelpModal.jsx
import React from 'react';
import './HelpModal.css';

const HelpModal = ({ onClose }) => {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2>📜 Blink Tac Toe - Game Rules 📜</h2>
        <ol>
          <li><strong>Board:</strong> Played on a 3x3 grid. Starts empty. Max 6 active emojis (3 per player).</li>
          <li><strong>Emoji Categories:</strong> Each player selects an emoji category. On their turn, a random emoji from their category is assigned.</li>
          <li><strong>Turns:</strong> Player 1 starts. Players alternate turns. Place your emoji on any empty cell.</li>
          <li><strong>Vanishing Rule (FIFO):</strong>
            <ul>
              <li>Each player can have only 3 emojis on the board.</li>
              <li>When placing your 4th emoji, your OLDEST emoji is removed automatically.</li>
              <li>The 4th emoji CANNOT be placed where your 1st (oldest) emoji was.</li>
              <li>The cell of the vanished emoji becomes empty.</li>
            </ul>
          </li>
          <li><strong>Winning:</strong> Form a line of 3 of YOUR OWN emojis (horizontally, vertically, or diagonally).</li>
          <li><strong>Game End:</strong> Game continues until a win. No draws. Winner is displayed, and you can play again.</li>
        </ol>
        <button onClick={onClose} className="close-modal-btn">Got it!</button>
      </div>
    </div>
  );
};

export default HelpModal;