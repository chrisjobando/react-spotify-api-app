import React, {Component} from 'react';

// Styling
import '../styling/HomeTab.sass'
import '../styling/Header.sass';

// Components
import FollowerCounter from './FollowerCounter';
import PlaylistCounter from './Playlist/PlaylistCounter';

class HomeTab extends Component {
    componentDidMount() {
        window.scrollTo(0,0);
    }

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
                <h2 className="links"><a href="https://open.spotify.com/user/chrisjobando"
                target="_blank" rel="noopener noreferrer">Follow My Spotify!</a></h2>
                <h2 className="links"><a href="https://github.com/chrisjobando/spotify-app"
                target="_blank" rel="noopener noreferrer">Link To Source Code</a></h2>
                <br/>
                <h1>Recently Played:</h1>
            </div>
        );
    }
}
export default HomeTab;