import room from "./room";
import rooms from "./rooms";
import chess from "./chess";
import messages from "./messages";
import { combineReducers } from 'redux'

export default combineReducers({ rooms, room, messages, chess})
