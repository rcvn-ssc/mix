import React, {Component} from 'react';
import President from './President';
import {connect} from 'react-redux';
import {register} from "../../redux/actions";

class Container extends Component {
    handleRegister = (data) => {
        this.props.register(data)
    }

    render() {
        let {message, pending} = this.props.auth;
        return (<President
            message={message}
            pending={pending}
            handleRegister={this.handleRegister}/>)
    }
}

function mapDispatchToProps(dispatch) {
    return {
        register: (data) => {
            dispatch(register(data));
        },
    };
}


function mapStateToProps(state) {
    return {
        auth: state.auth,
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Container)