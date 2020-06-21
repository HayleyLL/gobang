import React from "react";
import {Route, Switch} from 'react-router-dom';
import Rooms from "./components/rooms/rooms";
import 'antd/dist/antd.css'
import "./App.css";
import Room from "./components/rooms/room";

function App() {
    return (
        <div className="App">
            <Switch>
                <Route exact path='/rooms/:roomId'
                       component={Room}
                />
                <Route exact path='/' component={Rooms}/>
            </Switch>
        </div>
    );
}

export default App;
