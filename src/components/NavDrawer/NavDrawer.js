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
        <li><NavLink to="/" exact activeClassName="active">Profile</NavLink></li>
        <li><NavLink to="/playlists" activeClassName="active">My Playlists</NavLink></li>
        <li><NavLink to="/recent" activeClassName="active">Recently Played</NavLink></li>
        <li><NavLink to="/top" activeClassName="active">My Top Stats</NavLink></li>
        <li><a href="/">Logout</a></li>
      </ul>
    </nav>
  );
};

export default navDrawer;
