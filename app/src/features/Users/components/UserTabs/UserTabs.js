import React, {Component} from 'react';
import {Tabs} from "antd";
import {CreditCardOutlined, ShoppingCartOutlined, LockOutlined} from "@ant-design/icons";
import ListTransactions from "./ListTransactions";
import ListOrders from "./ListOrders";
import Password from "./Password";
import moment from 'moment'

class UserTabs extends Component {
    formatCreatedAt = (created_at) => {
        const date = moment(created_at)
        let result = date.format('YYYY-MM-DD HH:mm:ss')
        if (created_at === null || result === 'Invalid date') {
            result = "Not found created time"
        }
        return result;
    }

    render() {
        const {
                  orders,
                  pendingFetchOrders,
                  transactions,
                  pendingFetchTransactions,
                  isAuthUser,
                  onChangePasswordOld,
                  onChangePasswordNew,
                  onChangePasswordConfirm,
                  onCancel,
                  onOk,
                  onFinish,
                  modalVisible,
                  changePasswordPending,
                  changePasswordDisabled,
                  helperMessage,
              } = this.props;
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
                {isAuthUser ?
                    <Tabs.TabPane tab={<span><LockOutlined/> Password</span>}
                                  key="tab-information" className="tab-item">
                        <Password
                            onChangePasswordOld={onChangePasswordOld}
                            onChangePasswordNew={onChangePasswordNew}
                            onChangePasswordConfirm={onChangePasswordConfirm}
                            changePasswordPending={changePasswordPending}
                            changePasswordDisabled={changePasswordDisabled}
                            onCancel={onCancel}
                            onOk={onOk}
                            onFinish={onFinish}
                            modalVisible={modalVisible}
                            helperMessage={helperMessage}
                        />
                    </Tabs.TabPane> : null}

            </Tabs>
        )
    }
}

export default UserTabs