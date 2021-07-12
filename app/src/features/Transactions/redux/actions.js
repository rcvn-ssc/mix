import {
    TRANS_INSERT_ACTION,
    TRANS_INSERT_ACTION_PENDING,
} from "./constants";

import {default as db, isAdmin, findOne, insert} from "../../../database/firestore"
import {pushMessageError, pushMessageLoading, pushMessageSuccess} from "../../../layouts";
import {fetchUserGeneralById} from "../../Users/redux/actions";

const refMstUser = db.collection('mst_user')

export function transInsert(userId, amount, description, adminId, adminUsername) {
    const createdAt = new Date().toISOString();
    if (description === null || description === '' || description === undefined) {
        description = 'Pay in ' + createdAt
    }
    return async dispatch => {
        let message = '';
        pushMessageLoading()
        dispatch(insertPendingAction());

        const auth = await isAdmin(adminId);

        if (auth === false) {
            message = 'Permission denied.'
        } else if (userId === null) {
            message = 'User is required'
        } else if (amount <= 0 || amount === '' || amount === null) {
            message = 'Amount invalid.'
        } else {
            const res   = await findOne(refMstUser, userId);
            const data  = res.data;
            const error = res.error;
            if (error.length === 0) {
                if (data !== null) {
                    const resTrans = await insert(refMstUser.doc(userId).collection('transactions'), {
                        amount      : amount,
                        created_at  : createdAt,
                        created_user: adminUsername,
                        description : description,
                    })

                    message = resTrans.data === null ? message.error : 'OK'
                } else {
                    message = 'User not found.'
                }

            } else {
                message = error;
            }
        }

        dispatch(insertAction(message));

        if (message === 'OK') {
            pushMessageSuccess()
            dispatch(fetchUserGeneralById(userId))
        } else {
            pushMessageError(message);
        }
    }
}

export function insertPendingAction() {
    return {
        type   : TRANS_INSERT_ACTION_PENDING,
        payload: null
    };
}

export function insertAction(data) {
    return {
        type   : TRANS_INSERT_ACTION,
        payload: data
    };
}