import React, { Component } from 'react';
import '../styling/PlaylistCounter.sass';


class PlaylistCounter extends Component {
    render () {
        return(
        <div className='counterDisplay'>
            <h2>
                <i className="fas fa-music"></i>
                {this.props.playlists.length} playlists
            </h2>
        </div>
        );
    }
}

export default PlaylistCounter;
