import React, {Component} from 'react';
import ChessBoard from "../chess-board";
import Sider from "../recording/sider";
import './room.scss';
import axios from "axios";
import {baseUrl} from "../../end-point/httpRqst";
import * as meta from "../../meta";
import {checkWinner} from "../../utils/judge";
import Drawer from "../../utils/draw";
import {PLAYING} from "../../meta";
import Cookies from "js-cookies/src/cookies";

class Room extends Component {
    _isMounted = false;

    constructor(props) {
        super(props);
        this.playerId = Cookies.getItem("playerId");
        this.boardInfo = {
            cells: 18,
            padding: 20,
            cellSize: 30,
            chessR: 12,
        }
        this.cells = 18;
        this.drawer = new Drawer(this.boardInfo);
        this.data = [...Array(this.cells)].map(() => Array(this.cells).fill(0));
        this.count=0;
        this.state = {
            roomInfo: {
                _id: null,
                status: meta.PREPARING,
                chessData: this.data,
                isBlackTurn: true,
                blackHolder: null,
                whiteHolder: null,
                winner: null,
            }
        }
    };

    isMoveEligible = () => {
        //isBlckTurn并没有在更新本地数据后立即变化
        const {winner, isBlackTurn, blackHolder, whiteHolder} = this.state.roomInfo;
        if (this.state.roomInfo.status !== PLAYING) {
            return false;
        }

        if (winner !== null) {
            return false;
        }

        if (isBlackTurn) {
            return this.playerId === blackHolder
        } else {
            return this.playerId === whiteHolder
        }
    };

    isClickEligible = (data, row, column) => {
        if (data[row][column] !== 0) {
            return false;
        }
        return this.isMoveEligible();
    }

    drawClickedChess = (chessPos, chessDropRef) => {
        const chessDropCtx = chessDropRef.getContext("2d");
        const role = this.playerId === this.state.roomInfo.blackHolder ? "black" : "white";

        this.drawer.drawChess(chessDropCtx, chessPos, role);
    };

    updateLocalData = (chessPos) => {
        const {xNum: column, yNum: row} = chessPos;
        let {chessData, isBlackTurn} = this.state.roomInfo;
        const data = [...chessData];
        data[row][column] = isBlackTurn ? 1 : 2;
        this.count += 1;
        this.setState({
            isBlackTurn: !isBlackTurn,
            chessData: data
        })
        return data;
    };

    handleCvsClick = (e, movCvs, chessDropRef) => {
        //e.target就是movCvs？
        let {chessData, winner, isBlackTurn} = this.state.roomInfo;
        const chessPos = this.drawer.calcChessCoords(movCvs, e);
        const {xNum: column, yNum: row} = chessPos;
        const isClickEligible = this.isClickEligible(chessData, row, column);

        if (!isClickEligible) {
            return;
        }
        this.drawer.clearChess(movCvs);
        this.drawClickedChess(chessPos, chessDropRef);
        const data = this.updateLocalData(chessPos);
        if (checkWinner(row, column, chessData)) {
            winner = isBlackTurn ? "黑棋" : "白棋";
        }
        axios({
            method: "put",
            url: `${baseUrl}/rooms/${this.state.roomInfo._id}/put_chess`,
            withCredentials: true,
            data: {
                chessData: data,
                winner,
            },
        }).catch((error) => {
            console.error(error.response.data);
        });
    };

    getDataAtIntervals() {
        const roomId = this.props.match.params.roomId;
        this.getData(roomId);

        this.intervalID = setInterval(() => {
            if (!this.state.roomInfo.winner) {
                this.getData(roomId);
            }
        }, 2000);

    };

    getData(roomId) {
        axios({
            method: "get",
            url: `${baseUrl}/rooms/${roomId}`,
            withCredentials: true,
        }).then((response) => {
            const {chessData, count} = response.data;
            const newChessData = chessData || this.data;
            //在卸载组件后就不能更新组件了,否则报错
            if (this._isMounted && count >= this.count) {
                this.count=count;
                this.setState({
                    roomInfo: {...response.data, chessData: newChessData}
                });
            }
        })
    }


    componentDidMount() {
        this._isMounted = true;
        this.getDataAtIntervals()
    }

    componentWillUnmount() {
        this._isMounted = false;
        //取消定时器
        clearInterval(this.intervalID);
    }

    bg=require('../../assets/bg5.jpeg')

    boardStyle={
        backgroundColor:'#9dd3e9',
        backgroundImage:`url(${this.bg})`,
        backgroundRepeat:'no-repeat',
        backgroundSize: 'cover'
}

    render() {
        return (
            <div className='room-view'>
                <ChessBoard meta={this.boardInfo}
                            dropChessInfo={this.dropChessInfo}
                            roomInfo={this.state.roomInfo}
                            handleCvsClick={this.handleCvsClick}
                            isMoveEligible={this.isMoveEligible}
                            style={this.boardStyle}
                />
                <Sider roomInfo={this.state.roomInfo}/>
            </div>
        )
    }
}

export default Room;