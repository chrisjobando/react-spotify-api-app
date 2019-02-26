import React, { Component } from 'react';
import Playlist from './Playlist/Playlist';

class PlaylistTab extends Component {
    componentDidMount() {
      window.scrollTo(0,0);
      this.props.state.filterString = '';
    }
    render() {
        let playlistsToRender =
        this.props.state.playlists
          ? this.props.state.playlists.filter(playlist => {
            let matchesPlaylist = playlist.name.toLowerCase().includes(
              this.props.state.filterString.toLowerCase());
            return matchesPlaylist;
          }) : [];
        return(
          <div style={{minHeight: '15vh'}}>
            <div>
                {playlistsToRender.map(playlist => <Playlist playlist={playlist} key={playlist.id}/>)}
            </div>
          </div>
        );
    }
}
export default PlaylistTab;