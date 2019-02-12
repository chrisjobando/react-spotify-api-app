import React, { Component } from 'react';
import './App.sass';
import { timingSafeEqual } from 'crypto';

let textColor = '#fff';
let defaultStyle= {
  color: textColor
};
let tempServerData = {
  user: {
    name: 'Chris',
    playlists: [
      {
        name: 'My Favorites',
        songs: [{name: 'A', duration: 1345},
                {name: 'B', duration: 1236},
                {name: 'C', duration: 7000}]
      },
      {
        name: 'Discover Weekly',
        songs: [{name: 'D', duration: 1354},
                {name: 'E', duration: 1692},
                {name: 'F', duration: 8200}]
      },
      {
        name: 'Another Playlist',
        songs: [{name: 'G', duration: 3248},
                {name: 'H', duration: 8123},
                {name: 'I', duration: 3182}]
      },
      {
        name: 'Sure',
        songs: [{name: 'J', duration: 9372},
                {name: 'K', duration: 1974},
                {name: 'L', duration: 1293}]
      }
    ]
  }
};


class PlaylistCounter extends Component {
  render () {
    return(
     <div style={{...defaultStyle, width: '40%', display: 'inline-block'}}>
       <h2>
        {this.props.playlists.length} playlists
       </h2>
     </div>
    );
  }
}

class HoursCounter extends Component {
  render () {
    let allSongs = this.props.playlists.reduce((songs, eachPlaylist) => {
      return songs.concat(eachPlaylist.songs);
    }, []);
    let totalDuration = allSongs.reduce((sum, eachSong) => {
      return sum + eachSong.duration;
    }, 0);
    return(
     <div style={{...defaultStyle, width: '40%', display: 'inline-block'}}>
       <h2>
        {Math.round(totalDuration/60)} hours
       </h2>
     </div>
    );
  }
}

class Filter extends Component {
  render() {
    return(
      <div style={defaultStyle}>
        <img/>
        <input type="text"/>
      </div>
    );
  }
}

class Playlist extends Component {
  render() {
    return(
      <div style={{...defaultStyle, display: 'inline-block', width: '25%'}}>
        <img/>
        <h3>Playlist Name</h3>
        <ul>
          <li>Song 1</li>
          <li>Song 2</li>
          <li>Song 3</li>
        </ul>
      </div>
    );
  }
}

class App extends Component {
  constructor() {
    super();
    this.state = {serverData : {}};
  }
  componentDidMount() {
    setTimeout(() => {
      this.setState({serverData: tempServerData});
    }, 1000);
  }
  render() {
    return (
      <div className="App">
        {this.state.serverData.user ?
          <div>
            <h1 style={{...defaultStyle, 'font-size': '54px'}}>
              {this.state.serverData.user.name}'s Playlists
            </h1>
            <PlaylistCounter playlists=
            {this.state.serverData.user.playlists} />
            <HoursCounter playlists=
            {this.state.serverData.user.playlists} />
            <Filter/>
            <Playlist/>
            <Playlist/>
            <Playlist/>
            <Playlist/>
          </div> : <h1 style={defaultStyle}>Loading...</h1>
        }
      </div>
    );
  }
}

export default App;
