import React, { Component } from 'react';
import FontAwesome from 'react-fontawesome';

class FollowerCounter extends Component {
    render () {
        return(
        <div>
            <h2>
                <FontAwesome name='user' style={{marginRight: '10px'}} />
                {this.props.followers} followers
            </h2>
        </div>
        );
    }
}

export default FollowerCounter;
