import React, {Component} from 'react';
import {Button} from 'antd';

class Slector extends Component{
    constructor(props) {
        super(props);
        this.state={};
    }

    render() {
        return(
            <div className='select'>
                <Button id='black'>黑棋</Button>
                <Button id='white'>白棋</Button>
            </div>
        )
    }
}