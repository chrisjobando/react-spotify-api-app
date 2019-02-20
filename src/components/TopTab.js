import React, { Component } from 'react';
import List from './TopTracks/List';

class TopTab extends Component {
    render() {
        return(
          <div>
            <List tracks={this.props.state.tracks}/>
          </div>
        );
    }
}
export default TopTab;