import React from 'react';
import {Button} from 'antd';
import {LineOutlined,CloseOutlined } from '@ant-design/icons';
import * as meta from '../../meta';

const SiderHeader = (props)=>{
    const {roomInfo}=props;
    let status=meta.PREPARING;
    if(roomInfo.status===meta.PREPARING){
        status='游戏准备中'
    }else if(roomInfo.status===meta.PLAYING){
        status='游戏进行中'
    }else{
        status='游戏已结束'
    }

    return (
        <div className='sider-header'>
           <div className='operation'>
               <div className='room-status'>
                   {status}
               </div>
               <Button className='room-btn'>
                   <LineOutlined />
               </Button>
               <Button className='room-btn'>
                   <CloseOutlined />
               </Button>
           </div>
            <div className='room-info'>
                房间号：{props.roomInfo._id}
            </div>
        </div>
    )
}

export default SiderHeader;