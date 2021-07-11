import React, {Component} from 'react';
import {Button, Card, Col, Form, Input, Row, Select} from "antd";
import {ModalConfirm} from "../../../../layouts";
import {CreditCardOutlined} from "@ant-design/icons";
import {UserGeneral} from "../../../Users/components";

const {Option} = Select;

class President extends Component {
    render() {
        const {users, user, pendingFetchGeneral, pendingFetchUsers, pendingTransactionCreate}         = this.props;
        const {onChange, onChangeAmount, onChangeDescription, getNotePayIn, onFinish, onCancel, onOk} = this.props;
        const {username, amount, description, modalVisible}                                           = this.props;

        const notAllow = username === null || user === null || amount <= 0;
        return (
            <div className="features feature-transactions">
                <div className="transactions-create">
                    <Row gutter={24}
                         className="user-detail">
                        <Col xs={24} md={8}>
                            <UserGeneral
                                user={user}
                                pendingFetchGeneral={pendingFetchGeneral}
                            />
                        </Col>
                        <Col xs={24} md={16}>
                            <Card
                                title={
                                    <div>
                                        <CreditCardOutlined/> Pay in
                                    </div>
                                }
                            >
                                <Form
                                    className="pay-in-form"
                                    onFinish={() => onFinish()}
                                >
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

                                    <Form.Item>
                                        <Select
                                            loading={pendingFetchUsers}
                                            size="large"
                                            showSearch
                                            style={{width: '100%'}}
                                            placeholder="Select a user"
                                            optionFilterProp="children"
                                            onChange={onChange}
                                            filterOption={(input, option) =>
                                                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                            }
                                        >
                                            {
                                                users.map((user, key) => {
                                                    return (<Option key={key}
                                                                    value={user.id}>{user.full_name}</Option>)
                                                })
                                            }
                                        </Select>
                                    </Form.Item>
                                    <Form.Item>
                                        <Button type="primary"
                                                htmlType="submit"
                                                size="large"
                                                disabled={notAllow}
                                                loading={pendingTransactionCreate}
                                                block
                                        >
                                            Pay in
                                        </Button>
                                    </Form.Item>
                                    <div className="note-cash-in">
                                        {getNotePayIn()}
                                    </div>
                                </Form>
                            </Card>
                        </Col>
                    </Row>
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