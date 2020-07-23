import React, {Component} from 'react';
import {withRouter} from "react-router-dom";
import axios from 'axios';
import {baseUrl} from '../../end-point/httpRqst'
import ChatContent from "./chat-content";
import MessageSender from "./message-sender";

class Chat extends Component {
    constructor(props) {
        super(props);
        this.state = {
            input: '',
            messages: []
        };
    }

    handleInput = ({target}) => {
        this.setState({input: target.value});
    }

    getMessages = () => {
        const roomId = this.props.match.params.roomId;
        const {messages} = this.state;
        const lastMessage = messages[messages.length - 1];
        const lastTime = lastMessage ? lastMessage.createdAt : undefined;
        axios({
            method: 'get',
            url: `${baseUrl}/rooms/${roomId}/messages`,
            params: {lastTime},
            timeout: 60000
        }).then(
            resp => {
                this.getMessages();
                const result = resp.data;
                this.setState({
                    messages: [
                        ...messages,
                        ...result
                    ]
                })
            }
        ).catch(error => {
            if (error.code === 'ECONNABORTED') {
                console.info(`A timeout happend on url ${error.config.url}`);
            } else {
                console.error(error)
            }
            this.getMessages();
        })
    }

    submit = () => {
        const {input} = this.state;
        const roomId = this.props.match.params.roomId;
        if (input) {
            axios(
                {
                    url: `${baseUrl}/message`,
                    method: 'post',
                    withCredentials: true,
                    data: {
                        message: input,
                        roomId,
                    },
                }
            ).catch(error => {
                console.error(error)
            })
        }
        this.setState({input: ''})
    }

    handleSubmit = () => {
        this.submit();
    }

    handleEnter = (e) => {
        if (e.keyCode === 13) {
            this.submit();
        }
    }


    componentDidMount() {
        this.getMessages();
    }


    render() {
        return (
            <div className='chat-area'>
                <ChatContent messages={this.state.messages}/>
                <MessageSender handleInput={this.handleInput} handleSubmit={this.handleSubmit}
                               handleEnter={this.handleEnter} input={this.state.input}/>
            </div>
        )
    }
}

export default withRouter(Chat);