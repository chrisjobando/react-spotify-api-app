import React, {Component} from 'react';

// Styling
import '../styling/HomeTab.sass'
import '../styling/Header.sass';

// Components
import FollowerCounter from './FollowerCounter';
import PlaylistCounter from './Playlist/PlaylistCounter';

class HomeTab extends Component {
    render() {
        return(
            <div>
                <header className="head">
                    <FollowerCounter followers={this.props.state.user.followers.total} />
                    <PlaylistCounter numPlaylists={this.props.state.playlists.length} />
                </header>
                <h1>Welcome to My Spotify Web App!</h1>
                <h2>This is in its early stages, but feel free to try it out!</h2>
                <br/>
                <h2 className="links">Made by: Christopher Obando</h2>
                <a className="links" href="https://open.spotify.com/user/chrisjobando"
                target="_blank" rel="noopener noreferrer"><h2>Link To My Spotify</h2></a>
                <a className="links" href="https://github.com/chrisjobando/spotify-app"
                target="_blank" rel="noopener noreferrer"><h2>Link To Source Code</h2></a>
                <br/>
                <h1>Recently Played:</h1>
            </div>
        );
    }
}
export default HomeTab;