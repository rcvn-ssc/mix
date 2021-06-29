import initialState from "./initialState";
import {FETCH_USERS, FETCH_USERS_PENDING} from "./constants";

export function reducer(state = initialState, action) {
    let payload = action.payload;
    switch (action.type) {
        case FETCH_USERS:
            return {
                ...state,
                fetchUsersPending: false,
                users: payload,
            };
        case FETCH_USERS_PENDING: {
            return {
                ...state,
                fetchUsersPending: true
            };
        }
        default:
            return state;
    }
}