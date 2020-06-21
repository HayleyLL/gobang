import React, {Component} from "react";
import axios from "axios";
import Cookies from "js-cookies";
import Drawer from "../utils/draw";
import {checkWinner} from "../utils/judge";
import {baseUrl} from "../end-point/httpRqst";

class ChessBoard extends Component {
    constructor(props) {
        super(props);
        const {cells, padding, cellSize, chessR} = props;
        this.drawer = new Drawer(padding, cellSize, cells, chessR);
        this.boardRef = React.createRef();
        this.chessDropRef = React.createRef();
        this.movCvsRef = React.createRef();
        this.feedBRef = React.createRef();
    }

    drawClickedChess = (chessPos) => {
        const chessDropCtx = this.chessDropRef.current.getContext("2d");
        const role = this.playerId === this.blackHolder ? "black" : "white";

        this.drawer.drawChess(chessDropCtx, chessPos, role);
    };

    updateLocalData = (chessPos) => {
        const data = [...this.data];
        const {xNum: column, yNum: row} = chessPos;
        const {isBlackTurn, count} = this.state;
        data[row][column] = isBlackTurn ? 1 : 2;
        this.data = data;
        this.setState({isBlackTurn: !isBlackTurn, count:count+1});
    };

    handleCvsClick = (e) => {
        const movCvs = this.movCvsRef.current;
        const {drawer, data, playerId, blackHolder,whiteHolder} = this;
        let {winner, isBlackTurn} = this.state;
        const chessPos = drawer.calcChessCoords(movCvs, e);
        const {xNum: column, yNum: row} = chessPos;
        const isClickEligible = this.isClickEligible(data, row, column, winner, isBlackTurn, playerId, blackHolder, whiteHolder);

        if (!isClickEligible) {
            return;
        }
        drawer.clearChess(movCvs);
        this.drawClickedChess(chessPos);
        this.updateLocalData(chessPos);
        if (checkWinner(row, column, data)) {
            winner = isBlackTurn ? "黑棋" : "白棋";
        }
        axios({
            method: "put",
            url: `${baseUrl}/put_chess`,
            withCredentials: true,
            data: {
                data: this.data,
                winner,
            },
        }).catch((error) => {
            console.log(error.response.data.error.message);
        });
    };

    isClickEligible = (data, row, column, winner, isBlackTurn, playerId, blackHolder, whiteHolder) => {
        if (data[row][column] !== 0) {
            return false;
        }
        return this.isMoveEligible(winner, isBlackTurn, playerId, blackHolder, whiteHolder);
    }

    handleMouseMove = (e) => {
        const movCvs = this.movCvsRef.current;
        const {playerId, drawer, blackHolder, whiteHolder} = this;
        const {winner,isBlackTurn} = this.state;
        const mousePos = drawer.calcMouseCoords(movCvs, e);
        const {x, y} = mousePos;
        const role = blackHolder === playerId ? "black" : "white";
        const isMoveEligible = this.isMoveEligible(winner, isBlackTurn, playerId, blackHolder, whiteHolder);
        if (isMoveEligible && drawer.isMouseWithinBoard(x, y)) {
            drawer.movChess(movCvs, x, y, role);
        } else {
            drawer.clearChess(movCvs);
        }
    };

    isMoveEligible = (winner, isBlackTurn, playerId, blackHolder, whiteHolder) => {
        if (winner !== null) {
            return false;
        }

        if (isBlackTurn) {
            return playerId === blackHolder
        } else {
            return playerId === whiteHolder
        }
    };

    //ajax
    getDataAndRefresh = () => {
        axios({
            method: "get",
            url: `${baseUrl}/room`,
            withCredentials: true,
        }).then((response) => {
            const {winner, chessData, isBlackTurn, count} = response.data;

            if (chessData && count >= this.count) {
                this.setState({
                    winner,
                });
                this.setState( isBlackTurn);
                this.data = chessData;
                const chessDropCvs = this.chessDropRef.current;
                this.drawer.clearChess(chessDropCvs);
                this.drawer.drawAllChess(chessData, chessDropCvs);

                if (winner) {
                    this.feedBackOnWin(winner);
                }
            }
        });
    };

    getDataAtIntervals = () => {
        setInterval(() => {
            if (!this.state.winner) this.getDataAndRefresh();
        }, 2000);
    };

    feedBackOnWin = (winner) => {
        const feedBackArea = this.feedBRef.current;
        const feedback = (
            <span className="win-feedback-content"> {`${winner}胜！`}</span>
        );
        this.setState({feedback});
        feedBackArea.className = "win-feedback";
    };

    componentDidMount() {
        const {drawer, data} = this;
        drawer.drawBoard(this.boardRef.current);

        // ajax
        axios({
            method: "get",
            url: `${baseUrl}/room`,
            withCredentials: true,
        }).then((response) => {
            const {
                blackHolder,
                whiteHolder,
                chessData,
                isBlackTurn,
                winner,
            } = response.data;
            const newChessData = chessData || data;
            this.data = newChessData;
            const chessDropCvs = this.chessDropRef.current;
            this.drawer.drawAllChess(newChessData, chessDropCvs);
            this.setState({
                winner,
            });
            this.blackHolder=blackHolder;
            this.whiteHolder=whiteHolder;

                this.setState(isBlackTurn);
            if (winner) {
                this.feedBackOnWin(winner);
            }
        });

        this.getDataAtIntervals();
    }

    render() {
        const size = this.drawer.size;
        return (
            <div>
                <div
                    className="game-drawer"
                    style={{position: "relative", width: size, height: size}}
                >
                    <div
                        className="feedback"
                        ref={this.feedBRef}
                    >
                        {this.state.feedback}
                    </div>
                    <canvas id="drawer" ref={this.boardRef} width={size} height={size}>
                        您的浏览器版本过低，请升级游览器！
                    </canvas>
                    <canvas
                        id="chess-dropping"
                        ref={this.chessDropRef}
                        width={size}
                        height={size}
                        style={{position: "absolute", top: 0, left: 0, zIndex: 1}}
                    />
                    <canvas
                        id="chess-moving"
                        ref={this.movCvsRef}
                        width={size}
                        height={size}
                        style={{position: "absolute", top: 0, left: 0, zIndex: 2}}
                        onClick={this.handleCvsClick}
                        onMouseMove={this.handleMouseMove}
                    />
                </div>
            </div>
        );
    }
}

export default ChessBoard;
