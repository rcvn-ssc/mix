import React, {Component} from "react";
import {Link}             from "react-router-dom";
import background         from "../../images/auth/background.svg";
import logo               from "../../images/logo.png";

class President extends Component {
    render() {
        return (
            <div className="auth" style={{backgroundImage: `url(${background})`}}>
                <div className="antd-pro-layouts-user-layout-content">
                    <div className="antd-pro-layouts-user-layout-top">
                        <div className="antd-pro-layouts-user-layout-header">
                            <Link to="/">
                                <img alt="" className="antd-pro-layouts-user-layout-logo" src={logo}/>
                                <span className="antd-pro-layouts-user-layout-title">SSC MIX</span>
                            </Link>
                        </div>
                        <div className="antd-pro-layouts-user-layout-desc">
                            Ant Design 是西湖区最具影响力的 Web 设计规范
                        </div>
                    </div>
                    <div className="antd-pro-pages-user-login-index-main">
                        {this.props.children}
                    </div>
                </div>
            </div>
        );
    }
}

export default President