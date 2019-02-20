import React, {Component} from 'react';

// Styling
import '../styling/Header.sass';

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
            <header className="head" style={{paddingTop: '80px'}}>
                <span className="flex-box">
                    <img src={this.props.state.user.images[0].url}
                        alt='Profile Pic' className='profilePic'/>
                    <span className="text-info">
                        <h1>{this.props.state.user.display_name}</h1>
                        <Product accountType={this.capitalize(this.props.state.user.product)} />
                        <h2><a href={this.props.state.user.external_urls.spotify}
                            target='_blank'
                            rel='noopener noreferrer'>Link to Profile</a></h2>
                    </span>
                    <div className="comp-info">
                        <FollowerCounter followers={this.props.state.user.followers.total} />
                        <PlaylistCounter numPlaylists={this.props.state.playlists.length} />
                    </div>
                </span>
                <br/>
          </header>
        );
    }
}
export default Header;