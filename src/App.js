import React, {Component} from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';

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
import Navbar from './components/Navbar';
import Header from './components/Header';
import Login from './components/Login';
import Filter from './components/Filter';

// Tabs
import HomeTab from './components/HomeTab';
import PlaylistTab from './components/PlaylistTab';
import TopTab from './components/TopTab';

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
      playlists: [],
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

  /**
   * @author: Christopher Obando
   * Runs these functions after the data loads in the constructor
   * This runs only once as opposed to code in the render function below
   */
  componentDidMount() {
    this.getMyInfo();
    this.getTopTracks();
    this.getMyPlaylists();
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
   * Uses the getMyTopTracks() method from spotify wrapper, returns an array
   * of the (limit) amount of tracks that the user has played the most over the
   * specified time range (short = 1 month, medium = 1 year, long = forever)
  */
  getTopTracks() {
    spotify.getMyTopTracks({limit: 25}).then(result => {
        this.setState({
          tracks: result.items,
        });
      });
  }
  
  /**
   * @author: Christopher Obando
   * Uses the getUserPlaylist() method from spotify wrapper, returns an
   * object containing (50) of the current user's playlists as an array
   */
  getMyPlaylists() {
    spotify.getUserPlaylists({limit: 50}).then(result => {
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
              && this.state.playlists && this.state.tracks &&
            <div>
              {/* App Navigation */}
              <Navbar />

              {/* Header, doesn't change */}
              <Header state={this.state}/>

              {/* Routes */}
              <Route exact path="/" render={(prop) => (<HomeTab {...prop} state={this.state}/>)}/>
              <Route path="/playlists" render={(prop) => (
                <div>
                  <Filter {...prop} placeholder={"Search for a playlist..."} onTextChange={text => this.setState({filterString: text})}/>
                  <PlaylistTab {...prop} state={this.state}/>
                </div>
              )}/>
              <Route path="/top" render={(prop) => (
                <div>
                  <Filter {...prop} placeholder={"Search for an artist..."} onTextChange={text => this.setState({filterString: text})}/>
                  <TopTab {...prop} state={this.state}/>
                </div>
              )}/>
            </div>
          }
        </div>
      </Router>
    );
  }
} export default App;