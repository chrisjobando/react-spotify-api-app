import React, { Component } from 'react';
import Track from './TopTracks/Track';

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
            <button>Top 25 Tracks</button>
            <button>Top 25 Artists</button>
          </div>
          {tracksToRender.map((track, index) => <Track post={track} index={index}/>)}
        </div>
      );
    }
}
export default TopTab;