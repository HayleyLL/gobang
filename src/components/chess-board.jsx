import React, { Component } from "react";
import axios from "axios";
import Cookies from "js-cookies";
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
    this.playerId = Cookies.get("playerId");

    this.state = {
      data: [...Array(cells + 1)].map((x) => Array(cells + 1).fill(0)),
      blackHolder: "",
      whiteHolder: "",
      isBlackTurn: true,
      winner: null,
    };
  }

  changeChessStatus = (isBlackTurn, chessPos) => {
    const data = [...this.state.data];
    const { xNum: column, yNum: row } = chessPos;
    const boardCtx = this.boardRef.current.getContext("2d");

    drawChess(boardCtx, chessPos, this.chessR, isBlackTurn);
    data[row][column] = isBlackTurn ? 1 : 2;

    this.setState({ isBlackTurn: !isBlackTurn, data });
    return data;
  };

  handleCvsClick = (e) => {
    const movCvs = this.movCvsRef.current;
    const { padding, cellSize, playerId } = this;
    const { isBlackTurn, winner, data } = this.state;

    const chessPos = calcChessCoords(movCvs, e, padding, cellSize);
    const { xNum: column, yNum: row } = chessPos;

    if (
      (playerId === blackHolder && !isBlackTurn) ||
      (playerId === whiteHolder && isBlackTurn) ||
      data[row][column] !== 0 ||
      winner
    ) {
      return;
    }

    clearChess(movCvs);
    const newData = this.changeChessStatus(isBlackTurn, chessPos);

    if (checkWinner(row, column, data)) {
      winner = isBlackTurn ? "黑棋" : "白棋";
      this.setState({ winner });
      console.log(`winner: ${winner}`);
    }

    //ajax
    axios({
      method: "put",
      url: "localhost:3001/put_chess",
      data: {
        chessData: newData,
        winner,
      },
    }).catch(function (error) {
      console.log(error);
    });

    if (winner !== null) {
      setTimeout(function () {
        alert(winner);
      }, 0);
    }
  };

  handleMouseMove = (e) => {
    const movCvs = this.movCvsRef.current;
    const { size, chessR, padding, playerId } = this;
    const { isBlackTurn, winner } = this.state;
    const mousePos = calcMousePos(movCvs, e);
    const { x, y } = mousePos;

    if (
      winner ||
      (playerId === blackHolder && !isBlackTurn) ||
      (playerId === whiteHolder && isBlackTurn)
    ) {
      return;
    }

    if (
      x >= padding &&
      x <= size - padding &&
      y >= padding &&
      y <= size - padding
    ) {
      movChess(movCvs, chessR, x, y, isBlackTurn);
    }
  };

  //ajax
  drawRivalChess = (chessR) => {
    const boardCtx = this.boardRef.current.getContext("2d");
    let that = this;

    axios({
      method: "get",
      url: "localhost:3001/rooms",
    }).then(function (response) {
      const { isBlackTurn } = this.state;
      const { winner, chessData } = response;

      changeChessStatus(isBlackTurn, blackHolder);
      that.setState({
        winner,
        chessData,
      });

      if (currentPosition !== null && data[column][row] === 0) {
        drawChess(boardCtx, currentPosition, chessR, isBlackTurn);

        if (winner !== null) {
          alert(winner);
        }
      }
    });
  };

  componentDidMount() {
    const { cellSize, padding, cells, size, chessR } = this;
    drawBoard(this.boardRef.current, padding, cellSize, cells, size);

    //ajax
    axios({
      method: "get",
      url: "localhost:3001/rooms",
    }).then(function (response) {
      const { blackHolder, whiteHolder } = response;
      this.setState({ blackHolder, whiteHolder });
    });

    if (!this.state.winner) {
      // 轮询
      // setInterval(() => {
      this.drawRivalChess(chessR);
      // }, 100);
    }
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
