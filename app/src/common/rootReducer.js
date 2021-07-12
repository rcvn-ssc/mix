import {combineReducers} from "redux";
import {connectRouter} from "connected-react-router";
import history from "./history";
import {reducer as AuthReducer} from "../features/Auth/redux/reducer"
import {reducer as HomeReducer} from "../features/Home/redux/reducer"
import {reducer as UserReducer} from "../features/Users/redux/reducer"
import {reducer as OrderLunchReducer} from "../features/OrderLunch/redux/reducer"
import {reducer as TransactionsReducer} from "../features/Transactions/redux/reducer"


const reducerMap = {
    router      : connectRouter(history),
    auth        : AuthReducer,
    home        : HomeReducer,
    user        : UserReducer,
    orderLunch  : OrderLunchReducer,
    transactions: TransactionsReducer,
};

export default combineReducers(reducerMap);
