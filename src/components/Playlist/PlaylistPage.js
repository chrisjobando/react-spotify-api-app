import React, { Component } from 'react';
import FontAwesome from 'react-fontawesome';
import {NavLink} from 'react-router-dom';

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

class PlaylistPage extends Component {
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
      playlistTracksToAdd: '',
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
    setInterval(() => this.getMorePlaylist(), 300);
  };

  /**
   * @author: Christopher Obando
   * Uses getPlaylistTracks() method from Spotify wrapper to return first 100 tracks
   * in a playlist, given its ID
   */
  getPlaylist() {
    spotify.getPlaylistTracks(this.state.playlist.id).then(result => {
      this.setState({
        playlistTracks: result.items
      });
    });
  };

  /**
   * @author: Christopher Obando
   * Uses getPlaylistTracks() method from Spotify Wrapper to return up to 100 tracks
   * in a playlist, starting from next available track to load (given playlist ID)
   * This method is necessary because the API only returns 100 tracks at a time
   */
  getMorePlaylist() {
    spotify.getPlaylistTracks(this.state.playlist.id, {limit: 100, offset: this.state.playlistTracks.length})
      .then(result => {
        this.setState({
          playlistTracksToAdd: result.items
        })
    })
  }

  checkUpdate() {
    if (this.state.playlistTracksToAdd.length > 0) {
      this.setState({playlistTracks: [...this.state.playlistTracks, ...this.state.playlistTracksToAdd]});
      this.setState({playlistTracksToAdd: ''})
    }
  }

  /**
   * From: https://stackoverflow.com/questions/21294302/converting-milliseconds-to-minutes-and-seconds-with-javascript
   * Method to turn track.duration_ms into minutes:seconds for display
   * @param millis time in ms to convert to minutes and seconds 
   */
  millisToMinutesAndSeconds(millis) {
    let minutes = Math.floor(millis / 60000);
    let seconds = ((millis % 60000) / 1000).toFixed(0);
    return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
  }

  render() {
    let tracksToRender = this.state.playlist &&
      this.state.playlistTracks
      ? this.state.playlistTracks.filter(track => {
        let matchesTrack = track.track.name.toLowerCase().includes(
          this.state.filterString.toLowerCase()) || track.track.artists[0].name.toLowerCase().includes(
            this.state.filterString.toLowerCase()) || track.track.album.name.toLowerCase().includes(
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
            <h2>Created by <a href={playlist.owner.external_urls.spotify} target="_blank" rel="noopener noreferrer">{playlist.owner.display_name}</a></h2>
            <h2>{playlist.tracks.total} songs</h2>
            <br/>
            <Filter placeholder={"Search for a track, album, or artist..."} onTextChange={text => this.setState({filterString: text})}/>
          </div>}
        {playlist && !this.state.playlistTracks && this.getPlaylist()}
          <button onClick={() => {
            spotify.play({context_uri: playlist.uri});
            spotify.setShuffle(true);}} className="play">
            <FontAwesome name='random'/> Shuffle Playlist
          </button>
          {playlist && playlist.tracks.total > this.state.playlistTracks.length
          && <h1 style={{margin: 0, fontWeight: 500}}>Loading...</h1>}
        {playlist && this.state.playlistTracks &&  playlist.tracks.total===this.state.playlistTracks.length &&
          tracksToRender.map((track, index) =>
            <div className="list">
              <div key={track.id}>
                {this.props.state.current && this.props.state.current.id===track.track.id &&
                  <button onClick={() => {
                    spotify.play({context_uri: playlist.uri, offset: {uri: track.track.uri}});
                    spotify.setShuffle(false);
                  }}>
                    <span style={{color: 'rgb(138, 201, 38)', fontWeight: 600}}>{index+1}. </span>
                    <span style={{color: 'rgb(138, 201, 38)'}}>{track.track.name} {track.track.explicit && <FontAwesome name="exclamation-circle">E</FontAwesome>}</span>
                  </button>}
                {!this.props.state.current &&
                  <button onClick={() => {
                    spotify.play({context_uri: playlist.uri, offset: {uri: track.track.uri}});
                    spotify.setShuffle(false);
                  }}>
                    <span style={{fontWeight: 600}}>{index+1}. </span>
                    {track.track.name} {track.track.explicit && <FontAwesome name="exclamation-circle">E</FontAwesome>}
                  </button>}
                {this.props.state.current && this.props.state.current.id!==track.track.id &&
                  <button onClick={() => {
                    spotify.play({context_uri: playlist.uri, offset: {uri: track.track.uri}});
                    spotify.setShuffle(false);
                  }}>
                    <span style={{fontWeight: 600}}>{index+1}. </span>
                    {track.track.name} {track.track.explicit && <FontAwesome name="exclamation-circle">E</FontAwesome>}
                  </button>}
                <span style={{float: 'right'}}>
                  {this.millisToMinutesAndSeconds(track.track.duration_ms)}
                </span>
                <div className="under-title">
                  <span><NavLink to={{pathname:"/artist_details", state:{artist: track.track.artists[0]}, search: window.location.search}}>
                    {track.track.artists[0].name}</NavLink></span>
                  <span style={{marginRight: '15px'}}> - <NavLink to={{pathname:"/album_details", state:{album: track.track.album}, search: window.location.search}}>
                    {track.track.album.name}</NavLink></span>
                </div>
              </div>
            </div>)}
            {playlist && this.state.playlistTracksToAdd.length > 0 && this.checkUpdate()}
         </div>
    );
  }
}

export default PlaylistPage;