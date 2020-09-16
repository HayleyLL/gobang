import * as actions from "./index";

export function fetch_room(roomInfo){
    return{
        type:actions.FETCH_ROOM,
        payload: roomInfo
    }
}

export function fetch_rooms(rooms){
    return{
        type:actions.FETCH_ROOMS,
        payload: rooms
    }
}

export function put_chess(chessData){
    return {
        type:actions.FETCH_CHESS,
        payload:chessData
    }
}

export function fetch_message(messages){
    return{
        type:actions.FETCH_MESSAGE,
        payload: messages
    }
}
