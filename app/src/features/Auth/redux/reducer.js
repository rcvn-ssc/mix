import initialState from "./initialState";
import {
    LOGIN_ACTION,
    SET_TOKEN_ACTION,
    CLEAR_TOKEN_ACTION,
    ARG_TOKEN,
    PENDING_ACTION,
    REGISTER_ACTION,
    CHANGE_PASSWORD_ACTION,
    CHANGE_PASSWORD_ACTION_PENDING,
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
        case CHANGE_PASSWORD_ACTION:
            return {
                ...state,
                changePasswordPending: false,
            }
        case CHANGE_PASSWORD_ACTION_PENDING:
            return {
                ...state,
                changePasswordPending: true,
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
            id       : payload.id,
            username : payload.username,
            full_name: payload.full_name,
            password : payload.password,
            token    : null,
            role     : payload.role,
            message  : null,
        }
    } catch (e) {
        localStorage.removeItem(ARG_TOKEN)
        stateFromLocal = {
            id       : null,
            username : null,
            full_name: null,
            password : null,
            token    : null,
            role     : null,
            message  : null,
        }
    }
    return stateFromLocal;
}