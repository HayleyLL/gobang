import React from 'react';
import {Button} from 'antd';

const SiderHeader = (props)=>{
    return (
        <div className='sider-header'>
           <div className='operation'>
               <Button className='room-btn'>
                   -
               </Button>
               <Button className='room-btn'>
                   X
               </Button>
           </div>
            <div className='room-info'>
                房间号：{props.roomInfo._id}
            </div>
        </div>
    )
}

export default SiderHeader;