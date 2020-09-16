import {FETCH_MESSAGE} from "../actions";

function messages(state=[], action){
    switch (action.type) {
        case FETCH_MESSAGE:
            return action.payload;
        default:
            return state;
    }
}

export default messages;