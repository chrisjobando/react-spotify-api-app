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
            className='album-cover2'
            alt='Album Cover'/>
        </NavLink>
        <br/>
        {!this.props.current && <h3 className="album-name" style={{fontWeight: '500'}}>{album.name}</h3>}
        {this.props.current && this.props.current.uri!==album.uri && <h3 className="album-name" style={{fontWeight: '500'}}>{album.name}</h3>}
        {this.props.current && this.props.current.uri===album.uri && <h3 className="album-name" style={{color: 'rgb(255, 202, 58)', fontWeight: '500'}}>{album.name}</h3>}
       <h5>{album.release_date.substring(0,4)}</h5>
      </div>
    );
  }
}

export default Album;