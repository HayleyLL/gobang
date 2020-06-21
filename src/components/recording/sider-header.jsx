import React from 'react';
import {Button} from 'antd';

const SiderHeader = ()=>{
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
                房间号：
            </div>
        </div>
    )
}

export default SiderHeader;