import {
    FETCH_USER_GENERAL_ACTION,
    FETCH_USER_ORDERS_ACTION,
    FETCH_USER_TRANSACTIONS_ACTION,
    PENDING_FETCH_USER_GENERAL_ACTION,
    PENDING_FETCH_USER_ORDERS_ACTION,
    PENDING_FETCH_USER_TRANSACTIONS_ACTION,
} from "./constants";
import db from "../../../database/firestore";

const refMstUser = db.collection('mst_user')

// ========================== User general ==========================
export function fetchUserGeneral(username) {
    return dispatch => {
        dispatch(pendingFetchUserGeneralAction())
        return refMstUser.where('username', '==', username).limit(1).get().then(snapshot => {
            let data = null;
            snapshot.forEach(doc => {
                data = {
                    id: doc.id,
                    ...doc.data(),
                    balance: 0
                }

                return refMstUser.doc(doc.id).collection('transactions').get().then(snapshot_tran => {
                    let balance = 0;
                    snapshot_tran.forEach(doc_tran => {
                        balance += parseInt(doc_tran.data().amount)
                    })
                    data.balance = balance;
                }).finally(() => {
                    dispatch(fetchUserGeneralAction(dispatch, {data: data}));
                });
            });
        })
    }
}

export function pendingFetchUserGeneralAction() {
    return {
        type: PENDING_FETCH_USER_GENERAL_ACTION,
        payload: true
    };
}

export function fetchUserGeneralAction(dispatch, data) {
    return {
        type: FETCH_USER_GENERAL_ACTION,
        payload: data.data
    };
}

//========================== User transactions ==========================
export function fetchUserTransactions(username) {
    return dispatch => {
        dispatch(pendingFetchUserTransactionsAction())
        return refMstUser.where('username', '==', username).limit(1).get().then(snapshot => {
            snapshot.forEach(doc => {
                let list = [];
                return refMstUser.doc(doc.id).collection('transactions').get().then(snapshot_tran => {
                    snapshot_tran.forEach(doc_tran => {
                        let item = {
                            id: doc_tran.id,
                            ...doc_tran.data()
                        }
                        list.push(item);
                    })
                }).finally(() => {
                    dispatch(fetchUserTransactionAction(dispatch, {data: list}));
                });
            });
        })
    }
}

export function pendingFetchUserTransactionsAction() {
    return {
        type: PENDING_FETCH_USER_TRANSACTIONS_ACTION,
        payload: true
    };
}

export function fetchUserTransactionAction(dispatch, data) {
    return {
        type: FETCH_USER_TRANSACTIONS_ACTION,
        payload: data.data !== undefined && data.data !== null ? data.data : []
    };
}

// ========================== User orders ==========================
export function fetchUserOrders(username) {
    return dispatch => {
        dispatch(pendingFetchUserOrdersAction())
        return refMstUser.where('username', '==', username).limit(1).get().then(snapshot => {
            snapshot.forEach(doc => {
                let list = [];
                return refMstUser.doc(doc.id).collection('orders').get().then(snapshot_order => {
                    snapshot_order.forEach(doc_order => {
                        let item = {
                            id: doc_order.id,
                            ...doc_order.data()
                        }
                        list.push(item);
                    })
                }).finally(() => {
                    dispatch(fetchUserOrdersAction(dispatch, {data: list}));
                });
            });
        })
    }
}

export function pendingFetchUserOrdersAction() {
    return {
        type: PENDING_FETCH_USER_ORDERS_ACTION,
        payload: true
    };
}

export function fetchUserOrdersAction(dispatch, data) {
    return {
        type: FETCH_USER_ORDERS_ACTION,
        payload: data.data !== undefined && data.data !== null ? data.data : []
    };
}
