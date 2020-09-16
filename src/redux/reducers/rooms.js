import {FETCH_ROOMS} from "../actions";

function rooms(state=[], action){
    switch (action.type) {
        case FETCH_ROOMS:
            return action.payload;
        default:
            return state;
    }
}

export default rooms;
