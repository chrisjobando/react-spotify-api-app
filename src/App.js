import React, {Component} from 'react';
import {BrowserRouter as Router, Route, NavLink} from 'react-router-dom';

// General App Styling
import './App.sass';

/**
 * Public Spotify Web API Wrapper
 * Includes helper functions for all Spotify endpoints
 * Source: https://github.com/JMPerez/spotify-web-api-js
 */
import SpotifyWebApi from 'spotify-web-api-js';

// npm Package that is capable of parsing query strings, such as ones in the URL 
import queryString from 'query-string';

// Components
import Login from './components/Login';
import Product from './components/Product';
import FollowerCounter from './components/FollowerCounter';
import PlaylistCounter from './components/Playlist/PlaylistCounter';
import Filter from './components/Filter';

// Tabs
import HomeTab from './components/HomeTab';
import PlaylistTab from './components/PlaylistTab';

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
      filterString: "",
      tab: "HomeTab"
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

  /**
   * @author: Christopher Obando
   * Runs these functions after the data loads in the constructor
   * This runs only once as opposed to code in the render function below
   */
  componentDidMount() {
    this.getMyInfo();
    this.getMyPlaylists();
  }

  /**
   * @author: Christopher Obando
   * @param str
   * Capitalizes the first letter of any string passed in parameter
   */
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
    });
  }

  render() {
    return (
      <Router>
        <div className="App">
          <Login loggedIn={this.state.loggedIn}/>
          {this.state.loggedIn && this.state.user
              && this.state.playlists &&
            <div>
              <nav>
                <ul>
                  {/* App Route */}
                  <li><NavLink to='/' exact activeClassName='active'
                  onClick={() => {
                    this.setState({
                      tab: "HomeTab"
                    });
                  }} className='switch-button'>Home</NavLink></li>
                  <li><NavLink to='/playlists' activeClassName='active'
                  onClick={() => {
                    this.setState({
                      tab: "PlaylistTab"
                    });
                  }} className='switch-button'>My Playlists</NavLink></li>
                </ul>
              </nav>

              {/* Header, doesn't change */}
              <header>
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
                <br/>
                <div className='profile-info'>
                  <FollowerCounter followers={this.state.user.followers.total} />
                  <PlaylistCounter numPlaylists={this.state.playlists.length} />
                </div>
                <br/>
              </header>

              {/* App Components */}
              { this.state.tab !=="HomeTab" &&
                <Filter onTextChange={text => this.setState({filterString: text})}/>}
              
              {/* Route */}
              <Route exact path="/" render={(prop) => (<HomeTab {...prop} state={this.state}/>)}/>
              <Route path="/playlists" render={(prop) => (<PlaylistTab {...prop} state={this.state}/>)}/>
            </div>
          }
        </div>
      </Router>
    );
  }
} export default App;