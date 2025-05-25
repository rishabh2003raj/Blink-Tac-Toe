// src/components/Board.jsx
import React from 'react';
import Cell from './Cell';
import './Board.css';

const Board = ({ board, onClick, winningCombination }) => {
  return (
    <div className="board">
      {board.map((cellValue, index) => (
        <Cell
          key={index}
          value={cellValue}
          onClick={() => onClick(index)}
          isWinning={winningCombination && winningCombination.includes(index)}
        />
      ))}
    </div>
  );
};

export default Board;