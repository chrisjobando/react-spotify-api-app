import React, {Component} from 'react';

// Styling
import '../styling/HomeTab.sass'
import '../styling/Header.sass';

// Components
import FollowerCounter from './FollowerCounter';
import PlaylistCounter from './Playlist/PlaylistCounter';

class HomeTab extends Component {
    render() {
        let current = this.props.state.current;
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
                {current &&
                    <div>
                        <h1>Currently Playing:</h1>
                        <br/> 
                        <div className="track">
                            <span>
                                <a href={current.album.external_urls.spotify}
                                target="_blank" rel="noopener noreferrer">
                                    <img src={current.album.images[0].url}
                                        className='pic' alt='album-cover'></img>
                                </a>
                            </span>
                            <br/>
                            <span className="info">
                                <a href={current.external_urls.spotify}
                                    target="_blank" rel="noopener noreferrer">
                                    {current.name} <br/>
                                    <span className="bold"> {current.artists[0].name}</span>
                                </a>
                            </span>
                        </div>
                    </div>
                }
            </div>
        );
    }
}
export default HomeTab;