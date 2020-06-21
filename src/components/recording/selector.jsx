import React, {Component} from 'react';
import axios from "axios";
import {withRouter} from "react-router-dom";
import {baseUrl} from "../../end-point/httpRqst";

class Selector extends Component {
    constructor(props) {
        super(props);
        this.playerId = '';
        this.state = {};
    }

    handleSelectClick = ({target}) => {
        const {playerId} = this;
        if (playerId === blackHolder || playerId === whiteHolder) {
            return;
        }
        const roomId = this.props.match.params.roomId;
        const id = target.id;
        const sendSelection=()=>{
            axios({
                method: 'put',
                url: `${baseUrl}/room/select_chess`,
                data: {
                    roomId,
                    choseBlack
                }
            }).then(
                (resp)=>{
                    if (choseBlack) {
                        this.setState({blackHolder: playerId})
                    }else{this.setState({whiteHolder:playerId})}
                }
            )

        }
        let choseBlack;
        if (id === 'black-selector'&&!blackHolder) {
            choseBlack = true;
            sendSelection()
        } else if (id === 'white-selector'&&!whiteHolder) {
            choseBlack = false;
            sendSelection()
        }


    }

    render() {
        return (
            <div className='select-chess'>
                <div className='selector' id='black-selector' onClick={this.handleSelectClick}>
                    <div className='selector-header'>
                        <span id='black'></span>
                        #1
                    </div>
                    <div className='selector-body'>jdjdjjd</div>
                </div>
                <div className='selector' id='white-selector' onClick={this.handleSelectClick}>
                    <div className='selector-header'>
                        <span id='white'></span>
                        #2
                    </div>
                    <div className='selector-body'>ldmlemdl</div>
                </div>
            </div>
        )
    }
}

export default withRouter(Selector);