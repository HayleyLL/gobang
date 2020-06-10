import React, {Component} from 'react';
import axios from 'axios';
import RoomsHeader from "./rooms-header";
import './rooms.scss';
import RoomsBody from "./rooms-body";
import {baseUrl} from "../../end-point/httpRqst";

class Rooms extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        axios(
            {
                method: 'get',
                url: `${baseUrl}/rooms`,
                withCredentials: true
            }
        ).then((resp) => {
            console.log(resp);
        }).catch((er) => {
            console.log(er);
        })
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