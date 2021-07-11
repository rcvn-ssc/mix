import React, {Component} from 'react';
import {Button, Card, Form, Input, Select} from "antd";
import {ModalConfirm} from "../../../../layouts";

class Password extends Component {
    render() {
        const {changePasswordPending, changePasswordDisabled, modalVisible, helperMessage} = this.props;

        const {
                  onCancel,
                  onOk,
                  onFinish,
                  onChangePasswordOld,
                  onChangePasswordNew,
                  onChangePasswordConfirm,
              } = this.props;
        return (
            <div className="data-list password">
                <Card>
                    <Form
                        className="account-form"
                        onFinish={() => onFinish()}
                    >
                        <Form.Item name="password_old">
                            <Input
                                type="password"
                                onChange={event => onChangePasswordOld(event)}
                                placeholder="Password old"
                                size="large"
                            />
                        </Form.Item>
                        <Form.Item name="password_new">
                            <Input
                                type="password"
                                onChange={event => onChangePasswordNew(event)}
                                placeholder="Password new"
                                size="large"
                            />
                        </Form.Item>
                        <Form.Item name="password_new_confirm">
                            <Input
                                type="password"
                                onChange={event => onChangePasswordConfirm(event)}
                                placeholder="Confirm password new"
                                size="large"
                            />
                        </Form.Item>

                        <Form.Item>
                            <Button type="primary"
                                    htmlType="submit"
                                    size="large"
                                    disabled={changePasswordDisabled}
                                    loading={changePasswordPending}
                                    block
                            >
                                Change password
                            </Button>
                        </Form.Item>
                        <div className="helper-message">
                            {helperMessage}
                        </div>
                    </Form>
                </Card>
                <ModalConfirm
                    visible={modalVisible}
                    onCancel={onCancel}
                    onOk={onOk}
                    message="Are you sure ?"
                />
            </div>
        )
    }
}

export default Password