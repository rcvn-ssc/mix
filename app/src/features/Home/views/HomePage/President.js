import React, {Component} from 'react';
import {Banner, Teams, Content} from "./components";

class President extends Component {
    render() {
        return (
            <div className="features feature-home">
                <Banner/>
                <Teams {...this.props}/>
                <Content/>
            </div>
        );
    }
}

export default President;