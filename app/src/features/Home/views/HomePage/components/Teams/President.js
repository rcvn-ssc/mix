import React, {Component} from "react";
import {Member} from "../Member";
import {Loading, DataError} from "../../../../../../layouts";

class President extends Component {
    render() {
        return (
            <div className="home-page-wrapper teams-wrapper">
                <div className="home-teams">
                    <div className="title-wrapper">
                        <h1><span>Member</span></h1>
                    </div>
                    <div className="member-wrapper">
                        <div className="ant-row block-wrapper">
                            {
                                this.props.fetchUsersPending
                                    ? <Loading/>
                                    :
                                    (this.props.users.length ?
                                        this.props.users.map((user, i) => {
                                            return (
                                                <div key={i} className="ant-col block ant-col-xs-24 ant-col-md-8">
                                                    <Member user={user}/>
                                                </div>
                                            )
                                        }) : <DataError/>)
                            }
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default President;