import {
    LOGIN_ACTION,
    SET_TOKEN_ACTION,
    CLEAR_TOKEN_ACTION,
    ARG_TOKEN,
    PENDING_ACTION, REGISTER_ACTION,
} from "./constants";
import {default as db, findByField, insert} from "../../../database/firestore";
import moment from "moment";

const password_hash = require('password-hash');
const ref           = db.collection('mst_user')

export function login(params) {
    const username = params.username;
    const password = params.password;
    let message    = '';
    if (username === undefined || username === null || username === '') {
        message = 'Username is required.'
    } else if (password === undefined || password === null || password === '') {
        message = 'Password is required.'
    }

    return async dispatch => {
        dispatch(pendingAction())
        if (message === '') {
            const res  = await findByField(ref.where('username', '==', username))
            const data = res.data;
            if (data === null) {
                message = 'Not found ' + username + '.';
            } else if (password_hash.verify(password, data.password) === false) {
                message = 'Password incorrect.'
            } else {
                dispatch(setTokenAction(data))
            }
        }

        dispatch(loginAction(message))
    }
}

export function pendingAction() {
    return {
        type: PENDING_ACTION,
        payload: null
    };
}

export function loginAction(message) {
    return {
        type: LOGIN_ACTION,
        payload: message
    };
}

export function setTokenAction(data) {
    localStorage.setItem(ARG_TOKEN, JSON.stringify(data))
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

export function register(params) {
    const username  = params.username;
    const full_name = params.full_name;
    const password  = params.password;
    let message     = '';
    if (username === undefined || username === null || username === '') {
        message = 'Username is required.'
    } else if (full_name === undefined || full_name === null || full_name === '') {
        message = 'Full name is required.'
    } else if (password === undefined || password === null || password === '') {
        message = 'Password is required.'
    }

    return async dispatch => {
        dispatch(pendingAction())
        if (message === '') {
            const res  = await findByField(ref.where('username', '==', username))
            const data = res.data;
            if (data !== null) {
                message = username + ' already exist.';
            } else {
                const res_insert = await insert(ref, {
                    username: params.username,
                    full_name: params.full_name,
                    password: password_hash.generate(password),
                    role: '',
                    created_at: moment().format(),
                })

                message = res_insert.error.length === 0 ? 'Register success.' : res_insert.error;
            }
            dispatch(registerAction(message))
        } else {
            dispatch(registerAction(message))
        }

    }
}

export function registerAction(message) {
    return {
        type: REGISTER_ACTION,
        payload: message
    };
}
