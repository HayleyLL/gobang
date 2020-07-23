import {Button, Input} from "antd";
import React from "react";

const MessageSender = (props) => {
    const {input, handleInput, handleSubmit, handleEnter} = props;

    return (
        <div className='message'>
            <Input value={input} onChange={handleInput} onKeyUp={handleEnter}/>
            <Button onClick={handleSubmit}>发送</Button>
        </div>
    )
}

export default MessageSender;