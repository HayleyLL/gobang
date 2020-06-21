import React, {Component} from 'react';
import {Button, Card, Input} from 'antd';

class Chat extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div className='chat-area'>
                <Card title='聊天' bordered={false} style={{width: '100%'}} bodyStyle={{minHeight:'200px', overflow:'auto'}}>
                </Card>
                <div className='message'>
                    <Input/>
                    <Button>发送</Button>
                </div>
            </div>
        )
    }
}

export default Chat;