import React from "react";
import ReactDOM from "react-dom/client";
import { Board } from "./logic.jsx"; // 🎯 CRITICAL FIX: Points cleanly to your renamed logic file!
import "./game.css"; // 🎯 Points to your custom cyberpunk stylesheet

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Board />
  </React.StrictMode>,
);
