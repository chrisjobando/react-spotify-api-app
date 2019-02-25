import React, { Component } from 'react';
import {NavLink} from 'react-router-dom';
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
            playing: "",
            shuffle: ""
        };
    };

    isPlaying() {
        if(this.props.state.playback.is_playing) {
            this.setState({playing: true})
        } else {
            this.setState({playing: false})
        }
    }

    isShuffle() {
        if(this.props.state.playback.shuffle_state) {
            this.setState({shuffle: true})
        } else {
            this.setState({shuffle: false})
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
        this.isShuffle();
        setInterval(() => this.isPlaying(), 500);
        setInterval(() => this.isShuffle(), 500);
    }

    render() {
        let current = this.props.state.current;
        return(
            <header className="player">
                <div className="player-contents">
                    <NavLink to={{pathname:"/album_details",
                        state:{album: current.album}, search: window.location.search}}>
                        <img src={current.album.images[0].url}
                            className='pic' alt='album-cover'/>
                    </NavLink>
                    <div className="title">
                        <p className="bold">{current.name}</p>
                        <p>
                            <NavLink to={{pathname:"/artist_details",
                                state:{artist: current.artists[0]}, search: window.location.search}}>
                                {current.artists[0].name}
                            </NavLink>
                        </p>
                    </div>
                    <div className="controls">
                        {this.state.shuffle && <button style={{color: 'green', fontSize: '24px'}} onClick={() => spotify.setShuffle(false)}><FontAwesome name='random'/></button>}
                        {!this.state.shuffle && <button style={{fontSize: '24px'}} onClick={() => spotify.setShuffle(true)}><FontAwesome name='random'/></button>}
                        <button onClick={() => spotify.skipToPrevious()}><FontAwesome name='angle-left' size='2x'/></button>
                        {this.state.playing===false &&
                            <button onClick={() => spotify.play()}><FontAwesome name='play-circle' size='3x'/></button>}
                        {this.state.playing &&
                            <button onClick={() => spotify.pause()}><FontAwesome name='pause-circle' size='3x'/></button>}
                        <button onClick={() => spotify.skipToNext()}><FontAwesome name='angle-right' size='2x'/></button>
                    </div>
                </div>
            </header>
        );
    }
 }

export default Player;