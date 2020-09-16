import React, {Component} from 'react';
import RoomsHeader from "./rooms-header";
import './index.scss';
import RoomsBody from "./rooms-body";

class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {};
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

export default Index;