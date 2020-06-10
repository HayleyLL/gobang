import React, {Component} from 'react';
import axios from "axios";
import {Button} from 'antd'
import {baseUrl} from "../../end-point/httpRqst";

class RoomsBody extends Component {
    constructor(props) {
        super(props);
        this.state = {
            rooms: [],
        }
    }

    handleEnterRoomClick = (roomId) => {
        axios(
            {
                method: 'get',
                url: `${baseUrl}/rooms/${roomId}`,
                withCredentials: true
            }
        ).then(
            (resp) => {
                console.log(resp.data);
                this.props.history.push(`/${roomId}`)
            }
        ).catch(
            (er) => {
                console.error(er);
            }
        )
    }

    componentDidMount() {
        axios(
            {
                method: 'get',
                url: `${baseUrl}/rooms`,
                withCredentials: true
            }
        ).then((resp) => {
            this.setState({rooms: resp.data})
        }).catch((er) => {
            console.log(er);
        })
    }

    render() {
        const {rooms} = this.state;

        return (
            <div className='rooms-body'>
                <div className='rooms-body-header rooms-row'>
                    <div className='room-cell room-id'>房间ID</div>
                    <div className=' room-cell'>玩家</div>
                </div>
                {rooms.map(room =>
                    <div className='rooms-row' key={room._id} id={room.roomId}>
                        <div className='room-cell room-id'>
                            {`##${room.roomId}`}
                        </div>
                        <div className='room-cell'>
                            <div className='room-player'>
                                {room.blackHolder || room.whiteHolder || '--'}
                            </div>
                            <div className='room-player'>
                                {'--'}
                            </div>
                        </div>
                        <div className='rooms-cell'>
                            <Button onClick={() => this.handleEnterRoomClick(room.roomId)}>进入房间</Button>
                        </div>
                    </div>
                )}
            </div>
        )
    }
}

export default RoomsBody;