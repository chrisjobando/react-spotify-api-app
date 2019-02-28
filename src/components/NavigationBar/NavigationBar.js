import React from 'react';
import { NavLink } from 'react-router-dom';
import FontAwesome from 'react-fontawesome';

import './NavigationBar.sass';

const navDrawer = props => {
  let barClasses = 'nav-bar';
  if (props.show) {
    barClasses = 'bar open';
  }
  return (
    <nav className={barClasses}>
      <ul>
        <li><NavLink to={{pathname: '/', search: window.location.search}}
          exact activeClassName="active"><FontAwesome style={{marginRight: '10px'}} name="home"/>Home</NavLink></li>
        <li><NavLink to={{pathname: '/browse', search: window.location.search}}
          activeClassName="active"><FontAwesome style={{marginRight: '10px'}} name="search"/>Browse</NavLink></li>
        <li><NavLink to={{pathname: '/profile', search: window.location.search}}
          activeClassName="active"><FontAwesome style={{marginRight: '10px'}} name="user-circle"/>My Profile</NavLink></li>
        <li><NavLink to={{pathname: '/top', search: window.location.search}}
          activeClassName="active"><FontAwesome style={{marginRight: '10px'}} name="signal"/>My Stats</NavLink></li>
        <li><NavLink to={{pathname: '/suggested', search: window.location.search}}
          activeClassName="active"><FontAwesome style={{marginRight: '10px'}} name="volume-up"/>Suggested</NavLink></li>
      </ul>
    </nav>
  );
};

export default navDrawer;