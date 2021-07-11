import {
    ORDER_LUNCH_FETCH_USERS_ACTION,
    ORDER_LUNCH_FETCH_USERS_PENDING_ACTION,
    ORDER_LUNCH_INSERT_MULTI_ACTION,
    ORDER_LUNCH_INSERT_MULTI_PENDING_ACTION,
} from "./constants";

import {default as db, fetchList, firestore} from "../../../database/firestore"
import {pushMessageError, pushMessageLoading, pushMessageSuccess} from "../../../layouts";

const refMstUser = db.collection('mst_user')

export function fetchUser() {
    return async dispatch => {
        let data = [];
        dispatch(fetchUsersPendingAction());
        const res = await fetchList(refMstUser.orderBy('created_at'));
        if (res.error.length === 0) {
            data = res.data;
        }
        dispatch(fetchUsersAction(data));
    }
}

export function fetchUsersPendingAction() {
    return {
        type   : ORDER_LUNCH_FETCH_USERS_PENDING_ACTION,
        payload: null
    };
}

export function fetchUsersAction(data) {
    return {
        type   : ORDER_LUNCH_FETCH_USERS_ACTION,
        payload: data
    };
}

export function insertMulti(listUsername, amount, description) {
    const createdAt = new Date().toISOString();
    if (description === null || description === '' || description === undefined) {
        description = 'Order ' + createdAt
    }
    return async dispatch => {
        let message = '';
        pushMessageLoading()
        dispatch(insertMultiPendingAction());
        if (listUsername.length === 0) {
            message = 'Have not users selected'
        } else if (amount === 0 || amount === '' || amount === null) {
            message = 'Amount invalid'
        } else {
            const res   = await fetchList(refMstUser.where('username', 'in', listUsername));
            const data  = res.data;
            const error = res.error;
            if (error.length === 0) {
                // List exist from DB
                const listExist = data.map(user => {
                    return user.username;
                })

                // List not found
                const listNotFound = listUsername.filter(username => {
                    return listExist.indexOf(username) === -1;
                })

                if (listNotFound.length === 0) {
                    // Create data
                    const listId = data.map(user => {
                        return user.id;
                    })

                    message = await insertOrderMulti(refMstUser, listId, amount, createdAt, description)
                } else {
                    message = listNotFound.toString() + ' not found.'
                }

            } else {
                message = error;
            }
        }

        dispatch(insertMultiAction(message));

        if (message === 'OK'){
            pushMessageSuccess()
        }
        else {
            pushMessageError(message);
        }
    }
}

async function insertOrderMulti(refMstUser, listId, amount, createdAt, description) {
    let message         = '';
    // Amount per user
    const amountPerUser = amount / listId.length;
    let batch           = firestore.batch();

    for (const id of listId) {
        const order       = refMstUser.doc(id).collection('orders').doc();
        const transaction = refMstUser.doc(id).collection('transactions').doc();

        batch.set(order, {
            amount     : amountPerUser,
            created_at : createdAt,
            description: description,
        })

        batch.set(transaction, {
            amount     : 0 - amountPerUser,
            created_at : createdAt,
            description: 'Payment order ' + order.id,
        })
    }

    await batch.commit().then(() => {
        message = 'OK';
    }).catch((error) => {
        message = error.message;
    })

    return message;
}

export function insertMultiPendingAction() {
    return {
        type   : ORDER_LUNCH_INSERT_MULTI_PENDING_ACTION,
        payload: null
    };
}

export function insertMultiAction(data) {
    return {
        type   : ORDER_LUNCH_INSERT_MULTI_ACTION,
        payload: data
    };
}