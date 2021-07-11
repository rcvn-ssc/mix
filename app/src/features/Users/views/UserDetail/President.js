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
                  generalMenu,
                  onChangePasswordOld,
                  onChangePasswordNew,
                  onChangePasswordConfirm,
                  changePasswordPending,
                  changePasswordDisabled,
                  onFinish,
                  onCancel,
                  onOk,
                  modalVisible,
                  isAuthUser,
                  helperMessage,
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
                            onChangePasswordOld={onChangePasswordOld}
                            onChangePasswordNew={onChangePasswordNew}
                            onChangePasswordConfirm={onChangePasswordConfirm}
                            changePasswordPending={changePasswordPending}
                            changePasswordDisabled={changePasswordDisabled}
                            onFinish={onFinish}
                            onCancel={onCancel}
                            onOk={onOk}
                            modalVisible={modalVisible}
                            isAuthUser={isAuthUser}
                            helperMessage={helperMessage}
                        />
                    </Col>
                </Row>
            </div>
        )
    }
}

export default President;