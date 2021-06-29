import React, {Component} from 'react';
import {Link} from "react-router-dom"
import {Form, Input, Button} from "antd";
import {UserOutlined, LockOutlined} from '@ant-design/icons';

class President extends Component {
    render() {
        const message = this.props.crud.message;
        return (
            <div className="feature-login">
                <div className="form-message">
                    {message}
                </div>
                <Form
                    className="ant-form ant-form-vertical"
                    onFinish={(data => this.props.handleLogin(data))}
                >
                    <Form.Item name="username">
                        <Input
                            prefix={<UserOutlined className="site-form-item-icon"/>}
                            placeholder="Username"
                            size="large"
                        />
                    </Form.Item>
                    <Form.Item name="password">
                        <Input.Password
                            prefix={<LockOutlined className="site-form-item-icon"/>}
                            type="password"
                            placeholder="Password"
                            size="large"
                        />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary"
                                htmlType="submit"
                                size="large"
                                disabled={this.props.crud.pending}
                                block>
                            Log in
                        </Button>
                    </Form.Item>
                </Form>
                <div className="form-option">
                    or <Link to={'/register'}>Register</Link>
                </div>
            </div>
        )
    }
}

export default President;