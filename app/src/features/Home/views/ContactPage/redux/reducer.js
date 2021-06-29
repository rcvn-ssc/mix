import initialState from "./initialState";
import {EXAMPLE}    from "./constants";

export function reducer(state = initialState, action) {
    let payload = action.payload;
    switch (action.type) {
        case EXAMPLE:
            return {
                ...state,
                example: payload.data
            };

        default:
            return state;
    }
}