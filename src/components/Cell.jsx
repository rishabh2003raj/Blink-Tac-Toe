// src/components/Cell.jsx
import React from 'react';
import './Cell.css';

const Cell = ({ value, onClick, isWinning }) => {
  const cellContent = value ? value.emoji : '';
  const playerClass = value ? `player${value.player}` : '';
  const winningClass = isWinning ? 'winning' : '';

  return (
    <button className={`cell ${playerClass} ${winningClass}`} onClick={onClick} aria-label={`Cell ${cellContent}`}>
      <span className={`emoji ${value && value.isNew ? 'new-emoji' : ''} ${value && value.isVanishing ? 'vanishing-emoji' : ''}`}>
        {cellContent}
      </span>
    </button>
  );
};

export default Cell;