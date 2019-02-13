import React, { Component } from 'react';
import './App.sass';
import queryString from 'query-string';

// Components
import Product from './components/Product';
import FollowerCounter from './components/FollowerCounter';
import Filter from './components/Filter';
import Playlist from './components/Playlist';
import PlaylistCounter from './components/PlaylistCounter';

// class HoursCounter extends Component {
//   render () {
//     let allSongs = this.props.playlists.reduce((songs, eachPlaylist) => {
//       return songs.concat(eachPlaylist.songs);
//     }, []);
//     let totalDuration = allSongs.reduce((sum, eachSong) => {
//       return sum + eachSong.duration;
//     }, 0);
//     return(
//      <div style={{...defaultStyle, width: '40%', display: 'inline-block'}}>
//        <h2>
//         {Math.round(totalDuration/60)} hours
//        </h2>
//      </div>
//     );
//   }
// }

class App extends Component {
  constructor() {
    super();
    this.state = {
      serverData : {},
      filterString: ''
    };
  }
  componentDidMount() {
    let parsed = queryString.parse(window.location.search);
    let accessToken = parsed.access_token;
    if (!accessToken) return;

    fetch('https://api.spotify.com/v1/me', {
      headers: {'Authorization': 'Bearer ' + accessToken}
    }).then(response => response.json())
      .then(data => this.setState({
        user: {
          name: data.display_name,
          pic: data.images[0].url,
          followers: data.followers.total,
          accountType: data.product.charAt(0).toUpperCase() + data.product.slice(1),
          url: data.external_urls.spotify
        }
      }));

    fetch('https://api.spotify.com/v1/me/top/artists', {
      headers: {'Authorization': 'Bearer ' + accessToken}
    }).then(response => response.json())
      .then(artistData => console.log(artistData));

    fetch('https://api.spotify.com/v1/me/playlists', {
      headers: {'Authorization': 'Bearer ' + accessToken}
    }).then(response => response.json())
      .then(playlistData => {
        let playlists = playlistData.items;
        let trackDataPromises = playlists.map(playlist => {
          let responsePromise = fetch(playlist.tracks.href, {
            headers: {'Authorization': 'Bearer ' + accessToken}
          })
          let trackDataPromise = responsePromise
            .then(response => response.json())
          return trackDataPromise;
        });
        let allTracksDataPromises =
         Promise.all(trackDataPromises);
        let playlistsPromise = allTracksDataPromises.then(trackDatas => {
          trackDatas.forEach((trackData, i) => {
            playlists[i].trackDatas = trackData.items
              .map(item => item.track)
              .map(trackData => ({
                name: trackData.name.counterDisplay
              }))
          })
          return playlists;
        });
        return playlistsPromise;        
      })
      .then(playlists => this.setState({
        playlists: playlists.map(item => {
          return {
            name: item.name,
            imageUrl: item.images[0].url
          }
        })
      }));
  }
  render() {
    let playlistsToRender =
      this.state.user &&
      this.state.playlists
        ? this.state.playlists.filter(playlist => {
          let matchesPlaylist = playlist.name.toLowerCase().includes(
            this.state.filterString.toLowerCase());
          return matchesPlaylist;
        }) : [];
    return (
      <div className="App">
        {this.state.user ?
          <div>
            <img src={this.state.user.pic}
              alt='Profile Pic' className='profilePic'/>
            <h1 style={{fontSize: '54px'}}>
              {this.state.user.name}
            </h1>
            <Product accountType={this.state.user.accountType} />
            <h2><a href={this.state.user.url}
                  target='_blank'
                  rel='noopener noreferrer'>
              Link to Profile
            </a></h2>
            <div className='profile-info'>
              <FollowerCounter followers={this.state.user.followers} />
              <PlaylistCounter playlists={playlistsToRender} />
            </div>
            <Filter onTextChange={text =>
              this.setState({filterString: text})}/>
            {playlistsToRender.map(playlist =>
              <Playlist playlist={playlist}/>
            )}
          </div>
          : <button onClick={() => {
            window.location = window.location.href.includes('localhost')
              ? 'http://localhost:8888/login'
              : 'http://obando-spotify-backend.herokuapp.com/login'}
          }
          className='login-button'>Sign in with Spotify</button>
        }
      </div>
    );
  }
}

export default App;
