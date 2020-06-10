import React, {Component} from 'react';
import {Link} from 'react-router-dom'
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
        e.stopPropagation();

        axios(
            {
                method: 'put',
                url: `${baseUrl}/put_room`,
                withCredentials: true
            })
    }

    render() {
        return (
            <div className='rooms-header'>
                <Button onClick={this.handleCreateRoomClick}>
                    <Link to='/pl'>创建新房间 </Link>
                </Button>
            </div>
        );
    }
}

export default RoomsHeader;