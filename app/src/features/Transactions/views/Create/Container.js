import React, {Component} from 'react';
import President from './President';
import {connect} from 'react-redux';
import {fetchUserGeneral, fetchUserGeneralById, fetchUsers} from "../../../Users/redux/actions";
import {transInsert} from "../../redux/actions";

class Container extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id          : null,
            amount      : null,
            description : '',
            modalVisible: false,
        }
    }

    onFinish = () => {
        this.setState({
            ...this.state,
            modalVisible: true
        })
    }

    onCancel = () => {
        this.setState({
            ...this.state,
            modalVisible: false
        })
    }

    onOk = () => {
        const {id, amount, description} = this.state;
        this.props.transInsert(id, amount, description, this.props.auth.id, this.props.auth.username);
        this.onCancel();
    }

    onChange = (value) => {
        this.setState({
            ...this.state,
            id: value
        })
        this.props.fetchUserGeneralById(value)
    };

    onChangeAmount = (e) => {
        this.setState({
            ...this.state,
            amount: e.currentTarget.value
        })
    };

    onChangeDescription = (e) => {
        this.setState({
            ...this.state,
            description: e.currentTarget.value
        })
    };

    getNotePayIn = () => {
        const {amount, id} = this.state
        const {user}       = this.props.user
        if (isNaN(parseInt(amount)) === false && id !== null && user !== null) {
            const balanceAfter = parseInt(amount) + user.balance
            return '(*) Balance after pay in ~ ' + balanceAfter.toLocaleString() + ' VND'
        } else if (id === null) {
            return '(*) Have not user selected'
        } else if (user === null) {
            return '(*) Not found user'
        } else {
            return '(*) Amount invalid'
        }
    }

    render() {
        const {users, user, pendingFetchGeneral, pendingFetchUsers} = this.props.user;
        const {pendingTransactionCreate}                            = this.props.transactions
        return (<President
            user={user}
            pendingFetchGeneral={pendingFetchGeneral}
            users={users}
            pendingFetchUsers={pendingFetchUsers}
            pendingTransactionCreate={pendingTransactionCreate}
            onChange={this.onChange}
            onChangeAmount={this.onChangeAmount}
            onChangeDescription={this.onChangeDescription}
            getNotePayIn={this.getNotePayIn}
            onFinish={this.onFinish}
            onCancel={this.onCancel}
            onOk={this.onOk}
            {...this.state}
        />)
    }

    componentDidMount() {
        this.props.fetchUsers();
    }
}

function mapDispatchToProps(dispatch) {
    return {
        fetchUsers          : () => {
            dispatch(fetchUsers());
        },
        transInsert         : (userId, amount, description, adminId, adminUsername) => {
            dispatch(transInsert(userId, amount, description, adminId, adminUsername));
        },
        fetchUserGeneralById: (id) => {
            dispatch(fetchUserGeneralById(id));
        },
    };
}

function mapStateToProps(state) {
    return {
        transactions: state.transactions,
        auth        : state.auth,
        user        : state.user,
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Container)