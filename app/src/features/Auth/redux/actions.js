import {
    SET_TOKEN_ACTION,
    CLEAR_TOKEN_ACTION,
    ARG_TOKEN,
} from "./constants";
import {
    post,
    CODE_SUCCESS
} from "../../../common/crud";

const env = require('../../../config/env')

export function login(data) {
    const url = env.API_URL + 'auth/get-token'
    return dispatch => {
        return post(dispatch, url, data, {}, setTokenAction)
    }
}

export function setTokenAction(dispatch, data) {
    if (data.code === CODE_SUCCESS) {
        localStorage.setItem(ARG_TOKEN, JSON.stringify(data.data))
    }
    return {
        type: SET_TOKEN_ACTION,
        payload: null
    };
}

export function clearToken() {
    localStorage.removeItem(ARG_TOKEN)
    return dispatch => {
        dispatch(clearTokenAction())
    };
}

export function clearTokenAction() {
    return {
        type: CLEAR_TOKEN_ACTION,
        payload: null
    };
}

export function register(data) {
    const url = env.API_URL + 'users/insert'
    return dispatch => {
        return post(dispatch, url, data, {})
    }
}
