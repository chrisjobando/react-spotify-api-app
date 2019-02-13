import React, { Component } from 'react';
import '../styling/Playlist.sass';

class Playlist extends Component {
    render() {
      let playlist = this.props.playlist;
      return(
        <div className='playlist-grid'>
          <img src={playlist.imageUrl}
              className='album-cover'
              alt='Album Cover'/>
          <h3>{playlist.name}</h3>
          {/* <ul>
            {playlist.songs.map(song =>
              <li>{song.name}</li>)}
          </ul> */}
        </div>
      );
    }
}

export default Playlist;