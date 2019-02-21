import React, {Component} from 'react';

// Styling
import '../styling/Header.sass';

// Components
import FollowerCounter from './FollowerCounter';
import PlaylistCounter from './Playlist/PlaylistCounter';

class Header extends Component {
    render() {
        return(
            <header className="head" style={{paddingTop: '100px'}}>
                <FollowerCounter followers={this.props.state.user.followers.total} />
                <PlaylistCounter numPlaylists={this.props.state.playlists.length} />
          </header>
        );
    }
}
export default Header;