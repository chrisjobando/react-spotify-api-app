import React, { Component } from 'react';
import {NavLink} from 'react-router-dom';

import Track from './Track';

import '../styling/TopTab.sass';

class TopTab extends Component {
  render() {
    let tracksToRender =
    this.props.state.tracks
      ? this.props.state.tracks.filter(track => {
        let matchesArtist = track.artists[0].name.toLowerCase().includes(
          this.props.state.filterString.toLowerCase());
        return matchesArtist;
      }) : [];
    return(
      <div>
        <div className="switch">
          <NavLink to="/top/tracks">Top 25 Tracks</NavLink>
          <NavLink to="/top/artists">Top 25 Artists</NavLink>
        </div>
        
        {tracksToRender.map((track, index) =><Track post={track} index={index}/>)}
      </div>
    );
  }
}
export default TopTab;