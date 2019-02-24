import React, { Component } from 'react';
import {NavLink} from 'react-router-dom';
import '../../styling/Playlist.sass';

class Playlist extends Component {
  render() {
    let playlist = this.props.playlist;
    return(
      <div className='playlist-grid' key={playlist.id}>
        <NavLink to={{pathname:"/playlist_details",
          state:{playlist: playlist}, search: window.location.search}}>
          <img src={playlist.images[0].url}
            className='album-cover'
            alt='Album Cover'/>
        </NavLink>
        <br/>
       <h3 style={{fontWeight: '500'}}>{playlist.name}</h3>
      </div>
    );
  }
}

export default Playlist;