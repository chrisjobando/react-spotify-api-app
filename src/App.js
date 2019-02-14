import React, { Component } from 'react';
import './App.sass';

/**
 * Public Spotify Web API Wrapper
 * Includes helper functions for all Spotify endpoints
 * Source: https://github.com/JMPerez/spotify-web-api-js
 */
import SpotifyWebApi from 'spotify-web-api-js';

import queryString from 'query-string';

// Components
import Login from './components/Login';
import Product from './components/Product';
import FollowerCounter from './components/FollowerCounter';
import Playlist from './components/Playlist/Playlist';
import PlaylistCounter from './components/Playlist/PlaylistCounter';
import Filter from './components/Filter';

// Instantiates the wrapper
const spotify = new SpotifyWebApi();

class App extends Component {

  /**
   * @author: Christopher Obando
   * Constructor for the App, gets the params from the query using a helper function,
   * pulls the access token from the dictionary returned. If token exists, sets it in
   * the wrapper. Sets state to logged in if token exists, and instantiates tracks list.
   */
  constructor() {
    super();
    const params = this.getHashParams();
    const token = params.access_token;
    if (token) {
      spotify.setAccessToken(token);
    }
    this.state = {
      loggedIn: token ? true : false,
      user: "",
      playlists: "",
      tracks: [],
      filterString: ""
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
  }

  componentDidMount() {
    this.getMyInfo();
    this.getMyPlaylists();
  }

  capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  /**
 * @author: Christopher Obando
 * Uses the getMe() method from spotify wrapper, returns a promise that
 *  I assign to the user key in the state.
 */
  getMyInfo() {
    spotify.getMe().then((result) => {
      this.setState({
        user: result,
      });
    });
  }

  /**
   * @author: Christopher Obando
   * Uses the getUserPlaylist() method from spotify wrapper, returns an
   * object containing (50) of the current user's playlists as an array
   */
  getMyPlaylists() {
    spotify.getUserPlaylists({limit: 50}).then((result) => {
      this.setState({
        playlists: result.items,
      });
      console.log(this.state);
    });
  }

  render() {
    let playlistsToRender =
      this.state.loggedIn && this.state.user &&
      this.state.playlists
        ? this.state.playlists.filter(playlist => {
          let matchesPlaylist = playlist.name.toLowerCase().includes(
            this.state.filterString.toLowerCase());
          return matchesPlaylist;
        }) : [];
    return (
      <div className="App">
        <Login loggedIn={this.state.loggedIn}/>
        {this.state.loggedIn && this.state.user
            && this.state.playlists &&
          <div>
            <img src={this.state.user.images[0].url}
                alt='Profile Pic' className='profilePic'/>
            <h1 style={{fontSize: '54px'}}>
              {this.state.user.display_name}
            </h1>
            <Product accountType={this.capitalize(this.state.user.product)} />
            <h2><a href={this.state.user.external_urls.spotify}
                  target='_blank'
                  rel='noopener noreferrer'>
              Link to Profile</a></h2>
            <div className='profile-info'>
              <FollowerCounter followers={this.state.user.followers.total} />
              <PlaylistCounter numPlaylists={this.state.playlists.length} />
            </div>
            <Filter onTextChange={text => this.setState({filterString: text})}/>
            {playlistsToRender.map(playlist =>
              <Playlist playlist={playlist}/>)}
          </div>
        }
      </div>
      );
  }
} export default App;