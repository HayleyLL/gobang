import {FETCH_ROOM} from "../actions";

function room(state={}, action){
    switch (action.type) {
        case FETCH_ROOM:
            return action.payload;
        default:
            return state
    }
}

export default room;