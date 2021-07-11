import React, {Component} from 'react';
import President from './President';
import {connect} from 'react-redux';
import {fetchUser, insertMulti} from "../../redux/actions";

class Container extends Component {
    constructor(props) {
        super(props);
        this.state = {
            targetKey   : [],
            selectedKeys: [],
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
        const {targetKey, amount, description} = this.state;
        const {id, username}                   = this.props.auth;
        this.props.insertMulti(targetKey, amount, description, id, username);
        this.onCancel();
    }

    onChange = (nextTargetKeys) => {
        this.setState({
            ...this.state,
            targetKey: nextTargetKeys
        })
    };

    onChangeAmount = (e) => {
        this.setState({
            ...this.state,
            amount: e.currentTarget.value
        })
    };

    getNoteCashIn = () => {
        let cashIn                = 0;
        const {amount, targetKey} = this.state

        if (targetKey.length > 0 && isNaN(parseInt(amount)) === false) {
            cashIn = this.state.amount / targetKey.length;
            return '(*) Each user cash in about ~ ' + cashIn.toLocaleString() + ' VND'
        } else if (targetKey.length === 0) {
            return '(*) Have not users selected'
        } else {
            return '(*) Amount invalid'
        }
    }

    render() {
        const {users, pendingFetch, pendingOrderMulti} = this.props.orderLunch
        return (<President
            users={users}
            pendingFetch={pendingFetch}
            pendingOrderMulti={pendingOrderMulti}
            onChange={this.onChange}
            onChangeAmount={this.onChangeAmount}
            getNoteCashIn={this.getNoteCashIn}
            onFinish={this.onFinish}
            onCancel={this.onCancel}
            onOk={this.onOk}
            {...this.state}
        />)
    }

    componentDidMount() {
        this.props.fetchUser();
    }
}

function mapDispatchToProps(dispatch) {
    return {
        fetchUser  : () => {
            dispatch(fetchUser());
        },
        insertMulti: (list_username, amount, description, adminId, adminUsername) => {
            dispatch(insertMulti(list_username, amount, description, adminId, adminUsername));
        },
    };
}

function mapStateToProps(state) {
    return {
        orderLunch: state.orderLunch,
        auth      : state.auth,
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Container)