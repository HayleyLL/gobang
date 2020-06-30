import React, {Component} from 'react';
import ChessBoard from "../chess-board";
import Sider from "../recording/sider";
import './room.scss';
import Cookies from "js-cookies";
import axios from "axios";
import {baseUrl} from "../../end-point/httpRqst";
import  * as meta  from "../../meta";


class Room extends Component {
  constructor(props) {
    super(props);
    // this.dropChessInfo={
    //     playerId:Cookies.getItem("playerId"),
    //     blackHolder:null,
    //     whiteHolder:null
    // }
    this.cells = 18;
    this.data = [...Array(this.cells)].map(()=>Array(this.cells).fill(0));
    this.state = {
      roomInfo: {
        gameStatus: meta.PREPARING,
        chessData: this.data,
        isBlackTurn: null,
        blackHolder: null,
        whiteHolder: null
      }
    }
  };


  componentDidMount() {
    this.getDataAtIntervals()
  }

  getDataAtIntervals() {
    const roomId = this.props.match.params.roomId;

    setInterval(()=>{
      this.getData(roomId);
    }, 2000);
  };

  getData(roomId) {
    axios({
      method: "get",
      url: `${baseUrl}/rooms/${roomId}`,
      withCredentials: true,
    }).then((response)=>{
      this.setState({
        roomInfo: response.data
      });
    })
  }


  render() {
    return (
      <div className='room-view'>
        {/*<ChessBoard meta={{cells: this.cells, cellSize: 30, padding: 20, chessR: 12}}*/}
        {/*  // dropChessInfo={this.dropChessInfo}*/}
        {/*            roomInfo={this.state.roomInfo}/>*/}
        <Sider roomInfo={this.state.roomInfo}/>
      </div>
    )
  }
}

export default Room;