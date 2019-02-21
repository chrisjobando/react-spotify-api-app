import React, { Component } from 'react';
import {NavLink} from 'react-router-dom';

import Artist from './Artist';

import '../styling/TopTab.sass';

class TopTab extends Component {
  render() {
    let artistsToRender =
    this.props.state.artists
      ? this.props.state.artists.filter(artist => {
        let matchesArtist = artist.name.toLowerCase().includes(
          this.props.state.filterString.toLowerCase());
        return matchesArtist;
    }) : [];
    return(
      <div>
        <div className="switch">
          <NavLink to="/top/tracks" onClick={() => this.props.state.tracks=[]} activeClassName="activeSwitch">Top 25 Tracks</NavLink>
          <NavLink to="/top/artists" onClick={() => this.props.state.artists=[]} activeClassName="activeSwitch">Top 25 Artists</NavLink>
        </div>
        {artistsToRender.map((artist, index) => <Artist post={artist} index={index}/>)}
      </div>
    );
  }
}
export default TopTab;