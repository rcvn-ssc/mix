import initialState from "./initialState";
import {
    LOGIN_ACTION,
    SET_TOKEN_ACTION,
    CLEAR_TOKEN_ACTION,
    ARG_TOKEN, PENDING_ACTION, REGISTER_ACTION
} from "./constants";

export function reducer(state = initialState, action) {
    const defaultState = loadStateFromLocal();
    switch (action.type) {
        case PENDING_ACTION: {
            return {
                ...state,
                pending: true
            }
        }
        case LOGIN_ACTION:
            return {
                ...state,
                pending: false,
                message: action.payload
            }
        case REGISTER_ACTION:
            return {
                ...state,
                pending: false,
                message: action.payload
            }
        case SET_TOKEN_ACTION:
        case CLEAR_TOKEN_ACTION:
        default:
            return {
                ...state,
                ...defaultState
            };
    }
}

function loadStateFromLocal() {
    let stateFromLocal;
    try {
        let payload    = JSON.parse(localStorage.getItem(ARG_TOKEN));
        stateFromLocal = {
            id: payload.id,
            username: payload.username,
            full_name: payload.full_name,
            token: null,
            role: payload.role,
            message: null,
        }
    } catch (e) {
        localStorage.removeItem(ARG_TOKEN)
        stateFromLocal = {
            id: null,
            username: null,
            full_name: null,
            token: null,
            role: null,
            message: null,
        }
    }
    return stateFromLocal;
}