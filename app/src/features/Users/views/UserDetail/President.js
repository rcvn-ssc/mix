import React, {Component} from 'react';
import {UserGeneral, UserTabs} from "../../components";
import {
    Row,
    Col,
} from 'antd';

class President extends Component {
    render() {
        const {
            user,
            pendingFetchGeneral,
            orders,
            pendingFetchOrders,
            transactions,
            pendingFetchTransactions,
            generalMenu
        } = this.props
        return (
            <div className="features feature-user">
                <Row gutter={24}>
                    <Col xs={24} md={8}>
                        <UserGeneral
                            user={user}
                            pendingFetchGeneral={pendingFetchGeneral}
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