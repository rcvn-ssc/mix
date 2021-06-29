import React, {Component} from 'react';
import store from "./common/store";
import history from './common/history'
import {Provider} from 'react-redux';
import {ConnectedRouter} from "connected-react-router";
import Routes from "./routes";
import './styles/index.scss';

class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <ConnectedRouter history={history}>
                    <Routes/>
                </ConnectedRouter>
            </Provider>
        );
    }
}

export default App
