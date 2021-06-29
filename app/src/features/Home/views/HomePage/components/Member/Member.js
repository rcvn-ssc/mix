import React, {Component} from 'react';
import member_image_default from "../../../../../../images/users/user.png";
import {Link} from "react-router-dom";

class Member extends Component {
    render() {
        const user = this.props.user;
        return (
            <div className="ant-row member">
                <div className="ant-col ant-col-7">
                    <Link to={'/users/' + user.username}>
                        <div className="member-image">
                            <img src={member_image_default} alt={user.username}/>
                        </div>
                    </Link>
                </div>
                <div className="ant-col ant-col-17">
                    <div className="member-description-wrapper">
                        <Link to={'/users/' + user.username}>
                            <div className="member-username">
                                {user.full_name}
                            </div>
                        </Link>
                        <div className="member-title">{user.username}</div>
                        <div className="member-description">{user.role === 'admin' ? 'Admin' : 'Member'}</div>
                        <div className="member-description">SSC Lunch Group</div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Member;