# ✨ Blink Tac Toe ✨

A fun and animated twist on the classic Tic Tac Toe — now with emoji battles, vanishing moves, and category-based customizations! Built using **React**.

---

# ✨ Deployed Link ✨
https://blink-tac-toe-2iw5.onrender.com

## 🚀 Tech Stack

- **React** (with functional components and hooks)
- **CSS Modules** for component-specific styling
- Vanilla JS logic for game mechanics
- No external state management (like Redux) — simple and efficient state flow with `useState` and `useEffect`

---

## 🎭 Emoji Categories

Each player selects a unique emoji "fighter" category before the game starts:

- **Animals** 🐶 🐱 🦊
- **Food** 🍕 🍩 🍎
- **Sports** ⚽ 🏀 🏈
- **Faces** 😀 😎 🤖


Each category contains a pool of themed emojis that are randomly picked during gameplay.

---

## 🌀 Vanishing Emoji Mechanic

To make gameplay more dynamic, each player can only have **3 active emojis on the board** at a time.

**How it works:**

- When a player tries to place a **4th emoji**, their **oldest emoji** begins to **vanish** with a pop-out animation.
- The actual removal is slightly delayed (via `setTimeout`) to allow a smooth transition.
- Players **cannot overwrite the cell** where the emoji is vanishing to maintain fairness.

This adds a unique twist to traditional Tic Tac Toe — **strategy is not only about placement, but also timing**!

---

## 🛠 Features

- 🧑‍🤝‍🧑 Player name and emoji category setup
- 📦 Emoji queueing with max limit
- 🔁 Animated emoji insertions and removals
- 🧠 Intelligent win detection
- 🔢 Real-time score tracking
- 📖 In-game help modal
- 📱 Fully responsive on mobile

---

## 📌 Future Improvements

If given more time, here’s what I would improve or add:

- 🧠 **AI Opponent Mode** for single-player
- 🌈 **Custom Emoji Packs** and user-defined categories
- 💾 **Persistent Scores** using localStorage or Firebase
- 🎶 Fun **sound effects** and background music toggle
- 🏆 **Leaderboards** and game history

---

## 🧩 Folder Structure
src/
│
├── components/
│ ├── Board.jsx
│ ├── Cell.jsx
│ ├── GameInfo.jsx
│ ├── HelpModal.jsx
│ └── PlayerSetup.jsx
│
├── utils/
│ └── (emoji logic & winner logic)
├── constants.js
├── App.jsx
├── App.css
└── index.js

## 🧪 Running Locally

git clone https://github.com/rishabh2003raj/blink-tac-toe.git
cd blink-tac-toe
npm install
npm run dev
