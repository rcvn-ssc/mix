import initialState from "./initialState";
import {
    ORDER_LUNCH_FETCH_USERS_ACTION,
    ORDER_LUNCH_FETCH_USERS_PENDING_ACTION,
    ORDER_LUNCH_INSERT_MULTI_ACTION,
    ORDER_LUNCH_INSERT_MULTI_PENDING_ACTION, ORDER_LUNCH_RESET_MESSAGE_ACTION,
} from "./constants";

export function reducer(state = initialState, action) {
    let payload = action.payload;
    switch (action.type) {
        case ORDER_LUNCH_FETCH_USERS_ACTION:
            return {
                ...state,
                pendingFetch: false,
                users: payload,
            };
        case ORDER_LUNCH_FETCH_USERS_PENDING_ACTION: {
            return {
                ...state,
                pendingFetch: true
            };
        }
        case ORDER_LUNCH_INSERT_MULTI_ACTION:
            return {
                ...state,
                pendingOrderMulti: false,
                message: payload,
            };
        case ORDER_LUNCH_INSERT_MULTI_PENDING_ACTION: {
            return {
                ...state,
                pendingOrderMulti: true,
                message: '',
            };
        }
        case ORDER_LUNCH_RESET_MESSAGE_ACTION: {
            return {
                ...state,
                message: '',
            };
        }
        default:
            return state;
    }
}