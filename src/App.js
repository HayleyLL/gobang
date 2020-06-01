import React from "react";
import ChessBoard from "./components/chess-board";
import "./App.css";

function App() {
  return (
    <div className="App">
      <ChessBoard cells={18} cellSize={30} padding={20} chessR={12} />
    </div>
  );
}

export default App;
