import React, {Component} from 'react';

class RoomsBody extends Component {
    constructor(props) {
        super(props);
        this.state = {
            rooms_data: [
                {
                    id: '#1',
                    players: ['a', 'b']
                },
                {
                    id: '#2',
                    players: ['c', 'd']
                },
                {
                    id: '#3',
                    players: ['e', 'f']
                },
                {
                    id: '#4',
                    players: ['a', 'b']
                },
                {
                    id: '#5',
                    players: ['a', 'b']
                },
                {
                    id: '#6',
                    players: ['a', 'b']
                },
                {
                    id: '#7',
                    players: ['a', 'b']
                },
                {
                    id: '#8',
                    players: ['a', 'b']
                },
                {
                    id: '#9',
                    players: ['a', 'b']
                },
                {
                    id: '#10',
                    players: ['a', 'b']
                },
                {
                    id: '#11',
                    players: ['a', 'b']
                },

            ]
        }
    }

    render() {
        const {rooms_data} = this.state;
        return (
            <div className='rooms-body'>
                <div className='rooms-body-header rooms-row'>
                    <div className='room-cell room-id'>房间ID</div>
                    <div className=' room-cell'>玩家</div>
                </div>
                {rooms_data.map(room =>
                    <div className='rooms-row' key={room.id}>
                        <div className='room-cell room-id'>
                            {room.id}
                        </div>
                        <div className='room-cell'>
                            <div className='room-player'>
                                {room.players[0]}
                            </div>
                            <div className='room-player'>
                                {room.players[1]}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        )
    }
}

export default RoomsBody;