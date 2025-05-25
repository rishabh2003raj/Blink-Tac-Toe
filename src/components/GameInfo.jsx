// src/components/GameInfo.jsx
import React from 'react';
import './GameInfo.css';
import { EMOJI_CATEGORIES } from '../constants';

const GameInfo = ({
  currentPlayer,
  winner,
  player1Name, // New prop
  player2Name, // New prop
  player1Category,
  player2Category,
  onRestart,
  score,
  onShowHelp
}) => {
  let status;

  const p1DisplayName = player1Name || 'Player 1';
  const p2DisplayName = player2Name || 'Player 2';

  if (winner) {
    const winnerName = winner === 1 ? p1DisplayName : p2DisplayName;
    status = `${winnerName} Wins! 🎉`; // Display winner's name
  } else {
    const currentPlayerName = currentPlayer === 1 ? p1DisplayName : p2DisplayName;
    status = `${currentPlayerName}'s Turn`; // Display current player's name
  }

  // For the score display, associate names with scores and optional emojis
  const p1DisplayEmoji = player1Category && EMOJI_CATEGORIES[player1Category]
    ? EMOJI_CATEGORIES[player1Category].emojis[0]
    : '';
  const p2DisplayEmoji = player2Category && EMOJI_CATEGORIES[player2Category]
    ? EMOJI_CATEGORIES[player2Category].emojis[0]
    : '';

  return (
    <div className="game-info">
      <div className="status">{status}</div>
      <div className="score-board">
        <span>{p1DisplayName} {p1DisplayEmoji}: {score.player1}</span>
        <span>{p2DisplayName} {p2DisplayEmoji}: {score.player2}</span>
      </div>
      {winner && (
        <button onClick={onRestart} className="restart-btn">Play Again</button>
      )}
      <button onClick={onShowHelp} className="help-btn">Help ❓</button>
    </div>
  );
};

export default GameInfo;