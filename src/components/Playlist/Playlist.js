import React, { Component } from 'react';
import '../../styling/Playlist.sass';

class Playlist extends Component {
    render() {
      let playlist = this.props.playlist;
      return(
        <div className='playlist-grid'>
          <img src={playlist.images[0].url}
              className='album-cover'
              alt='Album Cover'/>
          <h3>{playlist.name}</h3>
        </div>
      );
    }
}

export default Playlist;