import React, { Component } from 'react';
import FontAwesome from 'react-fontawesome';

import '../../styling/PlaylistCounter.sass';

class PlaylistCounter extends Component {
    render () {
        return(
        <div className='counterDisplay'>
            <h2>
                <FontAwesome name='music' style={{marginRight: '10px'}} />
                {this.props.numPlaylists} playlists
            </h2>
        </div>
        );
    }
}

export default PlaylistCounter;