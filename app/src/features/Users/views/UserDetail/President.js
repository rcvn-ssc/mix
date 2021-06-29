import React, {Component} from 'react';
import {UserGeneral, UserTabs} from "../../components";
import {
    Row,
    Col,
} from 'antd';

class President extends Component {
    render() {
        const errorMessage             = this.props.errorMessage;
        const user                     = this.props.user
        const pendingFetchGeneral      = this.props.pendingFetchGeneral
        const orders                   = this.props.orders
        const pendingFetchOrders       = this.props.pendingFetchOrders
        const transactions             = this.props.transactions
        const pendingFetchTransactions = this.props.pendingFetchTransactions
        const generalMenu              = this.props.generalMenu
        return (
            <div className="features feature-user">
                <Row gutter={24}
                     className="user-detail">
                    <Col xs={24} md={8}>
                        <UserGeneral
                            user={user}
                            pendingFetchGeneral={pendingFetchGeneral}
                            errorMessage={errorMessage}
                            generalMenu={generalMenu}
                        />
                    </Col>
                    <Col xs={24} md={16}>
                        <UserTabs
                            orders={orders}
                            pendingFetchOrders={pendingFetchOrders}
                            transactions={transactions}
                            pendingFetchTransactions={pendingFetchTransactions}
                        />
                    </Col>
                </Row>
            </div>
        )
    }
}

export default President;