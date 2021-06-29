import React, {Component} from 'react';
import {Link}             from "react-router-dom";

class President extends Component {
    render() {
        return (
            <div className="home-page-wrapper footer-wrapper">
                <div className="footer">
                    <div className="ant-row home-page">
                        <div className="ant-col block ant-col-xs-24 ant-col-md-6">
                            <h2 className="logo"><img
                                src="https://zos.alipayobjects.com/rmsportal/qqaimmXZVSwAhpL.svg" alt="img" width="100%"/>
                            </h2>
                            <div className="slogan">
                                <div>
                                    <span>Animation specification and components of Ant Design.</span>
                                </div>
                            </div>
                        </div>
                        <div className="ant-col block ant-col-xs-24 ant-col-md-6">
                            <h2><span>产品</span></h2>
                            <div>
                                <Link to="/#">
                                    产品更新记录
                                </Link>
                                <Link to="/#">
                                    API文档
                                </Link>
                                <Link to="/#">
                                    快速入门
                                </Link>
                                <Link to="/#">
                                    参考指南
                                </Link>
                            </div>
                        </div>
                        <div className="ant-col block ant-col-xs-24 ant-col-md-6">
                            <h2><span>关于</span></h2>
                            <div>
                                <Link to="/#">
                                    FAQ
                                </Link>
                                <Link to="/#">
                                    联系我们
                                </Link>
                            </div>
                        </div>
                        <div className="ant-col block ant-col-xs-24 ant-col-md-6">
                            <h2><span>资源</span></h2>
                            <div>
                                <Link to="/#">
                                    Ant Design
                                </Link>
                                <Link to="/#">
                                    Ant Motion
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default President;