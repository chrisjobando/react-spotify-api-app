import React, {Component} from 'react';

// Components
import Product from './Product';
import FollowerCounter from './FollowerCounter';
import PlaylistCounter from './Playlist/PlaylistCounter';

class Header extends Component {

    /**
     * @author: Christopher Obando
     * @param str
     * Capitalizes the first letter of any string passed in parameter
     */
    capitalize(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    render() {
        return(
            <header>
                <img src={this.props.state.user.images[0].url}
                    alt='Profile Pic' className='profilePic'/>
                <h1 style={{fontSize: '54px'}}>
                {this.props.state.user.display_name}
                </h1>
                <Product accountType={this.capitalize(this.props.state.user.product)} />
                <h2><a href={this.props.state.user.external_urls.spotify}
                    target='_blank'
                    rel='noopener noreferrer'>Link to Profile</a></h2>
                <br/>
                <div className='profile-info'>
                <FollowerCounter followers={this.props.state.user.followers.total} />
                <PlaylistCounter numPlaylists={this.props.state.playlists.length} />
                </div>
                <br/>
          </header>
        );
    }
}
export default Header;