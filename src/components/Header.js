import React, {Component} from 'react';
import ToggleButton from './NavDrawer/ToggleButton';

import '../styling/Navbar.sass';

 class Header extends Component {
    render() {
        return(
            <header className="navbar">
                <nav className="navbar-nav">
                <div className="toggle-button">
                    <ToggleButton click={this.props.drawerClickHandler} />
                </div>
                    <div className="navbar-logo">
                        <div>
                            <a href={this.props.state.user.external_urls.spotify}
                            target='_blank'
                            rel='noopener noreferrer'>{this.props.state.user.display_name}</a>
                            <p className="logout"><a href="/">Logout</a></p>
                        </div>
                        <img onClick={() => window.scrollTo(0,0)} src={this.props.state.user.images[0].url}
                            alt='Profile Pic' className='profilePic'/>
                    </div>
                </nav>
            </header>
        );
    }
 }

export default Header;