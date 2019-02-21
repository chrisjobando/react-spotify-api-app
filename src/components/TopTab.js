import React, { Component } from 'react';
import {NavLink} from 'react-router-dom';

import '../styling/TopTab.sass';

class TopTab extends Component {
  render() {
    return(
      <div>
        <div className="switch">
          <NavLink to="/top/tracks">See Your Top 25 Tracks</NavLink>
          <NavLink to="/top/artists">See Your Top 25 Artists</NavLink>
        </div>
      </div>
    );
  }
}
export default TopTab;