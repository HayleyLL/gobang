import React, {Component} from 'react';
import axios from 'axios';
import RoomsHeader from "./rooms-header";
import './rooms.scss';
import RoomsBody from "./rooms-body";

class Rooms extends Component {
    constructor(props) {
        super(props);
        this.state = {}
        ;
    }


    render() {
        return (
            <div className='rooms'>
                <RoomsHeader/>
                <RoomsBody/>
            </div>
        );
    }
}

export default Rooms;