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
  const [player1Category, setPlayer1Category] = useState(null);
  const [player2Category, setPlayer2Category] = useState(null);
  const [player1EmojisQueue, setPlayer1EmojisQueue] = useState([]); // Stores {emoji, index, id}
  const [player2EmojisQueue, setPlayer2EmojisQueue] = useState([]);
  const [winnerInfo, setWinnerInfo] = useState(null); // { winner: 1 or 2, combination: [...] }
  const [gamePhase, setGamePhase] = useState('setup'); // 'setup', 'playing', 'gameOver'
  const [score, setScore] = useState({ player1: 0, player2: 0 });
  const [showHelp, setShowHelp] = useState(false);
  const [nextEmojiId, setNextEmojiId] = useState(0); // For unique keys for emojis for animation

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
    setCurrentPlayer(1); // Player 1 starts new round
    // Don't reset categories or score here, only on full game reset if desired
  };

  const handleGameSetup = (p1Cat, p2Cat) => {
    setPlayer1Category(p1Cat);
    setPlayer2Category(p2Cat);
    resetBoardState(); // Reset board for new setup
    setScore({ player1: 0, player2: 0 }); // Reset score on new setup
    setGamePhase('playing');
    setShowHelp(false); // Close help if it was open
  };

  const handleRestartGame = () => {
    resetBoardState();
    setGamePhase('playing'); // Go back to playing state
  };

  const handleFullReset = () => { // Optional: if you want a button to go back to category selection
    setGamePhase('setup');
    resetBoardState();
    setPlayer1Category(null);
    setPlayer2Category(null);
    setScore({ player1: 0, player2: 0 });
  };

  const handleClick = useCallback((index) => {
    if (winnerInfo || board[index] || gamePhase !== 'playing') {
      return; // Cell taken, game over, or not playing
    }

    const newBoard = [...board];
    const currentCategory = currentPlayer === 1 ? player1Category : player2Category;
    const newEmoji = getRandomEmoji(currentCategory);
    const newEmojiId = getNewEmojiId();

    let currentQueue = currentPlayer === 1 ? player1EmojisQueue : player2EmojisQueue;
    let oldestEmojiData = null;

    // Vanishing Rule Logic
    if (currentQueue.length === MAX_EMOJIS_PER_PLAYER) {
      oldestEmojiData = currentQueue[0];
      if (index === oldestEmojiData.index) {
        // Cannot place on the spot of the oldest emoji that's about to vanish
        alert("You cannot place your new emoji where your oldest emoji is about to vanish. Choose another cell.");
        return;
      }
      // Mark oldest emoji for vanishing animation
      if (newBoard[oldestEmojiData.index]) {
        newBoard[oldestEmojiData.index] = { ...newBoard[oldestEmojiData.index], isVanishing: true };
      }

      // Remove oldest emoji after a short delay for animation
      setTimeout(() => {
        setBoard(prevBoard => {
            const tempBoard = [...prevBoard];
            if (tempBoard[oldestEmojiData.index]?.id === oldestEmojiData.id) { // Ensure it's the same emoji
                 tempBoard[oldestEmojiData.index] = null;
            }
            return tempBoard;
        });
      }, 280); // Should match animation duration

      currentQueue = currentQueue.slice(1); // Remove oldest from queue
    }

    // Place new emoji (will be placed after vanishing animation starts)
    newBoard[index] = { emoji: newEmoji, player: currentPlayer, id: newEmojiId, isNew: true };
    const updatedQueue = [...currentQueue, { emoji: newEmoji, index, id: newEmojiId }];

    setBoard(newBoard);
    if (currentPlayer === 1) {
      setPlayer1EmojisQueue(updatedQueue);
    } else {
      setPlayer2EmojisQueue(updatedQueue);
    }

    // Clear 'isNew' flag after animation
    setTimeout(() => {
        setBoard(prevBoard => {
            const tempBoard = [...prevBoard];
            if (tempBoard[index]?.id === newEmojiId) {
                 tempBoard[index] = { ...tempBoard[index], isNew: false };
            }
            return tempBoard;
        });
    }, 300); // PopIn animation duration

    // Check for winner
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
  }, [board, currentPlayer, player1Category, player2Category, player1EmojisQueue, player2EmojisQueue, winnerInfo, gamePhase, nextEmojiId]);


  useEffect(() => {
    // This effect can be used to initialize help on first load if desired
    // For example, if !localStorage.getItem('hasSeenHelpBlinkTacToe') then setShowHelp(true); localStorage.setItem(...);
  }, []);

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
        onRestart={handleRestartGame}
        score={score}
        player1Category={player1Category}
        player2Category={player2Category}
        onShowHelp={() => setShowHelp(true)}
      />
      <Board
        board={board}
        onClick={handleClick}
        winningCombination={winnerInfo?.combination}
      />
      {showHelp && <HelpModal onClose={() => setShowHelp(false)} />}
      <button onClick={handleFullReset} className="full-reset-btn">Change Categories & Reset</button>
    </div>
  );
}

export default App;