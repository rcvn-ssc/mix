import React, {Component} from 'react';
import President from './President';
import {connect} from 'react-redux';
import {fetchUserGeneral, fetchUserOrders, fetchUserTransactions} from "../../redux/actions";
import {createMatchSelector} from "connected-react-router";

class Container extends Component {
    render() {
        const reducer = this.props.user;
        const generalMenu = [
          'orders-create',
          'transactions-create',
        ];
        return (
            <President
                user={reducer.user}
                pendingFetchGeneral={reducer.pendingFetchGeneral}
                orders={reducer.orders}
                pendingFetchOrders={reducer.pendingFetchOrders}
                transactions={reducer.transactions}
                pendingFetchTransactions={reducer.pendingFetchTransactions}
                generalMenu={generalMenu}
            />
        )
    }

    componentDidMount() {
        const auth       = this.props.auth;
        const {username} = this.props.match.params;
        const config     = {
            headers: {Authorization: `Bearer ${auth.token}`}
        }
        this.props.fetchUserGeneral(username)
        this.props.fetchUserTransactions(username, config)
        this.props.fetchUserOrders(username, config)
    }
}

function mapDispatchToProps(dispatch) {
    return {
        fetchUserGeneral: (username) => {
            dispatch(fetchUserGeneral(username));
        },
        fetchUserTransactions: (username, config) => {
            dispatch(fetchUserTransactions(username, config));
        },
        fetchUserOrders: (username, config) => {
            dispatch(fetchUserOrders(username, config));
        },
    };
}

function mapStateToProps(state) {
    const matchSelector = createMatchSelector("/users/:username");
    return {
        auth: state.auth,
        user: state.user,
        match: matchSelector(state)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Container)