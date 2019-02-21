import React, { Component } from 'react';
import {NavLink} from 'react-router-dom';

import '../styling/TopTab.sass';

class TopTab extends Component {
  render() {
    return(
      <div>
        <h2>See your top 25 tracks/artists!</h2>
        <br/>
        <div className="switch">
          <NavLink to="/top/tracks">Top 25 Tracks</NavLink>
          <NavLink to="/top/artists">Top 25 Artists</NavLink>
        </div>
      </div>
    );
  }
}
export default TopTab;