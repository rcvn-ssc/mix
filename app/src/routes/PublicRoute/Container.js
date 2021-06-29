import React, {Component} from 'react';
import {Route} from "react-router-dom";
import {App} from "../../layouts/App";
import {Auth} from "../../layouts/Auth";
import {connect} from "react-redux";

class Container extends Component {

    render() {
        let component = null;
        switch (this.props.layout) {
            case 'App':
                component = <App>{this.props.children}</App>
                break;
            case 'Auth':
                component = <Auth>{this.props.children}</Auth>
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
        crud: state.crud,
    }
}

export default connect(mapStateToProps, {})(Container)