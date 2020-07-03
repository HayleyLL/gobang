import React, {Component} from 'react';
import Selector from "./selector";
import SiderHeader from "./sider-header";
import Chat from "./chat";

class Sider extends Component {

  render() {
    const {roomInfo} = this.props;
    return (
      <div className='sider'>
        <SiderHeader roomInfo={roomInfo}/>
        <Selector roomInfo={roomInfo}/>
        <Chat/>
      </div>
    )
  }
}

export default Sider;