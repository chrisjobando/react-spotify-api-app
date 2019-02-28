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

import Filter from './Filter';

// Styling
import '../styling/AlbumPage.sass';

// Instantiates the wrapper
const spotify = new SpotifyWebApi();

class AlbumPage extends Component {
  constructor() {
    super();
    const params = this.getHashParams();
    const token = params.access_token;
    if (token) {
      spotify.setAccessToken(token);
    };

    this.state = {
      album: '',
      albumTracks: '',
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
      album: this.props.location.state.album
    })
    this.getAlbum();
    setInterval(() => this.getAlbum(), 100);
  };

  /**
   * @author: Christopher Obando
   * Uses getAlbumTracks() method from spotify wrapper to get up to 50 tracks from an album
   */
  getAlbum() {
    spotify.getAlbumTracks(this.state.album.id, {limit: 50, include_groups: "album,single"}).then(result => {
      this.setState({
        albumTracks: result.items
      });
    });
  };

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
    let tracksToRender = this.state.album &&
      this.state.albumTracks
      ? this.state.albumTracks.filter(track => {
        let matchesTrack = track.name.toLowerCase().includes(
          this.state.filterString.toLowerCase());
        return matchesTrack;
      }) : [];

    let album = this.state.album;
    return(
      <div>
        {album &&
          <div>
            <img src={album.images[0].url}
                className='cover' alt='album-cover'/>
            <h1>{album.name}</h1>
            <NavLink to={{pathname:"/artist_details",
                            state:{artist: album.artists[0]}, search: window.location.search}}>
              <span className="bold" style={{fontSize: '24px'}}> {album.artists[0].name}</span>
            </NavLink>
            <h3 style={{margin: 0, fontWeight: '400'}}>{album.release_date.substring(0,4)}</h3>
            <br/><br/>
            <Filter placeholder={"Search for a track..."} onTextChange={text => this.setState({filterString: text})}/>
            {this.props.state.playback.context && this.props.state.playback.context.uri===album.uri && <h1 style={{margin: 0, color: ' rgb(138, 201, 38)'}}>Currently Playing</h1>}
            <button onClick={() => {
              spotify.play({context_uri: album.uri});
              spotify.setShuffle(true);
              }} className="play">
            <FontAwesome name='random'/> Shuffle Album
            </button>
          </div>}
        {!this.state.albumTracks && <h1>Loading...</h1>}
        {album && this.state.albumTracks && 
          tracksToRender.map((track, index) =>
            <div className="list">
                <div key={track.id}>
                    <span className="info" style={{width: '100%'}}>
                    {!this.props.state.current &&
                        <button onClick={() => spotify.play({context_uri: track.album.uri, offset: {uri: track.uri}})}>
                            <span style={{fontWeight: 600}}>{index+1}. </span>
                            {track.name} {track.explicit && <FontAwesome name="exclamation-circle">E</FontAwesome>}
                        </button>}
                     {this.props.state.current && this.props.state.current.id===track.id &&
                      <button onClick={() => {
                          spotify.play({context_uri: album.uri, offset: {uri: track.uri}})
                          spotify.setShuffle(false)}}>
                        <span style={{color: 'rgb(138, 201, 38)', fontWeight: 600}}>{index+1}. </span>
                        <span style={{color: 'rgb(138, 201, 38)'}}>{track.name} {track.explicit && <FontAwesome name="exclamation-circle">E</FontAwesome>}</span>
                      </button>}
                    {this.props.state.current && this.props.state.current.id!==track.id &&
                      <button onClick={() => {
                          spotify.play({context_uri: album.uri, offset: {uri: track.uri}})
                          spotify.setShuffle(false)}}>
                        <span style={{fontWeight: 600}}>{index+1}. </span>
                        {track.name} {track.explicit && <FontAwesome name="exclamation-circle">E</FontAwesome>}
                      </button>}
                      <span style={{float: 'right', marginTop: '10px'}}>{this.millisToMinutesAndSeconds(track.duration_ms)}</span>
                    </span>
                </div>
            </div>)}
      </div>
    );
  }
}

export default AlbumPage;