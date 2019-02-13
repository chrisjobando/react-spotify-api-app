import React, { Component } from 'react';

class FollowerCounter extends Component {
    render () {
        return(
        <div>
            <h2>
                <i className="fas fa-user"></i>
                {this.props.followers} followers
            </h2>
        </div>
        );
    }
}

export default FollowerCounter;
