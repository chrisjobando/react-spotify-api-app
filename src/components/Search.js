import React, { Component } from 'react';
import {NavLink} from 'react-router-dom';
import Track from './Track';

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

class Search extends Component {
    constructor() {
        super();
        const params = this.getHashParams();
        const token = params.access_token;
        if (token) {
            spotify.setAccessToken(token);
        };
        this.state = {
            tracks: '',
            albums: '',
            artists: '',
            playlists: '',
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
        window.scrollTo(0,0);
        this.props.state.filterString = '';
        this.getSearchTracks();
        this.getSearchAlbums();
        this.getSearchArtists();
        this.getSearchPlaylists();
        setInterval(() => this.getSearchTracks(), 1000);
        setInterval(() => this.getSearchAlbums(), 1000);
        setInterval(() => this.getSearchArtists(), 1000);
        setInterval(() => this.getSearchPlaylists(), 1000);
    }

    getSearchTracks() {
        spotify.searchTracks(this.props.state.filterString, {market: "US", limit: 5}).then(result => {
            this.setState({
                tracks: result.tracks.items
            })
        })
    }

    getSearchAlbums() {
        spotify.searchAlbums(this.props.state.filterString, {market: "US", limit: 5}).then(result => {
            this.setState({
                albums: result.albums.items
            })
        })
    }

    getSearchArtists() {
        spotify.searchArtists(this.props.state.filterString, {market: "US", limit: 5}).then(result => {
            this.setState({
                artists: result.artists.items
            })
        })
    }

    getSearchPlaylists() {
        spotify.searchPlaylists(this.props.state.filterString, {market: "US", limit: 5}).then(result => {
            this.setState({
                playlists: result.playlists.items
            })
        })
    }


    render() {
        return(
        <div className="searchTab">
            {!this.props.state.filterString && <h2>This is currently very buggy and may crash, be warned!</h2>}
            {this.props.state.filterString && this.state.tracks &&
                <div>
                    <h1>Songs:</h1>
                    {this.state.tracks.map((track, index) =><Track current={this.props.state.current} post={track} index={index}/>)}
                </div>}
            {this.props.state.filterString && this.state.albums &&
                <div>
                    <h1>Albums:</h1>
                    <br/>
                    {this.state.albums.map((album) =>
                        <div className='album-grid' key={album.id}>
                            <NavLink to={{pathname:"/album_details",
                            state:{album: album}, search: this.props.location.search}}>
                                <img src={album.images[0].url}
                                    className='album-cover'
                                    alt='Album Cover'/>
                            </NavLink>
                            <br/>
                            <h3 style={{fontWeight: '500'}} className="album-name">{album.name}</h3>
                            <h5>{album.release_date.substring(0,4)}</h5>
                        </div>)}
                </div>}
            {this.props.state.filterString && this.state.artists &&
                <div>
                    <h1>Artists:</h1>
                    <br/>
                    {this.state.artists.map((artist) =>
                        <div style={{textAlign: 'left', paddingLeft: '25px'}}>
                            <span>
                                <h2 style={{margin: '0', padding: '0'}} className="bold">
                                    <NavLink to={{pathname:"/artist_details",
                                        state:{artist: artist}, search: this.props.location.search}}>
                                    {/* <img src={artist.images[0].url}
                                        className='pic-2' alt='artist-pic'></img> */}
                                    {artist.name}</NavLink>
                                </h2>
                            </span>
                            <br/>
                        </div>)}
                </div>}
            {this.props.state.filterString && this.state.playlists &&
                <div>
                    <h1>Playlists:</h1>
                    <br/>
                    {this.state.playlists.map((playlist) =>
                        <div className='playlist-grid-2' key={playlist.id}>
                            <NavLink to={{pathname:"/playlist_details",
                            state:{playlist: playlist}, search: this.props.location.search}}>
                            <img src={playlist.images[0].url}
                                className='playlist-cover-2'
                                alt='Album Cover'/>
                            </NavLink>
                            <br/>
                            <h3 className="playlist-name" style={{fontWeight: '500'}}>{playlist.name}</h3>
                        </div>)}                    
                </div>}
        </div>
        );
    }
}
export default Search;