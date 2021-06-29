import React, {Component} from 'react';
import President from './President';
import {connect} from 'react-redux';
import {Redirect} from "react-router-dom"
import {login} from "../../redux/actions";

class Container extends Component {
    handleLogin = (data) => {
        this.props.login(data)
    }

    render() {
        const auth = this.props.auth;
        const id   = auth.id;

        if (id !== null && id !== undefined) {
            return (
                <Redirect to={"/users/" + auth.username}/>
            )
        }

        return (<President
            crud={this.props.crud}
            handleLogin={this.handleLogin}
        />)
    }
}

function mapDispatchToProps(dispatch) {
    return {
        login: (data) => {
            dispatch(login(data));
        },
    };
}

function mapStateToProps(state) {
    return {
        auth: state.auth,
        crud: state.crud
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Container)