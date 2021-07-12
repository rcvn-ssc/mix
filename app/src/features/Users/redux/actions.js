import {
    FETCH_USER_GENERAL_ACTION,
    FETCH_USER_ORDERS_ACTION,
    FETCH_USER_TRANSACTIONS_ACTION,
    PENDING_FETCH_USER_GENERAL_ACTION,
    PENDING_FETCH_USER_ORDERS_ACTION,
    PENDING_FETCH_USER_TRANSACTIONS_ACTION,
    FETCH_USERS_ACTION,
    PENDING_FETCH_USERS_ACTION,
} from "./constants";

import {fetchList, findByField, findOne, refMstUser} from "../../../database/firestore";

// ========================== All user ==========================
export function fetchUsers() {
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
        type   : PENDING_FETCH_USERS_ACTION,
        payload: null
    };
}

export function fetchUsersAction(data) {
    return {
        type   : FETCH_USERS_ACTION,
        payload: data
    };
}

// ========================== User general ==========================
export function fetchUserGeneralById(id) {
    return async dispatch => {
        dispatch(pendingFetchUserGeneralAction())
        const res = await findOne(refMstUser, id);
        if (res.data !== null) {
            res.data.balance = await getBalance(res.data.id);
        }
        dispatch(fetchUserGeneralAction(res.data))
    }
}

// ========================== User general ==========================
export function fetchUserGeneral(username) {
    return async dispatch => {
        dispatch(pendingFetchUserGeneralAction())
        let res = await findByField(refMstUser.where('username', '==', username));
        if (res.data !== null) {
            res.data.balance = await getBalance(res.data.id);
        }
        dispatch(fetchUserGeneralAction(res.data))
    }
}

// Gt balance
async function getBalance(id) {
    const res_trans = await fetchList(refMstUser.doc(id).collection('transactions').orderBy('created_at', 'desc'))
    let balance     = 0;
    if (res_trans.error.length === 0) {
        for (const res_tran of res_trans.data) {
            balance += parseInt(res_tran.amount)
        }
    }

    return balance
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
        const res = await findByField(refMstUser.where('username', '==', username));
        if (res.data !== null) {
            const res_trans = await fetchList(refMstUser.doc(res.data.id).collection('transactions').orderBy('created_at', 'desc'))
            if (res_trans.error.length === 0) {
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
        const res = await findByField(refMstUser.where('username', '==', username));
        if (res.data !== null) {
            const res_orders = await fetchList(refMstUser.doc(res.data.id).collection('orders').orderBy('created_at', 'desc'))
            if (res_orders.error.length === 0) {
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
