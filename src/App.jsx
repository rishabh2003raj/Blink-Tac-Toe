// src/App.jsx
import React, { useState, useEffect, useCallback } from 'react';
import Board from './components/Board';
import GameInfo from './components/GameInfo';
import PlayerSetup from './components/PlayerSetup';
import HelpModal from './components/HelpModal';
import { getRandomEmoji, checkWinner } from './utils';
import { INITIAL_BOARD_SIZE, MAX_EMOJIS_PER_PLAYER, EMOJI_CATEGORIES } from './constants';
import './App.css';

const initialBoard = () => Array(INITIAL_BOARD_SIZE).fill(null);

function App() {
  const [board, setBoard] = useState(initialBoard());
  const [currentPlayer, setCurrentPlayer] = useState(1);

  // Player names and categories state
  const [player1Name, setPlayer1Name] = useState('');
  const [player2Name, setPlayer2Name] = useState('');
  const [player1Category, setPlayer1Category] = useState(null);
  const [player2Category, setPlayer2Category] = useState(null);

  const [player1EmojisQueue, setPlayer1EmojisQueue] = useState([]);
  const [player2EmojisQueue, setPlayer2EmojisQueue] = useState([]);
  const [winnerInfo, setWinnerInfo] = useState(null);
  const [gamePhase, setGamePhase] = useState('setup');
  const [score, setScore] = useState({ player1: 0, player2: 0 });
  const [showHelp, setShowHelp] = useState(false);
  const [nextEmojiId, setNextEmojiId] = useState(0);

  const getNewEmojiId = () => {
    const id = nextEmojiId;
    setNextEmojiId(id + 1);
    return id;
  };

  const resetBoardState = () => {
    setBoard(initialBoard());
    setPlayer1EmojisQueue([]);
    setPlayer2EmojisQueue([]);
    setWinnerInfo(null);
    setCurrentPlayer(1);
  };

  const handleGameSetup = (p1Name, p1Cat, p2Name, p2Cat) => {
    setPlayer1Name(p1Name);
    setPlayer1Category(p1Cat);
    setPlayer2Name(p2Name);
    setPlayer2Category(p2Cat);
    resetBoardState();
    setScore({ player1: 0, player2: 0 });
    setGamePhase('playing');
    setShowHelp(false);
  };

  const handleRestartGame = () => {
    resetBoardState();
    setGamePhase('playing');
  };

  const handleFullReset = () => {
    setGamePhase('setup');
    resetBoardState();
    setPlayer1Name('');
    setPlayer2Name('');
    setPlayer1Category(null);
    setPlayer2Category(null);
    setScore({ player1: 0, player2: 0 });
  };

  const handleClick = useCallback((index) => {
    if (winnerInfo || board[index] || gamePhase !== 'playing') {
      return;
    }

    const newBoard = [...board];
    const currentCategory = currentPlayer === 1 ? player1Category : player2Category;
    const newEmoji = getRandomEmoji(currentCategory);
    const newEmojiId = getNewEmojiId();

    let currentQueue = currentPlayer === 1 ? player1EmojisQueue : player2EmojisQueue;
    let oldestEmojiData = null;

    if (currentQueue.length === MAX_EMOJIS_PER_PLAYER) {
      oldestEmojiData = currentQueue[0];
      if (index === oldestEmojiData.index) {
        alert("You cannot place your new emoji where your oldest emoji is about to vanish. Choose another cell.");
        return;
      }
      if (newBoard[oldestEmojiData.index]) {
        newBoard[oldestEmojiData.index] = { ...newBoard[oldestEmojiData.index], isVanishing: true };
      }
      setTimeout(() => {
        setBoard(prevBoard => {
          const tempBoard = [...prevBoard];
          if (tempBoard[oldestEmojiData.index]?.id === oldestEmojiData.id) {
            tempBoard[oldestEmojiData.index] = null;
          }
          return tempBoard;
        });
      }, 280);
      currentQueue = currentQueue.slice(1);
    }

    newBoard[index] = { emoji: newEmoji, player: currentPlayer, id: newEmojiId, isNew: true };
    const updatedQueue = [...currentQueue, { emoji: newEmoji, index, id: newEmojiId }];

    setBoard(newBoard);
    if (currentPlayer === 1) {
      setPlayer1EmojisQueue(updatedQueue);
    } else {
      setPlayer2EmojisQueue(updatedQueue);
    }

    setTimeout(() => {
      setBoard(prevBoard => {
        const tempBoard = [...prevBoard];
        if (tempBoard[index]?.id === newEmojiId) {
          tempBoard[index] = { ...tempBoard[index], isNew: false };
        }
        return tempBoard;
      });
    }, 300);

    const gameWinnerResult = checkWinner(newBoard, currentPlayer, player1Category, player2Category);
    if (gameWinnerResult) {
      setWinnerInfo(gameWinnerResult);
      setScore(prevScore => ({
        ...prevScore,
        [currentPlayer === 1 ? 'player1' : 'player2']: prevScore[currentPlayer === 1 ? 'player1' : 'player2'] + 1,
      }));
      setGamePhase('gameOver');
    } else {
      setCurrentPlayer(currentPlayer === 1 ? 2 : 1);
    }
  }, [board, currentPlayer, player1Category, player2Category, player1EmojisQueue, player2EmojisQueue, winnerInfo, gamePhase, nextEmojiId]); // Removed player names from deps as they don't change during a click

  if (gamePhase === 'setup') {
    return <PlayerSetup onSetupComplete={handleGameSetup} />;
  }

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>✨ Blink Tac Toe ✨</h1>
      </header>
      <GameInfo
        currentPlayer={currentPlayer}
        winner={winnerInfo?.winner}
        player1Name={player1Name} // Pass name
        player2Name={player2Name} // Pass name
        player1Category={player1Category} // Still needed for emoji in score
        player2Category={player2Category} // Still needed for emoji in score
        onRestart={handleRestartGame}
        score={score}
        onShowHelp={() => setShowHelp(true)}
      />
      <Board
        board={board}
        onClick={handleClick}
        winningCombination={winnerInfo?.combination}
      />
      {showHelp && <HelpModal onClose={() => setShowHelp(false)} />}
      <button onClick={handleFullReset} className="full-reset-btn">Change Setup & Reset Game</button>
    </div>
  );
}

export default App;