import React, {Component} from 'react';
import {NavLink} from 'react-router-dom';

import ToggleButton from './NavDrawer/ToggleButton';

import '../styling/Navbar.sass';

 class Navbar extends Component {
    render() {    
        return(
            <header className="navbar">
                <nav className="navbar-nav">
                <div className="toggle-button">
                    <ToggleButton click={this.props.drawerClickHandler} />
                </div>
                    <div className="navbar-logo">
                        <NavLink to={{pathname: '/', search: window.location.search}}><img src={this.props.state.user.images[0].url}
                            alt='Profile Pic' className='profilePic'/></NavLink>
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
                            <li><NavLink to={{pathname: '/', search: window.location.search}} exact activeClassName="active">Home</NavLink></li>
                            <li><NavLink to={{pathname: '/recent', search: window.location.search}} activeClassName="active">Recently Played</NavLink></li>
                            <li><NavLink to={{pathname: '/playlists', search: window.location.search}} activeClassName="active">My Playlists</NavLink></li>
                            <li><NavLink to={{pathname: '/top', search: window.location.search}} activeClassName="active">My Top Stats</NavLink></li>
                        </ul>
                    </div>
                </nav>
            </header>
        );
    }
 }

export default Navbar;