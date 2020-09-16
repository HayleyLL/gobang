import {FETCH_CHESS} from "../actions";

function chessReducer(state=[],action) {
    switch (action.type) {
        case FETCH_CHESS:
            return action.payload;
        default:
            return state;
    }
}

export default chessReducer;