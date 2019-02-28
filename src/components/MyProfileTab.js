import React, { Component } from 'react';

// Components
import FollowerCounter from './FollowerCounter';
import PlaylistCounter from './Playlist/PlaylistCounter';

class ProfileTab extends Component {
  componentDidMount() {
    window.scrollTo(0,0);
  }
  render() {
    let user = this.props.state.user;
    return(
      <div>
        <img src={user.images[0].url} alt='Profile Pic' className='artist-cover'/>
        <a href={this.props.state.user.external_urls.spotify}
          target='_blank'
          rel='noopener noreferrer'><h1>{user.display_name}</h1></a>
        <br/>
        <header className="head">
          <FollowerCounter followers={this.props.state.user.followers.total} />
          <PlaylistCounter numPlaylists={this.props.state.playlists.length} />
        </header>
        <br/><br/>
      </div>
    );
  }
}
export default ProfileTab;