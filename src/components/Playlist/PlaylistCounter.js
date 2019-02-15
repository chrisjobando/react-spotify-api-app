import React, { Component } from 'react';
import '../../styling/PlaylistCounter.sass';
import FontAwesome from 'react-fontawesome';

class PlaylistCounter extends Component {
    render () {
        return(
        <div className='counterDisplay'>
            <h2>
                <FontAwesome name='music' size='1x'style={{marginRight: '10px'}} />
                {this.props.numPlaylists} playlists
            </h2>
        </div>
        );
    }
}

export default PlaylistCounter;
