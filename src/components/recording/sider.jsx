import React, {Component} from 'react';
import Selector from "./selector";
import SiderHeader from "./sider-header";
import Chat from "./chat";

class Sider extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div className='sider'>
                <SiderHeader/>
                <Selector/>
                <Chat/>
            </div>
        )
    }
}

export default Sider;