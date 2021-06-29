import React, {Component} from 'react';
import {CreditCardOutlined, InfoCircleOutlined, ShoppingCartOutlined, UserOutlined} from "@ant-design/icons";
import {Loading} from "../../../../layouts/Loading";
import {Avatar, Card} from "antd";
import img_user from "../../../../images/users/user.png";
import {DataError} from "../../../../layouts"
import {Link} from "react-router-dom";

class UserGeneral extends Component {
    getActions = (user, generalMenu) => {
        const menu = [];
        if (user !== null) {
            if (generalMenu.indexOf('information') !== -1) {
                menu.push(
                    <Link key="edit" to={'/users/' + user.username}>
                        <InfoCircleOutlined/> Information
                    </Link>
                )
            }
            if (generalMenu.indexOf('orders-create') !== -1) {
                menu.push(
                    <Link key="orders-create" to={"/users/" + user.username + "/orders/create"}>
                        <ShoppingCartOutlined/> New order
                    </Link>
                )
            }
            if (generalMenu.indexOf('transactions-create') !== -1) {
                menu.push(
                    <Link key="transactions-create" to={"/users/" + user.username + "/transactions/create"}>
                        <CreditCardOutlined/> Pay in
                    </Link>
                )
            }
        }

        return menu
    }

    render() {
        const user                = this.props.user
        const pendingFetchGeneral = this.props.pendingFetchGeneral
        return (
            <Card title={
                <div>
                    <UserOutlined/> General
                </div>
            }
            >
                {
                    pendingFetchGeneral ? <Loading/> :
                        (
                            user === null ? <DataError/> :
                                <div className="user-data-wrapper">
                                    <div className="user-data avatar-wrapper text-center">
                                        <Avatar
                                            src={img_user}
                                            size={100}
                                        />
                                        <div className="avatar-label">
                                            {user.full_name}
                                        </div>
                                    </div>
                                    <div className="user-data account-wrapper">
                                        <div className="account-data">
                                                        <span className="account-data-key">
                                                            UUID:
                                                        </span>
                                            <span className="account-data-value">
                                                            {user.id}
                                                        </span>
                                        </div>
                                        <div className="account-data">
                                                        <span className="account-data-key">
                                                            Username:
                                                        </span>
                                            <span className="account-data-value">
                                                            {user.username}
                                                        </span>
                                        </div>
                                        <div className="account-data">
                                                        <span className="account-data-key">
                                                            Full name:
                                                        </span>
                                            <span className="account-data-value">
                                                            {user.full_name}
                                                        </span>
                                        </div>
                                        <div className="account-data">
                                                        <span className="account-data-key">
                                                            Balance:
                                                        </span>
                                            <span className="account-data-value">
                                                            {user.balance.toLocaleString()} VND
                                                        </span>
                                        </div>
                                    </div>
                                </div>
                        )
                }
            </Card>
        )
    }
}

export default UserGeneral