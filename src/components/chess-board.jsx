import React, { Component } from "react";
import axios from "axios";
import {
  drawBoard,
  drawChess,
  calcChessCoords,
  calcMousePos,
  movChess,
  clearChess,
} from "../utils/draw";
import { checkWinner } from "../utils/judge";

class ChessBoard extends Component {
  constructor(props) {
    super(props);
    const { cells, padding, cellSize, chessR } = props;
    this.size = cells * cellSize + 2 * padding;
    this.chessR = chessR;
    this.cells = cells;
    this.padding = padding;
    this.cellSize = cellSize;
    this.boardRef = React.createRef();
    this.movCvsRef = React.createRef();
    this.feedBRef = React.createRef();

    this.state = {
      data: [...Array(cells + 1)].map((x) => Array(cells + 1).fill(0)),
      isBlackTurn: true,
      win: false,
      status: "",
    };
  }

  handleCvsClick = (e) => {
    const boardCvs = this.boardRef.current;
    const boardCtx = boardCvs.getContext("2d");
    const movCvs = this.movCvsRef.current;
    const { cellSize, chessR } = this;
    const { padding, isBlackTurn, win } = this.state;
    const data = [...this.state.data];

    const chessPos = calcChessCoords(movCvs, e, padding, cellSize);
    const { xNum: column, yNum: row } = chessPos;
    if (data[row][column] !== 0 || win) {
      return;
    }

    clearChess(movCvs);
    drawChess(boardCtx, chessPos, chessR, isBlackTurn);
    data[row][column] = isBlackTurn ? 1 : 2;

    this.setState((state) => ({
      data,
      isBlackTurn: !state.isBlackTurn,
    }));

    if (checkWinner(row, column, data)) {
      let status = "";
      isBlackTurn ? (status = "黑棋胜利！") : (status = "白棋胜利！");
      this.setState({ win: true, status });

      setTimeout(function () {
        alert(status);
      }, 0);
    }

    //ajax
  };

  handleMouseMove = (e) => {
    const movCvs = this.movCvsRef.current;
    const { size, chessR, padding } = this;
    const { isBlackTurn, win } = this.state;
    const mousePos = calcMousePos(movCvs, e);
    const { x, y } = mousePos;

    if (win) return;
    else {
      if (
        x >= padding &&
        x <= size - padding &&
        y >= padding &&
        y <= size - padding
      )
        movChess(movCvs, chessR, x, y, isBlackTurn);
      else clearChess(movCvs);
    }
  };

  componentDidMount() {
    const { cellSize, padding, cells, size } = this;
    this.setState({ padding });
    drawBoard(this.boardRef.current, padding, cellSize, cells, size);
  }

  render() {
    const { size } = this;

    return (
      <>
        <div className="feedBack" ref={this.feedBRef}></div>
        <div className="game-board" style={{ position: "relative" }}>
          <canvas id="board" ref={this.boardRef} width={size} height={size}>
            您的浏览器版本过低，请升级游览器！
          </canvas>
          <canvas
            id="moving"
            ref={this.movCvsRef}
            width={size}
            height={size}
            style={{ position: "absolute", top: 0, left: 0, zIndex: 1 }}
            onClick={this.handleCvsClick}
            onMouseMove={this.handleMouseMove}
          />
        </div>
      </>
    );
  }
}

export default ChessBoard;
