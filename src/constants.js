// src/constants.js

export const EMOJI_CATEGORIES = {
  animals: { name: 'Animals 🐾', emojis: ['🐶', '🐱', '🐵', '🐰', '🦊', '🐻', '🐼', '🐨'] },
  food: { name: 'Food 🍔', emojis: ['🍕', '🍟', '🍔', '🍩', '🍓', '🍉', '🍦', '🍪'] },
  sports: { name: 'Sports ⚽', emojis: ['⚽', '🏀', '🏈', '🎾', '🏐', '🎱', '🎳', '🏆'] },
  faces: { name: 'Faces 😀', emojis: ['😀', '😂', '😍', '🥳', '😎', '😢', '😡', '😱'] }
};

export const WINNING_COMBINATIONS = [
  [0, 1, 2], // Horizontal
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6], // Vertical
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8], // Diagonal
  [2, 4, 6]
];

export const INITIAL_BOARD_SIZE = 9;
export const MAX_EMOJIS_PER_PLAYER = 3;