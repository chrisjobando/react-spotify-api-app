import React, {Component} from 'react';
import {NavLink} from 'react-router-dom';

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

class Track extends Component {
    constructor() {
        super();
        const params = this.getHashParams();
        const token = params.access_token;
        if (token) {
            spotify.setAccessToken(token);
        };
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
        let track = this.props.post;
        return(
            <div className="list">
                <div key={track.id}>
                    <span className="info-topTrack" style={{width: '95%', marginLeft: '30px'}}>
                        {this.props.current && 
                            (this.props.current.id===track.id) &&
                            <p style={{marginRight: "10px", color: "rgb(255, 202, 58)"}}>></p>}
                        <NavLink to={{pathname:"/album_details",
                            state:{album: track.album}, search: window.location.search}}>
                            <img src={track.album.images[0].url}
                                className='album-cover' alt='album-cover'/>
                        </NavLink>
                        <span style={{width: '100%'}}>
                            <button onClick={() => spotify.play({context_uri: track.album.uri, offset: {uri: track.uri}})}>
                                <span style={{fontWeight: 600}}>{this.props.index+1}. </span>
                                {track.name}<br/>
                            </button>
                            <br/>
                            <NavLink to={{pathname:"/artist_details",
                                state:{artist: track.artists[0]}, search: window.location.search}}>
                                <span className="bold">{track.artists[0].name}</span>
                            </NavLink>
                            <span className="track-length" style={{float: 'right'}}>{this.millisToMinutesAndSeconds(track.duration_ms)}</span>
                        </span>
                    </span>
                </div>
            </div>
        );
    }
}

export default Track;