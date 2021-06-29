import React, {Component} from 'react';
import {Modal} from 'antd';

class CustomComponent extends Component {
    render() {
        const {onOk, onCancel, visible, message} = this.props;
        return (
            <Modal
                title="Confirm"
                onOk={onOk}
                onCancel={onCancel}
                visible={visible}
            >
                <p>{message}</p>
            </Modal>
        )
    }
}

export default CustomComponent