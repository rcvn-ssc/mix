import React, {Component} from 'react';
import President from './President';
import {connect} from 'react-redux';
import {fetchUserGeneral, fetchUserOrders, fetchUserTransactions} from "../../redux/actions";
import {createMatchSelector} from "connected-react-router";
import {changePassword} from "../../../Auth/redux/actions";

class Container extends Component {
    constructor(props) {
        super(props);
        this.state = {
            passwordOld       : '',
            passwordNew       : '',
            passwordNewConfirm: '',
            modalVisible      : false,
        }
    }

    onChangePasswordOld = (e) => {
        this.setState({
            ...this.state,
            passwordOld: e.currentTarget.value
        })
    }

    onChangePasswordNew = (e) => {
        this.setState({
            ...this.state,
            passwordNew: e.currentTarget.value
        })
    }

    onChangePasswordConfirm = (e) => {
        this.setState({
            ...this.state,
            passwordNewConfirm: e.currentTarget.value
        })
    }

    onCancel = () => {
        this.setState({
            ...this.state,
            modalVisible: false
        })
    }

    onFinish = () => {
        this.setState({
            ...this.state,
            modalVisible: true
        })
    }

    onOk = () => {
        const {passwordOld, passwordNew} = this.state;
        this.props.changePassword(this.props.auth.id, passwordOld, passwordNew);
        this.onCancel();
    }

    isAuthUser = () => {
        const {user} = this.props.user
        const userId = user !== null ? user.id : null;
        const authId = this.props.auth.id

        return userId === authId
    }

    helperMessage = () => {
        let message                                          = '';
        const {passwordOld, passwordNew, passwordNewConfirm} = this.state
        if ((passwordOld !== '') && (passwordNew !== '') && (passwordNew === passwordNewConfirm)) {
            message = '(*) Please login again after change password.'
        } else if (passwordOld === '') {
            message = '(*) Password old is required.'
        } else if (passwordNew === '') {
            message = '(*) Password new is required.'
        } else {
            message = '(*) Confirm password new does not match.'
        }

        return message;
    }

    render() {
        const reducer = this.props.user;

        const {changePasswordPending} = this.props.auth

        const {passwordOld, passwordNew, passwordNewConfirm, modalVisible} = this.state

        const changePasswordDisabled = (passwordOld === '') || (passwordNew === '') || (passwordNew !== passwordNewConfirm)
        return (
            <President
                user={reducer.user}
                pendingFetchGeneral={reducer.pendingFetchGeneral}
                orders={reducer.orders}
                pendingFetchOrders={reducer.pendingFetchOrders}
                transactions={reducer.transactions}
                pendingFetchTransactions={reducer.pendingFetchTransactions}

                onChangePasswordOld={this.onChangePasswordOld}
                onChangePasswordNew={this.onChangePasswordNew}
                onChangePasswordConfirm={this.onChangePasswordConfirm}
                changePasswordPending={changePasswordPending}
                changePasswordDisabled={changePasswordDisabled}
                onCancel={this.onCancel}
                onOk={this.onOk}
                modalVisible={modalVisible}
                onFinish={this.onFinish}
                isAuthUser={this.isAuthUser()}
                helperMessage={this.helperMessage()}
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

        changePassword: (id, passwordOld, passwordNew) => {
            dispatch(changePassword(id, passwordOld, passwordNew));
        },
    };
}

function mapStateToProps(state) {
    const matchSelector = createMatchSelector("/users/:username");
    return {
        auth : state.auth,
        user : state.user,
        match: matchSelector(state)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Container)