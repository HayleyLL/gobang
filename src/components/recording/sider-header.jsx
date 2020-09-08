import React from 'react';
import {useHistory, useLocation} from 'react-router-dom';
import {Button} from 'antd';
import {LineOutlined, CloseOutlined} from '@ant-design/icons';
import * as meta from '../../meta';
import {baseUrl} from '../../end-point/httpRqst'
import axios from 'axios'
import Cookies from "js-cookies/src/cookies";

const playerId = Cookies.getItem("playerId");

const SiderHeader = (props) => {
    const {roomInfo} = props;
    let status = meta.PREPARING;
    if (roomInfo.status === meta.PREPARING) {
        status = '游戏准备中'
    } else if (roomInfo.status === meta.PLAYING) {
        status = '游戏进行中'
    } else {
        status = '游戏已结束'
    }

    const history = useHistory();
    const location = useLocation();
    const roomId = location.pathname;

    const handleReturn = () => {
        history.push('/');
    }

    const handleExit = () => {
        if (playerId !== roomInfo.blackHolder && playerId !== roomInfo.whiteHolder) {
            handleReturn();
        } else {
            axios({
                url: `${baseUrl}${roomId}/exit`,
                method: 'post'
            }).then(() => {
                handleReturn()
            }).catch(er => console.error(er))
        }
    }

    return (
        <div className='sider-header'>
            <div className='operation'>
                <div className='room-status'>
                    {status}
                </div>
                <Button className='room-btn' onClick={handleReturn}>
                    <LineOutlined/>
                </Button>
                <Button className='room-btn' onClick={handleExit}>
                    <CloseOutlined/>
                </Button>
            </div>
            <div className='room-info'>
                房间号：{props.roomInfo._id}
            </div>
        </div>
    )
}

export default SiderHeader;