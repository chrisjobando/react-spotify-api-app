import React, { Component } from 'react';
import {NavLink} from 'react-router-dom';
import '../../styling/Playlist.sass';

// npm Package that is capable of parsing query strings, such as ones in the URL 
import queryString from 'query-string';

/**
 * Public Spotify Web API Wrapper
 * Includes helper functions for all Spotify endpoints
 * Source: https://github.com/JMPerez/spotify-web-api-js
 */
import SpotifyWebApi from 'spotify-web-api-js';

// Instantiates the wrapper
const spotify = new SpotifyWebApi();

class Playlist extends Component {
  constructor() {
    super();
    const params = this.getHashParams();
    const token = params.access_token;
    if (token) {
        spotify.setAccessToken(token);
    };
  };

  /**
   * @author: Christopher Obando
   * From: https://www.npmjs.com/package/query-string
   * Obtains parameters from the URL
   * @return Object with all querys
   */
  getHashParams() {
      let parsed = queryString.parse(window.location.search);
      return parsed;
  };

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
        <button onClick={() => spotify.play({context_uri: playlist.uri})}>{playlist.name}</button>
      </div>
    );
  }
}

export default Playlist;