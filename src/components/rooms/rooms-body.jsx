import React, {Component} from 'react';
import axios from "axios";
import {Button} from 'antd'
import {baseUrl} from "../../end-point/httpRqst";
import {withRouter} from "react-router-dom";
import {fetch_rooms} from '../../redux/actions/actionCreators'
import {connect} from "react-redux";

class RoomsBody extends Component {

    handleEnterRoomClick = (roomId) => {
        this.props.history.push(`/rooms/${roomId}`)
    }

    componentDidMount() {
        axios(
            {
                method: 'get',
                url: `${baseUrl}/rooms`,
                withCredentials: true
            }
        ).then((resp) => {
            this.props.dispatchRooms(resp.data)
        }).catch((er) => {
            console.error(er);
        })
    }

    render() {
        const {rooms} = this.props;

        return (
            <div className='rooms-body'>
                <div className='rooms-body-header rooms-row'>
                    <div className='room-cell room-id'>房间ID</div>
                    <div className=' room-cell'>玩家</div>
                </div>
                {rooms.map(room =>
                    <div className='rooms-row' key={room._id} id={room._id}>
                        <div className='room-cell room-id'>
                            {`${room._id}`}
                        </div>
                        <div className='room-cell'>
                            <div className='room-player'>
                                {room.blackHolder || '--'}
                            </div>
                            <div className='room-player'>
                                {room.whiteHolder || '--'}
                            </div>
                        </div>
                        <div className='rooms-cell'>
                            <Button onClick={() => this.handleEnterRoomClick(room._id)}>进入房间</Button>
                        </div>
                    </div>
                )}
            </div>
        )
    }
}


const mapStateToProps = (state) => {
    return {
        rooms: state.rooms
    }
}

const mapDispatchToProps = dispatch => {
    return {
        //向action creator中传入参数，调用fetchRooms时就传入相应数据
        dispatchRooms: rooms => dispatch(fetch_rooms(rooms))
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(RoomsBody));