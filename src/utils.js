// src/utils.js
import { EMOJI_CATEGORIES, WINNING_COMBINATIONS, MAX_EMOJIS_PER_PLAYER } from './constants';

export const getRandomEmoji = (categoryKey) => {
  if (!EMOJI_CATEGORIES[categoryKey]) return '❓';
  const categoryEmojis = EMOJI_CATEGORIES[categoryKey].emojis;
  return categoryEmojis[Math.floor(Math.random() * categoryEmojis.length)];
};

export const checkWinner = (board, currentPlayer, player1Category, player2Category) => {
  const playerCategory = currentPlayer === 1 ? player1Category : player2Category;
  if (!playerCategory) return null;

  const playerEmojis = EMOJI_CATEGORIES[playerCategory].emojis;

  for (let i = 0; i < WINNING_COMBINATIONS.length; i++) {
    const [a, b, c] = WINNING_COMBINATIONS[i];
    if (
      board[a] &&
      board[b] &&
      board[c] &&
      playerEmojis.includes(board[a].emoji) &&
      playerEmojis.includes(board[b].emoji) &&
      playerEmojis.includes(board[c].emoji) &&
      board[a].player === currentPlayer &&
      board[b].player === currentPlayer &&
      board[c].player === currentPlayer
    ) {
      return { winner: currentPlayer, combination: [a, b, c] }; // Return winner and winning combination
    }
  }
  return null;
};