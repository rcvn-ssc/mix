import {default as db, fetchList} from "../../../database/firestore"
import {FETCH_USERS, FETCH_USERS_PENDING} from "./constants";

const refMstUser = db.collection('mst_user').orderBy('created_at')

export function fetchUser() {
    return async dispatch => {
        let data = [];
        dispatch(fetchUsersPendingAction());
        const res = await fetchList(refMstUser);
        if (res.error !== []) {
            data = res.data;
        }
        dispatch(fetchUsersAction(data));
    }
}

export function fetchUsersPendingAction() {
    return {
        type: FETCH_USERS_PENDING,
        payload: null
    };
}

export function fetchUsersAction(data) {
    return {
        type: FETCH_USERS,
        payload: data
    };
}