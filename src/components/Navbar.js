import React from 'react';
import {NavLink} from 'react-router-dom';

import '../styling/Navbar.sass';

import Logo from '../img/icon.png'

const navbar = props => (
    <header className="navbar">
        <nav className="navbar-nav">
            <div className="navbar-logo">
                <img src={Logo} alt="LOGO"/> Chris' Spotify App
            </div>
            <div className="spacer"/>
            <div className="navbar-nav-items">
                <ul>
                    <li><NavLink to="/" exact activeClassName="active">Home</NavLink></li>
                    <li><NavLink to="/playlists" activeClassName="active">My Playlists</NavLink></li>
                    <li><NavLink to="/top" activeClassName="active">My Top Stats</NavLink></li>
                </ul>
            </div>
        </nav>
    </header>
);

export default navbar;