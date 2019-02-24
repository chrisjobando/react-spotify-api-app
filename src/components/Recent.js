import React, {Component} from 'react';

// Components
import Track from './Track';

class Recent extends Component {
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
                {tracksToRender.map((track, index) =><Track post={track.track} index={index} key={track.id}/>)}
          </div>
        );
    }
}
export default Recent;