import React, { Component } from 'react';
import {NavLink} from 'react-router-dom';

import '../styling/TopTab.sass';

class TopTab extends Component {
  render() {
    return(
      <div style={{height: '50vh'}}>
        <div className="switch">
          <NavLink to={{pathname: '/top/tracks/medium_term', search: window.location.search}}>See Your Top 25 Tracks</NavLink>
          <NavLink to={{pathname: '/top/artists/medium_term', search: window.location.search}}>See Your Top 25 Artists</NavLink>
        </div>
      </div>
    );
  }
}
export default TopTab;