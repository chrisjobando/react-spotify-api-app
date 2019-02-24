import React, { Component } from 'react';
import FontAwesome from 'react-fontawesome';

// Styling
import './Player.sass';

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

class Player extends Component {
    constructor() {
        super();
        const params = this.getHashParams();
        const token = params.access_token;
        if (token) {
            spotify.setAccessToken(token);
        };
        this.state = {
            playing: ""
        };
    };

    isPlaying() {
        if(this.props.state.playback.is_playing) {
            this.setState({playing: true})
        } else {
            this.setState({playing: false})
        }
    }

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
        this.isPlaying();
        setInterval(() => this.isPlaying(), 500);
    }

    render() {
        let current = this.props.state.current;
        return(
            <header className="player">
                <div className="player-contents">
                    <div className="controls">
                        <a href={current.album.external_urls.spotify}
                            target="_blank" rel="noopener noreferrer">
                            <img src={current.album.images[0].url} className='pic' alt='album-cover'></img>
                        </a>
                        <div className="title">
                        <a href={current.external_urls.spotify}
                            target="_blank" rel="noopener noreferrer">
                            <p style={{fontWeight: '500'}}>{current.name}</p>
                        </a>
                        <a href={current.artists[0].external_urls.spotify}
                            target="_blank" rel="noopener noreferrer">
                            <p>{current.artists[0].name}</p>
                        </a>
                        </div>
                        <button onClick={() => spotify.skipToPrevious()}><FontAwesome name='arrow-alt-circle-left' size='2x'/></button>
                        {this.state.playing===false &&
                            <button onClick={() => spotify.play()}><FontAwesome name='play-circle' size='2x'/></button>}
                        {this.state.playing &&
                            <button onClick={() => spotify.pause()}><FontAwesome name='pause-circle' size='2x'/></button>}
                        <button onClick={() => spotify.skipToNext()}><FontAwesome name='arrow-alt-circle-right' size='2x'/></button>
                    </div>
                </div>
            </header>
        );
    }
 }

export default Player;