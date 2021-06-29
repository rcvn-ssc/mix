import React, {Component} from 'react';

class DataEmpty extends Component {
    render() {
        return (
            <div className="empty-wrapper">
                <div className="empty-title">
                    Empty data
                </div>
                <div className="empty-description">
                    Please try again
                </div>
            </div>
        )
    }
}

export default DataEmpty;
