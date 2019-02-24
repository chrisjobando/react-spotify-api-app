import React, { Component } from 'react';
import {NavLink} from 'react-router-dom';
import '../styling/Album.sass';

class Album extends Component {
  render() {
    let album = this.props.album;
    return(
      <div className='album-grid' key={album.id}>
        <NavLink to={{pathname:"/album_details",
          state:{album: album}, search: window.location.search}}>
          <img src={album.images[0].url}
            className='album-cover'
            alt='Album Cover'/>
        </NavLink>
        <br/>
       <h3 style={{fontWeight: '500'}}>{album.name}</h3>
      </div>
    );
  }
}

export default Album;