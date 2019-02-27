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
import NavigationBar from './components/NavigationBar/NavigationBar';
import Backdrop from './components/Backdrop/Backdrop';
import NavDrawer from './components/NavDrawer/NavDrawer';
import Header from './components/Header';
import Login from './components/Login';
import Filter from './components/Filter';
import Player from './components/Player/Player';

// Tabs
import Search from './components/Search';
import HomeTab from './components/HomeTab';
import PlaylistTab from './components/PlaylistTab';
import PlaylistPage from './components/Playlist/PlaylistPage';
import AlbumPage from './components/AlbumPage';
import ArtistPage from './components/ArtistPage';
import Recent from './components/Recent';
import TopTab from './components/TopTab';
import TopTracks from './components/TopTracks';
import TopArtists from './components/TopArtists';
import MyProfileTab from './components/MyProfileTab';

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
    };
    this.state = {
      loggedIn: token ? true : false,
      user: "",
      playlists: [],
      tracks: [],
      artists: [],
      recents: [],
      current: "",
      playback: "",
      filterString: "",
      navDrawerOpen: false
    };
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
    this.getTopArtistsRange("medium_term");
    this.getTopTracksRange("medium_term");
    this.getMyRecents();
    this.getCurrentPlaybackState();
    this.getMyCurrent();
    setInterval(() => this.getMyRecents(), 3000);
    setInterval(() => this.getCurrentPlaybackState(), 200);
  }

  /**
 * @author: Christopher Obando
 * Uses the getMe() method from spotify wrapper, returns a promise that
 *  I assign to the user key in the state.
 */
  getMyInfo() {
    spotify.getMe().then((result) => {
      this.setState({
        user: result
      });
    });
  }

  /**
   * @author: Christopher Obando
   * Uses the getMyTopTracks() method from spotify wrapper, returns an array
   * of the (limit) amount of tracks that the user has played the most over the
   * specified time range (short = 1 month, medium = 6 months, long = forever)
  */
  getTopTracks() {
    spotify.getMyTopTracks({limit: 25}).then(result => {
        this.setState({
          tracks: result.items
        });
      });
  }

  /**
   * @author: Christopher Obando
   * Same as method above, but has
   * @param range takes in a string with time range of data 
  */
  getTopTracksRange(range) {
    spotify.getMyTopTracks({limit: 25, time_range: range}).then(result => {
      this.setState({
        tracks: result.items
      });
    });
  }

  /**
   * @author: Christophber Obando
   * Uses the getMyTopArtists() method from spotify wrapper, returns an array
   * of the (limit) amount of artist that the user has listened to the most over
   * the specified time range (short = 1 month, medium = 6 months, long = forever)
   */
  getTopArtists() {
    spotify.getMyTopArtists({limit: 25}).then(result => {
        this.setState({
          artists: result.items
        });
      });
  }

  /**
   * @author: Christopher Obando
   * Same as method above, but has
   * @param range takes in a string with time range of data 
  */
  getTopArtistsRange(range) {
    spotify.getMyTopArtists({limit: 25, time_range: range}).then(result => {
      this.setState({
        artists: result.items
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
        playlists: result.items
      });
    });
  }

  /**
   * @author: Christopher Obando
   * Uses the getMyRecentlyPlayedTracks() method from spotify wrapper,
   * returns an object containing the most recent 25 tracks played by a user.
   * Track had to have been played for more than 30 seconds and is visible 
   * after completion
   */
  getMyRecents() {
    spotify.getMyRecentlyPlayedTracks({limit: 10}).then(result => {
      this.setState({
        recents: result.items
      });
    });
  }

  /**
   * @author: Christopher Obando
   * Uses the current playback state to return the current playing
   * track. Uses this info for the player.
   */
  getMyCurrent() {
    this.setState({
      current: this.state.playback.item
    });
  }

  /**
   * @author: Christopher Obando
   * Uses the getMyCurrentPlayibackState() method from spotify wrapper,
   * returns an object containing the user's current playback info.
   * This endpoint is in BETA according to the Spotify API website, so
   * it may go down randomly but I don't think this will be an issue.
   */
  getCurrentPlaybackState() {
    spotify.getMyCurrentPlaybackState().then(result => {
      this.setState({
        playback: result
      });
    });
    this.getMyCurrent();
  }

  /**
   * Methods for Navigation being responsive on mobile devices
   * Copied from website
   */
  drawerToggleClickHandler = () => {
    this.setState((prevState) => {
      return { navDrawerOpen: !prevState.navDrawerOpen };
    });
  };

  backdropClickHandler = () => {
    this.setState({ navDrawerOpen: false });
  };

  render() {
    let backdrop;
    if (this.state.navDrawerOpen) {
      backdrop = <Backdrop click={this.backdropClickHandler} />;
    }

  
    return (
      <Router>
        <div className="App">
          <Login loggedIn={this.state.loggedIn}/>
          {this.state.loggedIn && this.state.user
              && this.state.playlists && this.state.tracks &&
              this.state.recents &&
            <div>
              {/* App Navigation */}
              {this.state.current && <Player state={this.state}/>}
              <NavigationBar state={this.state}/>
              <Header state={this.state} drawerClickHandler={this.drawerToggleClickHandler} />
              <NavDrawer show={this.state.navDrawerOpen} />
              {backdrop}

              <div style={{paddingTop: '80px'}}></div>

              {/* Routes */}
              <Route exact path="/" render={(prop) => (
                <div className="route">
                  <div style={{paddingBottom: '10px'}} />
                  <HomeTab {...prop} state={this.state}/>
                  <br/>
                  <Recent {...prop} state={this.state}/>
                </div>
              )}/>
              <Route path="/browse" render={(prop) => (
                <div className="route">
                  <Filter {...prop} placeholder={"Search for a song, artist, album, or playlist..."} onTextChange={text => this.setState({filterString: text})}/>
                  <Search {...prop} current={this.state.playback.context} state={this.state}/>
                </div>
              )}/>
              <Route path="/profile" render={(prop) => (
                <div className="route">
                  <MyProfileTab {...prop} state={this.state}/>
                  <Filter {...prop} placeholder={"Search for a playlist..."} onTextChange={text => this.setState({filterString: text})}/>
                  <PlaylistTab {...prop} state={this.state}/>
                </div>
              )}/>  
              <Route path="/top" exact render={(prop) => (
                <div className="route">
                  <TopTab {...prop} state={this.state}/>
                </div>
              )}/>
              <Route path="/top/tracks" render={(prop) => (
                <div className="route">
                  <Filter {...prop} placeholder={"Search for an artist..."} onTextChange={text => this.setState({filterString: text})}/>
                  <div className="switch">
                    <NavLink onClick={() => this.getTopArtistsRange("medium_term")}
                    to={{pathname: '/top/artists/medium_term', search: window.location.search}}>See Your Top 25 Artists</NavLink>
                  </div>
                  <div className="time">
                  <NavLink onClick={() => this.getTopTracksRange("short_term")}
                      to={{pathname: '/top/tracks/short_term', search: window.location.search}}
                      activeClassName="active">Past Month</NavLink>
                    <NavLink onClick={() => this.getTopTracksRange("medium_term")}
                      to={{pathname: '/top/tracks/medium_term', search: window.location.search}}
                      activeClassName="active">Past 6 Months</NavLink>
                    <NavLink onClick={() => this.getTopTracksRange("long_term")}
                      to={{pathname: '/top/tracks/long_term', search: window.location.search}}
                      activeClassName="active">All Time</NavLink>
                  </div>
                  <TopTracks {...prop} state={this.state}/>
                </div>
              )}/>
              <Route path="/top/artists" render={(prop) => (
                <div className="route">
                  <Filter {...prop} placeholder={"Search for an artist..."} onTextChange={text => this.setState({filterString: text})}/>
                  <div className="switch">
                    <NavLink to={{pathname: '/top/tracks/medium_term', search: window.location.search}}
                      onClick={() => this.getTopTracksRange("medium_term")}>See Your Top 25 Tracks</NavLink>
                  </div>
                  <div className="time">
                    <NavLink onClick={() => this.getTopArtistsRange("short_term")}
                      to={{pathname: '/top/artists/short_term', search: window.location.search}}
                      activeClassName="active">Past Month</NavLink>
                    <NavLink onClick={() => this.getTopArtistsRange("medium_term")}
                      to={{pathname: '/top/artists/medium_term', search: window.location.search}}
                      activeClassName="active">Past 6 Months</NavLink>
                    <NavLink onClick={() => this.getTopArtistsRange("long_term")}
                      to={{pathname: '/top/artists/long_term', search: window.location.search}}
                      activeClassName="active">All Time</NavLink>
                  </div>
                  <TopArtists {...prop} state={this.state}/>
                </div>
              )}/>
              <Route path="/playlist_details" render={(prop) => (
                <div className="route">
                  <PlaylistPage {...prop} state={this.state}/>
                </div>
              )}/>
              <Route path="/album_details" render={(prop) => (
                <div className="route">
                  <AlbumPage {...prop} state={this.state}/>
                </div>
              )}/>
              <Route path="/artist_details" render={(prop) => (
                <div className="route">
                  <ArtistPage {...prop} state={this.state}/>
                </div>
              )}/>
              <div style={{paddingBottom: '30px'}}></div>
              {this.state.current && <div style={{paddingBottom: '70px'}}></div>}
            </div>
          }
        </div>
      </Router>
    );
  }
} export default App;