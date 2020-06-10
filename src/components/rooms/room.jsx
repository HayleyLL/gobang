import React, {Component} from 'react';
import {Button} from 'antd';
import ChessBoard from "../chess-board";

class Room extends Component{
    constructor(props) {
        super(props);
        this.state={}
    }

    render(){
        return(
            <div className='room-view'>
                <ChessBoard/>

            </div>
        )
    }
}