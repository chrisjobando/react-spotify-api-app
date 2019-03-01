import React, { Component } from 'react';
import {NavLink} from 'react-router-dom';
import FontAwesome from 'react-fontawesome';
import '../../styling/Playlist.sass';

class Playlist extends Component {
  render() {
    let playlist = this.props.playlist;
    return(
      <div className='playlist-grid' key={playlist.id}>
        <NavLink to={{pathname:"/playlist_details",
          state:{playlist: playlist}, search: window.location.search}}>
          <img src={playlist.images[0].url}
            className='playlist-cover'
            alt='Album Cover'/>
        </NavLink>
        <br/>
        {!this.props.current && <h3 className="playlist-name" style={{fontWeight: '500'}}>{playlist.name}</h3>}
        {this.props.current && this.props.current.external_urls.spotify!==playlist.external_urls.spotify &&
          <h3 className="playlist-name" style={{fontWeight: '500'}}>{playlist.name}</h3>}
        {this.props.current && this.props.current.external_urls.spotify===playlist.external_urls.spotify &&
          <h3 className="playlist-name" style={{fontWeight: '500'}}><FontAwesome style={{marginRight: '5px'}} name="volume-up"/>{playlist.name}</h3>}
      </div>
    );
  }
}

export default Playlist;