import {Card} from "antd";
import React, {useEffect} from "react";
import Cookies from "js-cookies/src/cookies";


const ChatContent=(props)=>{

    const playerId = Cookies.getItem("playerId");

    const messagesEndRef = React.createRef()

   const scrollToBottom = () => {
        messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }

    useEffect(scrollToBottom);

    return(
        <Card title='聊天' bordered={false} style={{width: '100%'}}
              bodyStyle={{height: '200px', overflow:'auto'}}>
            {
                props.messages.map(
                    message => (
                        <p key={message._id}
                           className={playerId === message.sender ? 'right-sender' : 'left-sender'}>
                            {message.message}
                        </p>
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