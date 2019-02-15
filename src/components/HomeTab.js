import React, {Component} from 'react';
import '../styling/HomeTab.sass'

class HomeTab extends Component {
    render() {
        return(
            <div>
                {this.props.state.tab === "HomeTab" &&
                    <div>
                        <h1>Welcome to My Spotify Web App!</h1>
                        <h2>This is in its early stages, so be patient while I read 
                            a LOT of documentation and experiment with SASS to implement
                            my vision.</h2>
                    </div>
                }
            </div>
        );
    }
}
export default HomeTab;