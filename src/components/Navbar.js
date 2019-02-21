import React, {Component} from 'react';
import {NavLink} from 'react-router-dom';

import '../styling/Navbar.sass';

 class Navbar extends Component {
    render() {
        return(
            <header className="navbar">
                <nav className="navbar-nav">
                    <div className="navbar-logo">
                        <img src={this.props.state.user.images[0].url}
                            alt='Profile Pic' className='profilePic'/>
                        <div>
                            <a href={this.props.state.user.external_urls.spotify}
                            target='_blank'
                            rel='noopener noreferrer'>{this.props.state.user.display_name}</a>
                            <p className="logout"><a href="/">Logout</a></p>
                        </div>
                    </div>
                    <div className="spacer"/>
                    <div className="navbar-nav-items">
                        <ul>
                            <li><NavLink to="/" exact activeClassName="active">Profile</NavLink></li>
                            <li><NavLink to="/playlists" activeClassName="active">My Playlists</NavLink></li>
                            <li><NavLink to="/top" activeClassName="active">My Top Stats</NavLink></li>
                        </ul>
                    </div>
                </nav>
            </header>
        );
    }
 }

export default Navbar;