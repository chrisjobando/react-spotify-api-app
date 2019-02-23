import React from 'react';
import { NavLink } from 'react-router-dom';

import './NavDrawer.sass';

const navDrawer = props => {
  let drawerClasses = 'nav-drawer';
  if (props.show) {
    drawerClasses = 'nav-drawer open';
  }

  return (
    <nav className={drawerClasses}>
      <ul>
        <li><NavLink to={{pathname: '/', search: window.location.search}} exact activeClassName="active">Home</NavLink></li>
        <li><NavLink to={{pathname: '/recent', search: window.location.search}} activeClassName="active">Recently Played</NavLink></li>
        <li><NavLink to={{pathname: '/playlists', search: window.location.search}} activeClassName="active">My Playlists</NavLink></li>
        <li><NavLink to={{pathname: '/top', search: window.location.search}} activeClassName="active">My Top Stats</NavLink></li>
        <li><a href="/">Logout</a></li>
      </ul>
    </nav>
  );
};

export default navDrawer;
