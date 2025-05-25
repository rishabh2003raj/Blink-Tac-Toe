// src/components/GameInfo.jsx
import React from 'react';
import './GameInfo.css';
import { EMOJI_CATEGORIES } from '../constants'; // Ensure this import is correct

const GameInfo = ({ currentPlayer, winner, onRestart, score, player1Category, player2Category, onShowHelp }) => {
  let status; // This is the variable we are focusing on

  if (winner) {
    const winningCategoryKey = winner === 1 ? player1Category : player2Category;
    const winningPlayerEmoji = EMOJI_CATEGORIES[winningCategoryKey]?.emojis[0] || `P${winner}`;
    // CORRECTED LINE: This is a JavaScript template literal.
    // It uses backticks (` `) and ${...} for variable interpolation.
    status = `Player ${winner} (${winningPlayerEmoji}) Wins! 🎉`;
  } else {
    const currentPlayerCategoryKey = currentPlayer === 1 ? player1Category : player2Category;
    const currentPlayerEmoji = EMOJI_CATEGORIES[currentPlayerCategoryKey]?.emojis[0] || `P${currentPlayer}`;
    // CORRECTED LINE for the "Next Player" case as well
    status = `Next Player: Player ${currentPlayer} (${currentPlayerEmoji})`;
  }

  // For the score display, ensure categories are valid before accessing emojis
  const p1DisplayEmoji = player1Category && EMOJI_CATEGORIES[player1Category] ? EMOJI_CATEGORIES[player1Category].emojis[0] : 'P1';
  const p2DisplayEmoji = player2Category && EMOJI_CATEGORIES[player2Category] ? EMOJI_CATEGORIES[player2Category].emojis[0] : 'P2';


  return (
    <div className="game-info">
      <div className="status">{status}</div> {/* This will now render the evaluated string */}
      <div className="score-board">
        <span>Player 1 ({p1DisplayEmoji}): {score.player1}</span>
        <span>Player 2 ({p2DisplayEmoji}): {score.player2}</span>
      </div>
      {winner && (
        <button onClick={onRestart} className="restart-btn">Play Again</button>
      )}
      <button onClick={onShowHelp} className="help-btn">Help ❓</button>
    </div>
  );
};

export default GameInfo;