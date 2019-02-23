import React, { Component } from 'react';

// npm Package that is capable of parsing query strings, such as ones in the URL 
import queryString from 'query-string';

/**
 * Public Spotify Web API Wrapper
 * Includes helper functions for all Spotify endpoints
 * Source: https://github.com/JMPerez/spotify-web-api-js
 */
import SpotifyWebApi from 'spotify-web-api-js';

import Track from '../Track';

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

    this.state = {
      playlist: '',
      playlistTracks: ''
    }
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

  componentDidMount() {
    this.setState({
      playlist: this.props.location.state.playlist
    })
    this.getPlaylist();
  };

  getPlaylist() {
    spotify.getPlaylistTracks(this.state.playlist.id).then(result => {
      this.setState({
        playlistTracks: result.items
      });
    });
  };

  render() {
    let playlist = this.state.playlist;
    return(
      <div>
        {playlist && this.getPlaylist()}
        {playlist &&
          <div>
            <h1>{playlist.name}</h1>
            <br/>
          </div>}
        {playlist && this.state.playlistTracks && 
          this.state.playlistTracks.map((track, index) =><Track post={track.track} index={index}/>)}
      </div>
    );
  }
}

export default Playlist;