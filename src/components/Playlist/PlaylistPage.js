import React, { Component } from 'react';
import {NavLink} from 'react-router-dom';
import FontAwesome from 'react-fontawesome';

// npm Package that is capable of parsing query strings, such as ones in the URL 
import queryString from 'query-string';

/**
 * Public Spotify Web API Wrapper
 * Includes helper functions for all Spotify endpoints
 * Source: https://github.com/JMPerez/spotify-web-api-js
 */
import SpotifyWebApi from 'spotify-web-api-js';

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
    setInterval(() => this.getPlaylist(), 100);
  };

  getPlaylist() {
    spotify.getPlaylistTracks(this.state.playlist.id).then(result => {
      this.setState({
        playlistTracks: result.items
      });
    });
  };

  render() {
    let tracksToRender = this.state.playlist &&
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
            <img src={playlist.images[0].url}
              className='cover' alt='album-cover'/>
            <h1>{playlist.name}</h1>
            <br/>
            <Filter placeholder={"Search for a track..."} onTextChange={text => this.setState({filterString: text})}/>
          </div>}
        {!this.state.playlistTracks && <h1>Loading...</h1>}
        {playlist && this.state.playlistTracks &&
          <div><button onClick={() => {
            spotify.play({context_uri: playlist.uri});
            spotify.setShuffle(true);
          }} className="play">
            <FontAwesome name='random'/> Shuffle Playlist
          </button></div>}
        {playlist && this.state.playlistTracks &&
          tracksToRender.map((track, index) =>
            <div className="list">
              <div key={track.id}>
                <span className="info-topTrack">
                  <NavLink to={{pathname:"/album_details",
                    state:{album: track.track.album}, search: this.props.location.search}}>
                    <img src={track.track.album.images[0].url}
                      className='album-cover' alt='album-cover'/>
                  </NavLink>
                  <span>
                    <button onClick={() => {
                      spotify.play({context_uri: playlist.uri, offset: {uri: track.track.uri}});
                      spotify.setShuffle(false);
                    }}>
                      <span style={{fontWeight: 600}}>{index+1}. </span>
                        {track.track.name}<br/>
                    </button>
                    <br/>
                    <NavLink to={{pathname:"/artist_details",
                      state:{artist: track.track.artists[0]}, search: this.props.location.search}}>
                      <span className="bold">{track.track.artists[0].name}</span>
                    </NavLink>
                  </span>
                </span>
              </div>
            </div>)}
      </div>
    );
  }
}

export default Playlist;