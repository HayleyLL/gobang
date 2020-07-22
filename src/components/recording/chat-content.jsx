import {Card} from "antd";
import React, {useEffect} from "react";
import Message from "./message";

const ChatContent=(props)=>{

    const messagesEndRef = React.createRef()

   const scrollToBottom = () => {
        messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }

    useEffect(scrollToBottom);

    return(
        <Card title='聊天' bordered={false} style={{width: '100%'}}
              bodyStyle={{height: '240px', overflow:'auto'}}>
            {
                props.messages.map(
                    message => (
                        <Message key={message._id} message={message}/>
                    )
                )
            }
            <div style={{ clear: "both" }}
                 ref={messagesEndRef}>
            </div>
        </Card>
    )
}

export default ChatContent;