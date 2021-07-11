import React, {Component} from 'react';
import {Button, Card, Col, Form, Input, Row, Transfer} from "antd";
import {Loading, ModalConfirm} from "../../../../layouts";
import {ShoppingOutlined} from "@ant-design/icons";

class President extends Component {
    render() {
        const {users, pendingFetch, pendingOrderMulti}                                                 = this.props;
        const {onChange, onChangeAmount, onChangeDescription, getNoteCashIn, onFinish, onCancel, onOk} = this.props;
        const {targetKey, amount, description, modalVisible}                                           = this.props;
        const data                                                                                     = [];
        for (let i = 0; i < users.length; i++) {
            data.push({
                key      : users[i].username,
                full_name: users[i].full_name,
            });
        }
        const notAllow = targetKey.length === 0 || amount <= 0;
        return (
            <div className="features feature-order-lunch">
                <div className="order-lunch-create">
                    <Card
                        title={
                            <div>
                                <ShoppingOutlined/> Order lunch
                            </div>
                        }
                    >
                        <Form
                            className="ant-form ant-form-vertical order-lunch-form"
                            onFinish={() => onFinish()}
                        >
                            <Row gutter={24}>
                                <Col xs={24} md={12}>
                                    <Form.Item name="amount">
                                        <Input
                                            type="number"
                                            value={amount}
                                            onChange={event => onChangeAmount(event)}
                                            placeholder="Amount"
                                            size="large"
                                        />
                                    </Form.Item>
                                    <Form.Item name="description">
                                        <Input
                                            value={description}
                                            onChange={event => onChangeDescription(event)}
                                            placeholder="Description"
                                            size="large"
                                        />
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row className="order-lunch-form-transfer">
                                <Col xs={24} md={24}>
                                    {
                                        pendingFetch === true
                                            ? <Loading/>
                                            : <Transfer
                                                dataSource={data}
                                                targetKeys={targetKey}
                                                onChange={onChange}
                                                oneWay={true}
                                                showSelectAll={true}
                                                render={user => user.full_name}
                                                listStyle={{
                                                    width : '100%',
                                                    height: 500,
                                                }}
                                            />
                                    }
                                </Col>
                            </Row>
                            <Row>
                                <Col xs={{span: 24, offset: 0}} md={{span: 8, offset: 8}} className="button-order">
                                    <Form.Item>
                                        <Button type="primary"
                                                htmlType="submit"
                                                size="large"
                                                disabled={notAllow}
                                                loading={pendingOrderMulti}
                                                block
                                        >
                                            Order Lunch
                                        </Button>
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row>
                                <div className="note-cash-in">
                                    {getNoteCashIn()}
                                </div>
                            </Row>
                        </Form>
                    </Card>
                    <ModalConfirm
                        visible={modalVisible}
                        onCancel={onCancel}
                        onOk={onOk}
                        message="Are you sure ?"
                    />
                </div>
            </div>
        )
    }
}

export default President;