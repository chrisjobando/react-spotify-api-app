import React, {Component} from 'react';

// Styling
import '../styling/HomeTab.sass'
import '../styling/Header.sass';

class HomeTab extends Component {
    componentDidMount() {
        window.scrollTo(0,0);
    }

    render() {
        return(
            <div>
                <h1>Welcome to My Spotify Web App!</h1>
                <br/>
                <h2 className="head-h2">This is a personal project I have been working on for the
                    past couple of weeks, to learn more about ReactJS app development, get
                    practice working with APIs, and to improve my software design skills!</h2>
                <br/>
                <h2 className="head-h2">This is currently in a working Beta version, try playing
                    music on your preferred Spotify app to see how this app pairs with your
                    device for live controls and updates!
                </h2>
                <br/>
                <h2 className="head-h2">Made by: Christopher Obando</h2>
                <br/>
                <h2 className="head-h2"><a href="https://open.spotify.com/user/chrisjobando"
                target="_blank" rel="noopener noreferrer">Follow My Spotify!</a></h2>
                <h2 className="head-h2"><a href="https://github.com/chrisjobando"
                target="_blank" rel="noopener noreferrer">Follow My Github!</a></h2>
                <h2 className="head-h2"><a href="https://github.com/chrisjobando/spotify-app/tree/master/src"
                target="_blank" rel="noopener noreferrer">Link To Source Code</a></h2>
                <br/>
                <h1>Recently Played</h1>
            </div>
        );
    }
}
export default HomeTab;