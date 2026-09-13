import React, { useState } from "react";

export function Board() {
  // 1. Core Component States Allocation
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);

  // 2. The Core Winning Line Calculation Algorithm
  const winner = calculateWinner(squares);
  const isDraw = !winner && squares.every((square) => square !== null);
  const isGameOver = !!winner || isDraw;

  // 3. The Core Action Engine Click Hook
  function handleSquareClick(index) {
    if (squares[index] || isGameOver) return;

    const nextSquares = squares.slice();
    nextSquares[index] = isXNext ? "X" : "O";

    setSquares(nextSquares);
    setIsXNext(!isXNext);
  }

  // 4. The Reset Interface Execution Loop
  function handleReset() {
    setSquares(Array(9).fill(null));
    setIsXNext(true);
  }

  // 5. Dynamic Status Message String Builder
  let statusMessage = "";
  if (winner) {
    statusMessage = `Winner: ${winner}`;
  } else if (isDraw) {
    statusMessage = "Status: Draw";
  } else {
    statusMessage = `Next Player: ${isXNext ? "X" : "O"}`;
  }

  return (
    <div className="game-container">
      {/* 🏛️ Glowing Cyberpunk Title Card Element */}
      <h1 className="game-title">Three In A Row</h1>

      {/* 📊 Dynamic Cyberpunk Status Indicator */}
      <div
        id="game-status"
        className={winner ? "status-winner" : isDraw ? "status-draw" : ""}
      >
        {statusMessage}
      </div>

      {/* 🏢 The 3x3 Interlocking Neon Grid */}
      <div className="board-grid">
        {squares.map((value, index) => (
          <button
            key={index}
            className={`square ${value ? "pop-active" : ""}`}
            onClick={() => handleSquareClick(index)}
          >
            <span className={value === "X" ? "text-x" : "text-o"}>{value}</span>
          </button>
        ))}
      </div>

      {/* 🚨 Metallic Gold Reset Interface Target Key */}
      <button id="reset" onClick={handleReset}>
        Reset Arena
      </button>
    </div>
  );
}

// 🏛️ HELPER VECTOR SCANNER: Monitors the 8 straight geometric win paths
function calculateWinner(squares) {
  // 🎯 CRITICAL REPAIR NODE: Fully typed and indexed coordinate coordinates to prevent runtime crashes
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8], // Horizontal rows
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8], // Vertical columns
    [0, 4, 8],
    [2, 4, 6], // Diagonal lines
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
