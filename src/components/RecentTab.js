import React, {Component} from 'react';

// Styling


// Components
import Track from './Track';

class HomeTab extends Component {
    render() {
        let tracksToRender =
        this.props.state.recents
          ? this.props.state.recents.filter(track => {
            let matchesArtist = track.track.name.toLowerCase().includes(
              this.props.state.filterString.toLowerCase());
            return matchesArtist;
          }) : [];
        return(
            <div>
                {tracksToRender.map((track, index) =><Track post={track.track} index={index}/>)}
          </div>
        );
    }
}
export default HomeTab;