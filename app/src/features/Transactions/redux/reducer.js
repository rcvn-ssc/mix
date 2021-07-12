import initialState from "./initialState";
import {
    TRANS_INSERT_ACTION,
    TRANS_INSERT_ACTION_PENDING,
} from "./constants";

export function reducer(state = initialState, action) {
    let payload = action.payload;
    switch (action.type) {
        case TRANS_INSERT_ACTION:
            return {
                ...state,
                pendingTransactionCreate: false,
                message                 : payload,
            };
        case TRANS_INSERT_ACTION_PENDING: {
            return {
                ...state,
                pendingTransactionCreate: false,
                message                 : '',
            };
        }
        default:
            return state;
    }
}