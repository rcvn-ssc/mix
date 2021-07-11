import initialState from "./initialState";
import {
    FETCH_USER_GENERAL_ACTION,
    FETCH_USER_TRANSACTIONS_ACTION,
    FETCH_USER_ORDERS_ACTION,
    PENDING_FETCH_USER_GENERAL_ACTION,
    PENDING_FETCH_USER_TRANSACTIONS_ACTION,
    PENDING_FETCH_USER_ORDERS_ACTION,
    PENDING_FETCH_USERS_ACTION,
    FETCH_USERS_ACTION,
} from "./constants";
import {LOCATION_CHANGE} from "connected-react-router";

export function reducer(state = initialState, action) {
    let payload = action.payload;
    switch (action.type) {
        case LOCATION_CHANGE:
            return {
                ...state,
                ...initialState
            }
        case FETCH_USERS_ACTION:
            return {
                ...state,
                pendingFetchUsers: false,
                users            : payload
            };
        case FETCH_USER_GENERAL_ACTION:
            return {
                ...state,
                user               : payload,
                pendingFetchGeneral: false
            };
        case FETCH_USER_TRANSACTIONS_ACTION:
            return {
                ...state,
                transactions            : payload,
                pendingFetchTransactions: false
            };
        case FETCH_USER_ORDERS_ACTION:
            return {
                ...state,
                orders            : payload,
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
        case PENDING_FETCH_USERS_ACTION:
            return {
                ...state,
                pendingFetchUsers: true,
            };

        default:
            return state
    }
}