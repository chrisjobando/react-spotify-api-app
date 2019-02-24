import React, { Component } from 'react';
import {NavLink} from 'react-router-dom';
import FontAwesome from 'react-fontawesome';
import Filter from './Filter';

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
        setInterval(() => this.getArtist(), 100);
        setInterval(() => this.getTopTracks(), 1000);
    };

    getArtist() {
        spotify.getArtist(this.props.location.state.artist.id).then(result => {
            this.setState({
                artist: result
            });
        });
    };

    getTopTracks() {
        spotify.getArtistTopTracks(this.state.artist.id, 'ES', {limit: 25}).then(result => {
            this.setState({
                artistTracks: result.tracks
            });
        });
    };

  render() {
    let tracksToRender = this.state.artist &&
      this.state.artistTracks
      ? this.state.artistTracks.filter(track => {
        let matchesTrack = track.name.toLowerCase().includes(
          this.state.filterString.toLowerCase());
        return matchesTrack;
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
            <Filter placeholder={"Search for a track..."} onTextChange={text => this.setState({filterString: text})}/>
            {/* <button onClick={() => spotify.play({context_uri: artist.uri})} className="play">
            <FontAwesome name='random'/> Shuffle artist
            </button> */}
            <h1>Most Popular Tracks:</h1>
          </div>}
        {!this.state.artistTracks && <h1>Loading...</h1>}
        {artist && this.state.artistTracks && 
          tracksToRender.map((track, index) =>
            <div className="list">
                <div key={track.id}>
                    <span className="info-topTrack">
                        <NavLink to={{pathname:"/album_details",
                            state:{album: track.album}, search: window.location.search}}>
                            <img src={track.album.images[0].url}
                                className='album-cover' alt='album-cover'/>
                        </NavLink>
                        <button onClick={() => spotify.play({context_uri: track.album.uri, offset: {uri: track.uri}})}>
                            <span style={{fontWeight: 600}}>{index+1}. </span>
                            {track.name}<br/>
                        </button>
                    </span>
                </div>
            </div>)}
      </div>
    );
  }
}

export default ArtistPage;