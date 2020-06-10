import React from "react";
import {Route, Switch} from 'react-router-dom';
import Rooms from "./components/rooms/rooms";
import 'antd/dist/antd.css'
import "./App.css";
import ChessBoard from "./components/chess-board";

function App() {
    return (
        <div className="App">
            <Switch>
            <Route path='/pl'
                   render={(props) => <ChessBoard cells={18} cellSize={30} padding={20} chessR={12} {...props}/>}
            />
            <Route exact path='/' component={Rooms}/>
            </Switch>
        </div>
    );
}

export default App;
