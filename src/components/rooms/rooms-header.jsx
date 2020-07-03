import React, {Component} from 'react';
import {withRouter} from 'react-router-dom'
import axios from 'axios';
import {Button} from 'antd';
import {baseUrl} from "../../end-point/httpRqst";


class RoomsHeader extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    handleCreateRoomClick = (e) => {
        e.preventDefault();

        axios(
            {
                method: 'post',
                url: `${baseUrl}/create_room`,
                withCredentials: true
            }).then((resp) => {
            this.props.history.push(`/rooms/${resp.data._id}`)
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