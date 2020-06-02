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
      currentPosition: null,
    };
  }

  handleCvsClick = (e) => {
    const boardCtx = this.boardRef.current.getContext("2d");
    const movCvs = this.movCvsRef.current;
    const { cellSize, chessR } = this;
    const { isBlackTurn, win } = this.state;
    const data = [...this.state.data];

    const chessPos = calcChessCoords(movCvs, e, this.padding, cellSize);
    const { xNum: column, yNum: row } = chessPos;
    const currentPosition = { x: chessPos.x, y: chessPos.y };
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

    let winner = null;
    if (checkWinner(row, column, data)) {
      let status = "";
      if (isBlackTurn) {
        status = "黑棋胜利！";
        winner = "黑棋";
      } else {
        status = "白棋胜利！";
        winner = "白棋";
      }
      this.setState({ win: true, status });
      console.log(`winner: ${winner}`);
    }

    console.log(currentPosition, currentPlayer, winner);
    //ajax
    axios({
      method: "put",
      url: "localhost:3000/put_chess",
      data: {
        currentPosition,
        winner,
      },
    }).catch(function (error) {
      console.log(error);
    });
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

  //ajax
  drawRivalChess = () => {
    const { cellSize, padding, cells, size, chessR } = this;
    drawBoard(this.boardRef.current, padding, cellSize, cells, size);
    const boardCtx = this.boardRef.current.getContext("2d");

    axios({
      method: "get",
      url: "localhost:3001/room",
    }).then(function (response) {
      const { currentPosition: prevPosition, isBlackTurn } = this.state;
      const roomData = response.room[0];
      const { currentPosition, winner } = roomData;

      if (currentPosition !== null) {
        if (
          currentPosition.x === prevPosition.x &&
          currentPosition.y === prevPosition.y
        ) {
          return;
        } else {
          this.setState({ currentPosition });
          drawChess(boardCtx, currentPosition, chessR, isBlackTurn);
          if (winner !== null) {
            alert(winner);
          }
        }
      } else return;
    });
  };

  componentDidMount() {
    this.drawRivalChess();
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
