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
                <h2>This is in its early stages, so be patient while I read 
                    a LOT of documentation and experiment with Sass to implement
                    my vision.</h2>
                <br/>
                <h1>Recently Played:</h1>
            </div>
        );
    }
}
export default HomeTab;