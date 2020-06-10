import React, {Component} from 'react';
import {withRouter} from 'react-router-dom'
import axios from 'axios';
import {Button} from 'antd';
import Cookies from "js-cookies";
import {baseUrl} from "../../end-point/httpRqst";


class RoomsHeader extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    handleCreateRoomClick = (e) => {
        e.preventDefault();
        e.stopPropagation();

        axios(
            {
                method: 'put',
                url: `${baseUrl}/put_room`,
                withCredentials: true
            }).then((resp) => {
            // this.playerId = Cookies.getItem('playerId');
            const {roomId}=resp.data.roomInfo;
            this.props.history.push(`/${roomId}`)
        }).catch((er) => {
            console.error(er)
        })
    }

    render() {
        return (
            <div className='rooms-header'>
                <Button onClick={this.handleCreateRoomClick}>
                    创建新房间
                </Button>
            </div>
        );
    }
}

export default withRouter(RoomsHeader);