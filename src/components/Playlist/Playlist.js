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
            className='playlist-cover'
            alt='Album Cover'/>
        </NavLink>
        <br/>
        {!this.props.current && <h3 className="playlist-name" style={{fontWeight: '500'}}>{playlist.name}</h3>}
        {this.props.current && this.props.current.uri!==playlist.uri && <h3 className="playlist-name" style={{fontWeight: '500'}}>{playlist.name}</h3>}
        {this.props.current && this.props.current.uri===playlist.uri && <h3 className="playlist-name" style={{color: 'rgb(255, 202, 58)', fontWeight: '500'}}>{playlist.name}</h3>}
      </div>
    );
  }
}

export default Playlist;