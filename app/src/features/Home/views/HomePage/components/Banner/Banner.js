import React, {Component} from "react";
import banner_background from '../../../../../../images/home/banner_background_2.jpg'
import banner_title from "../../../../../../images/home/banner_title.png"

class Banner extends Component {
    render() {
        return (
            <div className="home-banner" style={{backgroundImage: `url(${banner_background})`}}>
                <div className="banner-content-wrapper">
                    <div className="banner-title">
                        <img src={banner_title} alt=""/>
                    </div>
                    <div className="banner-content">
                        <span>SSC MIX for work</span>
                    </div>
                </div>
            </div>
        );
    }
}

export default Banner