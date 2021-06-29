import db from "../../../database/firestore"
import {FETCH_USERS, FETCH_USERS_PENDING} from "./constants";

const refMstUser = db.collection('mst_user')

export function fetchUser() {
    return dispatch => {
        dispatch(fetchUsersPendingAction());
        let list = [];
        return refMstUser.get().then(snapshot => {
            snapshot.forEach(doc => {
                let item = {
                    id: doc.id,
                    ...doc.data()
                }
                list.push(item);
            });
        }).catch(error => {
            console.log(error)
        }).finally(() => {
            dispatch(fetchUsersAction(dispatch, {data: list}));
        });
    }
}

export function fetchUsersPendingAction() {
    return {
        type: FETCH_USERS_PENDING,
        payload: null
    };
}

export function fetchUsersAction(dispatch, data) {
    return {
        type: FETCH_USERS,
        payload: data.data
    };
}