import React, { Component } from "react";
import axios from "axios";
import Cookies from "js-cookies";
import Board from "../utils/draw";
import { checkWinner } from "../utils/judge";

class ChessBoard extends Component {
  constructor(props) {
    super(props);
    const { cells, padding, cellSize, chessR } = props;
    this.board = new Board(padding, cellSize, cells, chessR);
    this.boardRef = React.createRef();
    this.movCvsRef = React.createRef();
    this.feedBRef = React.createRef();
    this.playerId = Cookies.getItem("playerId");
    this.data = [...Array(cells + 1)].map((x) => Array(cells + 1).fill(0));
    this.isBlackTurn = true;
    this.state = {
      blackHolder: "",
      whiteHolder: "",
      winner: null,
    };
  }

  changeChessStatus = (isBlackTurn, chessPos) => {
    const data = [...this.data];
    const { xNum: column, yNum: row } = chessPos;
    const boardCtx = this.boardRef.current.getContext("2d");

    this.board.drawChess(
      boardCtx,
      chessPos,
      this.playerId === this.state.blackHolder ? "black" : "white"
    );
    data[row][column] = isBlackTurn ? 1 : 2;
    this.data = data;
    this.isBlackTurn = !isBlackTurn;
    return data;
  };

  handleCvsClick = (e) => {
    const movCvs = this.movCvsRef.current;
    const { board, playerId, data, isBlackTurn } = this;
    let { winner, blackHolder, whiteHolder } = this.state;
    const chessPos = board.calcChessCoords(movCvs, e);
    const { xNum: column, yNum: row } = chessPos;
    if (
      (playerId === blackHolder &&
        isBlackTurn &&
        data[row][column] === 0 &&
        winner === null) ||
      (playerId === whiteHolder &&
        !isBlackTurn &&
        data[row][column] === 0 &&
        winner === null)
    ) {
      board.clearChess(movCvs);
      const newData = this.changeChessStatus(isBlackTurn, chessPos);
      if (checkWinner(row, column, data)) {
        winner = isBlackTurn ? "黑棋" : "白棋";
        this.setState({ winner });
        console.log(`winner: ${winner}`);
      }

      //ajax
      const that = this;
      axios({
        method: "put",
        url: "http://192.168.1.9:3001/put_chess",
        withCredentials: true,
        data: {
          data: newData,
          winner,
        },
      })
        .then(function () {})
        .catch(function (error) {
          console.log(error.response.data.error.message);
        });
    } else {
      return;
    }
  };

  handleMouseMove = (e) => {
    const movCvs = this.movCvsRef.current;
    const { playerId, board, isBlackTurn } = this;
    const { winner, blackHolder, whiteHolder } = this.state;
    const mousePos = board.calcMousePos(movCvs, e);
    const { x, y } = mousePos;

    if (
      (playerId === blackHolder && isBlackTurn && winner === null) ||
      (playerId === whiteHolder && !isBlackTurn && winner === null)
    ) {
      if (this.board.includePoint(x, y)) {
        board.movChess(
          movCvs,
          x,
          y,
          blackHolder === playerId ? "black" : "white"
        );
      } else {
        board.clearChess(movCvs);
      }
    } else {
      return;
    }
  };

  //ajax
  drawRivalChess = () => {
    let that = this;

    axios({
      method: "get",
      url: "http://192.168.1.9:3001/rooms",
      withCredentials: true, // default
    }).then(function (response) {
      const { winner, chessData, isBlackTurn } = response.data;

      if (chessData) {
        that.setState({
          winner,
        });
        that.isBlackTurn = isBlackTurn;
        that.data = chessData;
        const boardCtx = that.boardRef.current.getContext("2d");
        that.board.drawAllChess(chessData, boardCtx);

        if (winner) {
          console.log(winner);
        }
      }
    });
  };
  componentDidMount() {
    const { cells, board, data } = this;
    board.drawBoard(this.boardRef.current);
    let that = this;

    // ajax
    axios({
      method: "get",
      url: "http://192.168.1.9:3001/rooms",
      withCredentials: true, // default
    }).then(function (response) {
      const {
        blackHolder,
        whiteHolder,
        chessData,
        isBlackTurn,
      } = response.data;
      const newChessData = chessData || data;
      that.data = newChessData;
      const boardCtx = that.boardRef.current.getContext("2d");
      that.board.drawAllChess(newChessData, boardCtx);
      that.setState({
        blackHolder,
        whiteHolder,
      });
      that.isBlackTurn = isBlackTurn;
    });

    if (!this.state.winner) {
      // 轮询
      setInterval(() => {
        this.drawRivalChess();
      }, 2000);
    }
  }

  render() {
    const size = this.board.size;
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
