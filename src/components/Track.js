import React, {Component} from 'react';
// npm Package that is capable of parsing query strings, such as ones in the URL 
import queryString from 'query-string';

/**
 * Public Spotify Web API Wrapper
 * Includes helper functions for all Spotify endpoints
 * Source: https://github.com/JMPerez/spotify-web-api-js
 */
import SpotifyWebApi from 'spotify-web-api-js';

import '../styling/Track.sass';

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

    render() {
        let track = this.props.post;
        return(
            <div className="track">
                <div key={track.id}>
                    <span>
                        <a href={track.album.external_urls.spotify}
                        target="_blank" rel="noopener noreferrer">
                            <img src={track.album.images[0].url}
                                className='pic' alt='album-cover'></img>
                        </a>
                    </span>
                    <br/>
                    <span className="info">
                        <button onClick={() => spotify.play({context_uri: track.album.uri, offset: {uri: track.uri}})}>
                            <span style={{fontWeight: 600}}>{this.props.index+1}. </span>
                            {track.name} <br/>
                        </button>
                        <br/>
                        <a href={track.artists[0].external_urls.spotify}
                            target="_blank" rel="noopener noreferrer">
                            <span className="bold"> {track.artists[0].name}</span>
                        </a>
                    </span>
                </div>
            </div>
        );
    }
}

export default Track;