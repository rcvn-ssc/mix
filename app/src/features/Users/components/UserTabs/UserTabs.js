import React, {Component} from 'react';
import {Tabs} from "antd";
import {CreditCardOutlined, ShoppingCartOutlined} from "@ant-design/icons";
import ListTransactions from "./ListTransactions";
import ListOrders from "./ListOrders";

class UserTabs extends Component {
    formatCreatedAt = (created_at) => {
        const date = new Date(created_at)
        let result = date.toDateString()
        if (created_at === null || result === 'Invalid Date') {
            result = "Not found created time"
        }
        return result;
    }

    render() {
        const orders                   = this.props.orders;
        const pendingFetchOrders       = this.props.pendingFetchOrders;
        const transactions             = this.props.transactions;
        const pendingFetchTransactions = this.props.pendingFetchTransactions;
        return (
            <Tabs className="user-tabs">
                <Tabs.TabPane tab={<span><CreditCardOutlined/> Transactions</span>}
                              key="tab-transactions" className="tab-item">
                    <ListTransactions
                        pending={pendingFetchTransactions}
                        dataSource={transactions}
                        formatCreatedAt={this.formatCreatedAt}
                    />
                </Tabs.TabPane>
                <Tabs.TabPane tab={<span><ShoppingCartOutlined/> Orders</span>}
                              key="tab-orders" className="tab-item">
                    {
                        <ListOrders
                            pending={pendingFetchOrders}
                            dataSource={orders}
                            formatCreatedAt={this.formatCreatedAt}
                        />
                    }

                </Tabs.TabPane>
            </Tabs>
        )
    }
}

export default UserTabs