import React, {Component} from 'react';
import logo from '../../images/logo.png';

class Logo extends Component {
    render() {
        return (
            <img src={logo} className="common-logo" alt="logo"/>
        )
    }
}

export default Logo;
