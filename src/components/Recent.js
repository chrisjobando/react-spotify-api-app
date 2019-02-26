import React, {Component} from 'react';

// Components
import Track from './Track';

class Recent extends Component {
    render() {
        return(
            <div>
                {this.props.state.recents.map((track, index) =><Track current={this.props.state.current} post={track.track} index={index} key={track.id}/>)}
          </div>
        );
    }
}
export default Recent;