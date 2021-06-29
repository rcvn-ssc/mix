import axios     from "axios";
import {EXAMPLE} from "./constants";

let env = require("../../../config/env");

export function example() {
    let url = env.API_URL;
    return dispatch => {
        return axios.get(url, {})
            .then(response => {
                dispatch(exampleAction(response.data))
            }).catch(error => {
                // Server not response
                console.log(error)
            }).finally(() => {

            });
    }
}

export function exampleAction(data) {
    return {
        type: EXAMPLE,
        payload: data
    };
}