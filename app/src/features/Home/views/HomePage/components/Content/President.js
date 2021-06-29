import React, {Component} from 'react';
import {Link} from "react-router-dom";
import svg_content from "../../../../../../images/home/content.svg"

class President extends Component {
    render() {
        return (
            <div className="home-page-wrapper content-wrapper" style={{backgroundImage: `url(${svg_content})`}}>
                <div className="home-content">
                    <div className="title-wrapper">
                        <h1 className="title-h1"><span>丰富的特色展台</span></h1>
                        <div className="title-content">
                            <span>特色展台包括 Ant Design 、AntV、AntG、Egg 等明星产品，更有产品专家</span>
                        </div>
                        <div className="title-content">
                            <span>现场问诊，为你答疑解难</span></div>
                    </div>
                    <div className="content-button">
                        <Link to="#" className="ant-btn button"><span>立即报名</span></Link>
                    </div>
                </div>
            </div>
        )
    }
}

export default President;