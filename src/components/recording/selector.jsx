import React, {Component} from 'react';
import axios from "axios";
import {withRouter} from "react-router-dom";
import {baseUrl} from "../../end-point/httpRqst";
import * as meta from "../../meta";
import Cookies from "js-cookies/src/cookies";


class Selector extends Component {
    constructor(props) {
        super(props);
        this.playerId = Cookies.getItem("playerId");
    }

    handleSelectClick = ({target}) => {
        // 如果已经游戏中了，不能再选了
        if (this.roomInfo.status !== meta.PREPARING) {
            return
        }

        // 如果这个位置已经被选了，就不能再选这个位置了
        switch (target.id) {
            case 'black-selector':
                if (this.roomInfo.blackHolder) {
                    return
                }
                break
            case 'white-selector':
                if (this.roomInfo.whiteHolder) {
                    return
                }
                break
        }

        // 如果自己已经选了，就不能再选了
        if ([this.roomInfo.blackHolder, this.roomInfo.whiteHolder].filter(c=>c).includes(this.playerId)) {
            return;
        }

        // 选棋
        const roomId = this.props.match.params.roomId;
        const choseBlack = target.id === 'black-selector'
        axios({
            method: 'put',
            url: `${baseUrl}/rooms/${roomId}/select_chess`,
            data: {
                roomId,
                choseBlack
            }
        })
    }

    render() {
        this.roomInfo=this.props.roomInfo;
        return (
            <div className='select-chess'>
                <div className='selector' id='black-selector' onClick={this.handleSelectClick}>
                    <div className='selector-header'>
                        <span id='black'>
                        </span>
                        #1
                    </div>
                    <div className='selector-body'>{this.roomInfo.blackHolder}</div>
                </div>
                <div className='selector' id='white-selector' onClick={this.handleSelectClick}>
                    <div className='selector-header'>
                        <span id='white'></span>
                        #2
                    </div>
                    <div className='selector-body'>{this.roomInfo.whiteHolder}</div>
                </div>
            </div>
        )
    }
}

export default withRouter(Selector);