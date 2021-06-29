import React, {Component} from 'react';
import {Link} from "react-router-dom";
import {Logo} from "../Logo";
import {Menu, Dropdown} from 'antd';
import {Avatar} from 'antd';
import img_user from "../../images/users/user.png"

class President extends Component {
    render() {
        let pathName          = this.props.router.location.pathname
        const classItem       = "menu-item";
        const classItemActive = "menu-item active";
        const classHeader     = this.props.isTransparent === true ? "header transparent" : "header";

        // Auth
        const auth          = this.props.auth;
        const authenticated = auth.id !== undefined && auth.id !== null;

        return (
            <header className={classHeader}>
                <div className="header-content">
                    <div className="header-logo">
                        <Logo/>
                    </div>
                    <div className="header-menu">
                        <ul className="menu-content">
                            <li className={pathName === "/" ? classItemActive : classItem}>
                                <Link to="/">Home</Link>
                            </li>
                            <li className={pathName === "/contact" ? classItemActive : classItem}>
                                <Link to="/contact">Contact</Link>
                            </li>
                            <li className={pathName === "/about" ? classItemActive : classItem}>
                                <Link to="/about">About</Link>
                            </li>
                        </ul>
                    </div>

                    <div className="header-menu auth-menu">
                        {
                            authenticated ?
                                (
                                    <Dropdown className="menu-content" overlay={
                                        <Menu>
                                            <Menu.Item onClick={() => {
                                                this.props.handleLogout()
                                            }}>
                                                Logout
                                            </Menu.Item>
                                        </Menu>
                                    }>
                                        <Link to={'/users/' + auth.username}>
                                            <Avatar className="avatar" src={img_user}/>
                                            <span className="full-name">{auth.full_name}</span>
                                        </Link>
                                    </Dropdown>
                                )
                                :
                                <ul className="menu-content">
                                    <li className="menu-item">
                                        <Link to='/login'>Login</Link>
                                    </li>
                                    <li className="menu-item">
                                        <Link to="/register">Register</Link>
                                    </li>
                                </ul>
                        }
                    </div>

                </div>
            </header>
        )
    }
}

export default President;