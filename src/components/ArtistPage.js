import React, { Component } from 'react';
import {NavLink} from 'react-router-dom';
// import FontAwesome from 'react-fontawesome';
import Album from './Album';

// npm Package that is capable of parsing query strings, such as ones in the URL 
import queryString from 'query-string';

/**
 * Public Spotify Web API Wrapper
 * Includes helper functions for all Spotify endpoints
 * Source: https://github.com/JMPerez/spotify-web-api-js
 */
import SpotifyWebApi from 'spotify-web-api-js';

// Styling
import '../styling/ArtistPage.sass';

// Instantiates the wrapper
const spotify = new SpotifyWebApi();

class ArtistPage extends Component {
    constructor() {
        super();
        const params = this.getHashParams();
        const token = params.access_token;
        if (token) {
            spotify.setAccessToken(token);
        };

        this.state = {
            artist: '',
            artistTracks: '',
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
        this.getArtist();
        this.getTopTracks();
        this.getAlbums();
        setInterval(() => this.getArtist(), 100);
        setInterval(() => this.getTopTracks(), 100);
        setInterval(() => this.getAlbums(), 100);
    };

    /**
     * @author: Christopher Obando
     * Fetches an artists info using the getArtist() method from the spotify wrapper,
     * given their ID
     */
    getArtist() {
        spotify.getArtist(this.props.location.state.artist.id).then(result => {
            this.setState({
                artist: result
            });
        });
    };

    /**
     * @author: Christopher Obando
     * Fetches an artists' top ten tracks given their ID and a marketplace
     */
    getTopTracks() {
        spotify.getArtistTopTracks(this.state.artist.id, 'US').then(result => {
            this.setState({
                artistTracks: result.tracks
            });
        });
    };

    /**
     * @author: Christopher Obando
     * Fetches an artists 50 most recent albums given their ID
     */
    getAlbums() {
      spotify.getArtistAlbums(this.state.artist.id, {limit: 50}).then(result => {
        this.setState({
          artistAlbums: result.items
        });
      });
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
    let albumsToRender = this.state.artist &&
      this.state.artistAlbums
      ? this.state.artistAlbums.filter(album => {
        let isAlbum = (album.album_type==="album")
        return isAlbum;
      }) : [];
    
    let restToRender = this.state.artist &&
      this.state.artistAlbums
      ? this.state.artistAlbums.filter(album => {
        let isNotAlbum = (album.album_type==="single")
        return isNotAlbum;
      }) : [];

    let artist = this.state.artist;
    return(
      <div>
        {artist &&
          <div>
            <img src={artist.images[0].url}
                className='artist-cover' alt='artist-cover'/>
            <a href={artist.external_urls.spotify}
              target="_blank" rel="noopener noreferrer">
                <h1>{artist.name}</h1>
            </a>
            <br/>
            {/* <button onClick={() => spotify.play({context_uri: artist.uri})} className="play">
            <FontAwesome name='random'/> Shuffle artist
            </button> */}
            <h1>Most Popular Tracks:</h1>
            <br/>
          </div>}
        {!this.state.artistTracks && <h1>Loading...</h1>}
        {artist && this.state.artistTracks && 
          this.state.artistTracks.map((track, index) =>
            <div className="list">
                <div key={track.id}>
                    <span className="info-topTrack">
                        <NavLink to={{pathname:"/album_details",
                            state:{album: track.album}, search: window.location.search}}>
                            <img src={track.album.images[0].url}
                                className='album-cover' alt='album-cover2'/>
                        </NavLink>


                        {this.props.state.current && this.props.state.current.id===track.id &&
                          <button onClick={() => {
                              spotify.play({context_uri: track.album.uri, offset: {uri: track.uri}})
                              spotify.setShuffle(false)}}>
                            <span style={{color: 'rgb(255, 202, 58)', fontWeight: 600}}>{index+1}. </span>
                            <span style={{color: 'rgb(255, 202, 58)'}}>{track.name}</span>
                          </button>}
                        {this.props.state.current && this.props.state.current.id!==track.id &&
                          <button onClick={() => {
                              spotify.play({context_uri: track.album.uri, offset: {uri: track.uri}})
                              spotify.setShuffle(false)}}>
                            <span style={{fontWeight: 600}}>{index+1}. </span>
                            {track.name}
                          </button>}





                        <span style={{float: 'right', marginTop: '20px'}}>{this.millisToMinutesAndSeconds(track.duration_ms)}</span>
                    </span>
                </div>
            </div>)}
            <h1>Albums</h1>
            <br/>
            {!this.state.artistAlbums && <h1>Loading...</h1>}
            {artist && this.state.artistAlbums && 
              albumsToRender.map((album) => <Album album={album} key={album.id}/>)}
            <h1>Singles and EPs</h1>
            <br/>
            {!this.state.artistAlbums && <h1>Loading...</h1>}
            {artist && this.state.artistAlbums && 
              restToRender.map((album) => <Album album={album} key={album.id}/>)}
      </div>
    );
  }
}

export default ArtistPage;