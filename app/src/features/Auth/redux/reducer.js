import initialState from "./initialState";
import {
    SET_TOKEN_ACTION,
    CLEAR_TOKEN_ACTION,
    ARG_TOKEN
} from "./constants";

export function reducer(state = initialState, action) {
    const defaultState = loadStateFromLocal();
    switch (action.type) {
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
            token: payload.token,
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