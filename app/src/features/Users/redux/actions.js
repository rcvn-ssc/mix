import {
    FETCH_USER_GENERAL_ACTION,
    FETCH_USER_ORDERS_ACTION,
    FETCH_USER_TRANSACTIONS_ACTION,
    PENDING_FETCH_USER_GENERAL_ACTION,
    PENDING_FETCH_USER_ORDERS_ACTION,
    PENDING_FETCH_USER_TRANSACTIONS_ACTION,
} from "./constants";
import {default as db, fetchList, findOne} from "../../../database/firestore";

const refMstUser = db.collection('mst_user')

// ========================== User general ==========================
export function fetchUserGeneral(username) {
    return async dispatch => {
        dispatch(pendingFetchUserGeneralAction())
        const res = await findOne(refMstUser.where('username', '==', username));
        if (res.data !== null) {
            const res_trans = await fetchList(refMstUser.doc(res.data.id).collection('transactions').orderBy('created_at', 'desc'))
            let balance = 0;
            if (res_trans.error !== []) {
                for (const res_tran of res_trans.data) {
                    balance += parseInt(res_tran.amount)
                }
            }
            res.data.balance = balance;
        }
        dispatch(fetchUserGeneralAction(res.data))
    }
}

export function pendingFetchUserGeneralAction() {
    return {
        type: PENDING_FETCH_USER_GENERAL_ACTION,
        payload: true
    };
}

export function fetchUserGeneralAction(data) {
    return {
        type: FETCH_USER_GENERAL_ACTION,
        payload: data
    };
}

//========================== User transactions ==========================
export function fetchUserTransactions(username) {
    return async dispatch => {
        dispatch(pendingFetchUserTransactionsAction())
        let trans = [];
        const res = await findOne(refMstUser.where('username', '==', username));
        if (res.data !== null) {
            const res_trans = await fetchList(refMstUser.doc(res.data.id).collection('transactions').orderBy('created_at', 'desc'))
            if (res_trans.error !== []) {
                trans = res_trans.data;
            }
        }
        dispatch(fetchUserTransactionAction(trans));
    }
}

export function pendingFetchUserTransactionsAction() {
    return {
        type: PENDING_FETCH_USER_TRANSACTIONS_ACTION,
        payload: true
    };
}

export function fetchUserTransactionAction(data) {
    return {
        type: FETCH_USER_TRANSACTIONS_ACTION,
        payload: data
    };
}

// ========================== User orders ==========================
export function fetchUserOrders(username) {
    return async dispatch => {
        dispatch(pendingFetchUserOrdersAction())
        let orders = [];
        const res = await findOne(refMstUser.where('username', '==', username));
        if (res.data !== null) {
            const res_orders = await fetchList(refMstUser.doc(res.data.id).collection('orders').orderBy('created_at', 'desc'))
            if (res_orders.error !== []) {
                orders = res_orders.data;
            }
        }
        dispatch(fetchUserOrdersAction(orders));
    }
}

export function pendingFetchUserOrdersAction() {
    return {
        type: PENDING_FETCH_USER_ORDERS_ACTION,
        payload: true
    };
}

export function fetchUserOrdersAction(data) {
    return {
        type: FETCH_USER_ORDERS_ACTION,
        payload: data
    };
}
