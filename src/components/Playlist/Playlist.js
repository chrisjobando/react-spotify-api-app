import React, { Component } from 'react';
import '../../styling/Playlist.sass';

class Playlist extends Component {
    render() {
      let playlist = this.props.playlist;
      return(
        <div className='playlist-grid'>
          <a href={playlist.external_urls.spotify}
            target="_blank" rel="noopener noreferrer">
              <img src={playlist.images[0].url}
                className='album-cover'
                alt='Album Cover'/>
          </a>
          <h3>{playlist.name}</h3>
        </div>
      );
    }
}

export default Playlist;