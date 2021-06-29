import initialState from "./initialState";
import {
    FETCH_USER_GENERAL_ACTION,
    FETCH_USER_TRANSACTIONS_ACTION,
    FETCH_USER_ORDERS_ACTION,
    PENDING_FETCH_USER_GENERAL_ACTION,
    PENDING_FETCH_USER_TRANSACTIONS_ACTION,
    PENDING_FETCH_USER_ORDERS_ACTION,
} from "./constants";

export function reducer(state = initialState, action) {
    let payload = action.payload;
    switch (action.type) {
        case FETCH_USER_GENERAL_ACTION:
            return {
                ...state,
                user: payload,
                pendingFetchGeneral: false
            };
        case FETCH_USER_TRANSACTIONS_ACTION:
            return {
                ...state,
                transactions: payload,
                pendingFetchTransactions: false
            };
        case FETCH_USER_ORDERS_ACTION:
            return {
                ...state,
                orders: payload,
                pendingFetchOrders: false
            };
        case PENDING_FETCH_USER_GENERAL_ACTION:
            return {
                ...state,
                pendingFetchGeneral: true
            };
        case PENDING_FETCH_USER_TRANSACTIONS_ACTION:
            return {
                ...state,
                pendingFetchTransactions: true
            };
        case PENDING_FETCH_USER_ORDERS_ACTION:
            return {
                ...state,
                pendingFetchOrders: true
            };


        default:
            return state
    }
}