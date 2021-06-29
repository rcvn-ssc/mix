import React, {Component} from 'react';
import {Link} from "react-router-dom"
import { Result, Button } from 'antd';

class CustomComponent extends Component {
    render() {
        const code = this.props.code
        return (
            <Result
                status={code}
                title={code}
                subTitle="Sorry, you are not authorized to access this page."
                extra={
                    <Button type="primary">
                        <Link to='/'>
                            Back Home
                        </Link>
                    </Button>
                }
            />
        )
    }
}

export default CustomComponent