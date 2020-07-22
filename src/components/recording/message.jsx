import React from "react";
import Cookies from "js-cookies/src/cookies";
import {Avatar} from 'antd';

const Message = (props) => {

    const playerId = Cookies.getItem("playerId");
    const {message} = props;
    const isSender = playerId === message.sender;
    let messageClass, avatarSrc;
    if (isSender) {
        messageClass = 'right-sender';
        avatarSrc = require('../../assets/avatar1.jpg');
    } else {
        messageClass = 'left-sender';
        avatarSrc = require('../../assets/avatar2.jpg')
    }
    const messageStyle = {
        marginBottom: 10,
        float:isSender?'right':'left',
        clear: 'both',
        display: 'flex',
        flexDirection: isSender ? 'row-reverse' : 'row'
    }
    const textStyle = {
        backgroundColor: '#9dd3e9',
        padding: '5px 12px 5px 12px',
        borderRadius: '6px',
        wordBreak: 'break-all',
        minHeight: '2.3em',
        maxWidth: 250
    }
    const messageContentStyle = {
        margin: '-5px 5px 0',
        display: 'flex',
        flexDirection: 'column'
    }

    return (
        <div className={messageClass} style={messageStyle}>
            <Avatar src={avatarSrc}/>
            <div style={messageContentStyle}>
                <span style={{alignSelf: isSender ? 'flex-end' : 'flex-start'}}>{message.sender}</span>
                <p style={textStyle}>
                    {message.message}
                </p>
            </div>
        </div>
    )
}

export default Message;