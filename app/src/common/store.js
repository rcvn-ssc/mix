import {applyMiddleware, compose, createStore} from "redux";
import thunk from "redux-thunk";
import {routerMiddleware} from "connected-react-router";
import history from "./history";
import rootReducer from "./rootReducer";

const router = routerMiddleware(history);
const middlewares = [thunk, router];

/* istanbul ignore if  */

if (process.env.NODE_ENV === "development") {
    const {createLogger} = require("redux-logger");

    const logger = createLogger({collapsed: true});
    //middlewares.push(logger);
}

function configureStore(initialState) {
    return createStore(
        rootReducer,
        initialState,
        compose(
            applyMiddleware(...middlewares),
        )
    );
}

export default configureStore();
