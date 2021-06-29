import {combineReducers} from "redux";
import {connectRouter} from "connected-react-router";
import history from "./history";
import {reducer as CrudReducer} from "./crud/reducer"
import {reducer as AuthReducer} from "../features/Auth/redux/reducer"
import {reducer as HomeReducer} from "../features/Home/redux/reducer"
import {reducer as UserReducer} from "../features/Users/redux/reducer"


const reducerMap = {
    router: connectRouter(history),
    crud: CrudReducer,
    auth: AuthReducer,
    home: HomeReducer,
    user: UserReducer,
};

export default combineReducers(reducerMap);
