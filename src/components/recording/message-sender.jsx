import {Button, Input} from "antd";
import React from "react";

const MessageSender=(props)=>{
    const {input,handleInput,handleSubmit}=props;

    return(
        <div className='message'>
            <Input value={input} onChange={handleInput}/>
            <Button onClick={handleSubmit}>发送</Button>
        </div>
    )
}

export default MessageSender;