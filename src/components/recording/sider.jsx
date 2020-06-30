import React, {Component} from 'react';
import Selector from "./selector";
import SiderHeader from "./sider-header";
import Chat from "./chat";
import * as meta from "../../meta";

class Sider extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {roomInfo} = this.props;
    return (
      <div className='sider'>
        <SiderHeader/>
        <Selector roomInfo={roomInfo}/>
        <Chat/>
      </div>
    )
  }
}

export default Sider;