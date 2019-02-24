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
       <h3 style={{fontWeight: '500'}} className="album-name">{album.name}</h3>
       <h5>{album.release_date.substring(0,4)}</h5>
      </div>
    );
  }
}

export default Album;