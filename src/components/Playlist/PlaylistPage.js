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
import Filter from '../Filter';

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
      playlistTracks: '',
      filterString: '',
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
    setInterval(() => this.getPlaylist(), 1000);
  };

  getPlaylist() {
    spotify.getPlaylistTracks(this.state.playlist.id).then(result => {
      this.setState({
        playlistTracks: result.items
      });
    });
  };

  render() {
    let playlistsToRender = this.state.playlist &&
      this.state.playlistTracks
      ? this.state.playlistTracks.filter(track => {
        let matchesTrack = track.track.name.toLowerCase().includes(
          this.state.filterString.toLowerCase());
        return matchesTrack;
      }) : [];

    let playlist = this.state.playlist;
    return(
      <div>
        {playlist &&
          <div>
            <h1>{playlist.name}</h1>
            <br/>
            <Filter placeholder={"Search for a track..."} onTextChange={text => this.setState({filterString: text})}/>
            <br/>
          </div>}
        {!this.state.playlistTracks && <h1>Loading...</h1>}
        {playlist && this.state.playlistTracks && 
          playlistsToRender.map((track, index) =><Track post={track.track} index={index}/>)}
      </div>
    );
  }
}

export default Playlist;