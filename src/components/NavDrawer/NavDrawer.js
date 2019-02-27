import React from 'react';
import { NavLink } from 'react-router-dom';
import FontAwesome from 'react-fontawesome';

import './NavDrawer.sass';

const navDrawer = props => {
  let drawerClasses = 'nav-drawer';
  if (props.show) {
    drawerClasses = 'nav-drawer open';
  }

  return (
    <nav className={drawerClasses}>
      <ul>
       <li><NavLink to={{pathname: '/', search: window.location.search}}
          exact activeClassName="active"><FontAwesome style={{marginRight: '10px'}} name="home"/>Home</NavLink></li>
        <li><NavLink to={{pathname: '/browse', search: window.location.search}}
          activeClassName="active"><FontAwesome style={{marginRight: '10px'}} name="search"/>Browse</NavLink></li>
        <li><NavLink to={{pathname: '/profile', search: window.location.search}}
          activeClassName="active"><FontAwesome style={{marginRight: '10px'}} name="user-circle"/>My Profile</NavLink></li>
        <li><NavLink to={{pathname: '/top', search: window.location.search}}
          activeClassName="active"><FontAwesome style={{marginRight: '10px'}} name="signal"/>My Stats</NavLink></li>
      </ul>
    </nav>
  );
};

export default navDrawer;
