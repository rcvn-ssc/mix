import React, {Component} from "react";
import Header             from '../Header'
import Footer             from '../Footer'
import background         from "../../images/auth/background.svg";

class President extends Component {
    render() {
        return (
            <div className="app" style={{backgroundImage: `url(${background})`}}>
                <Header/>
                {this.props.children}
                <Footer/>
            </div>
        );
    }
}

export default President