import React, {Component} from 'react';
import ChessBoard from "../chess-board";
import Sider from "../recording/sider";
import './room.scss';
import Cookies from "js-cookies";


class Room extends Component{
    constructor(props) {
        super(props);
        this.dropChessInfo={
            playerId:Cookies.getItem("playerId"),
            blackHolder:null,
            whiteHolder:null
        }
        this.data = [...Array(cells + 1)].map(() => Array(cells + 1).fill(0));
        this.state = {
            winner: null,
            isBlackTurn:true,
            count:0
        }
    }

    render(){
        return(
            <div className='room-view'>
                <ChessBoard cells={18} cellSize={30} padding={20} chessR={12} dropChessInfo={this.dropChessInfo} chessData={this.data}/>
                <Sider/>
            </div>
        )
    }
}
export default Room;