import React, {Component} from 'react';
import {App} from "../../layouts/App";
import {Redirect, Route} from "react-router-dom";
import {connect} from "react-redux";

class Container extends Component {
    render() {
        const auth = this.props.auth;
        const id   = auth.id;
        const role = auth.role;

        // Check auth
        if (id === null || id === undefined) {
            return (
                <Redirect to="/login"/>
            )
        }

        // Check rule
        const roles = this.props.roles
        const notAllow = (typeof roles) === "object" && roles.indexOf(role) === -1;
        if (notAllow){
            return (
                <Redirect to="/errors/403"/>
            )
        }

        let component = null;
        switch (this.props.layout) {
            case 'App':
                component = <App>{this.props.children}</App>
                break;
            default:
                break;
        }

        return this.props.exact ?
            (<Route path={this.props.path} exact>{component}</Route>)
            : (<Route path={this.props.path}>{component}</Route>)
    }
}

function mapStateToProps(state) {
    return {
        auth: state.auth,
        crud: state.crud,
    }
}

export default connect(mapStateToProps, {})(Container)