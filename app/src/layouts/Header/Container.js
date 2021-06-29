import React, {Component} from 'react';
import President from './President';
import {connect} from 'react-redux';
import {clearToken} from "../../features/Auth/redux/actions";

class Container extends Component {

    handleLogout = () => {
        this.props.clearToken();
    }

    render() {
        return (<President
            {...this.props}
            handleLogout={this.handleLogout}
        />)
    }
}

function mapDispatchToProps(dispatch) {
    return {
        clearToken: () => {
            dispatch(clearToken());
        },
    };
}

function mapStateToProps(state) {
    return {
        router: state.router,
        auth: state.auth
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Container)