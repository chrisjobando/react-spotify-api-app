import React, { Component } from 'react';
import FontAwesome from 'react-fontawesome';

class FollowerCounter extends Component {
    render () {
        return(
        <div>
            <h2>
                <FontAwesome name='user' size='1x'style={{marginRight: '10px'}} />
                {this.props.followers} followers
            </h2>
        </div>
        );
    }
}

export default FollowerCounter;
