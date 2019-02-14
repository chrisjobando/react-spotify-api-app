import React from 'react';

/**
 * If the user is not logged in, then once clicked, the button
 *  takes you to the backend server to log you in.
 * If logged in, the button no longer displays
 * @param props part of the state object, lets component know
 *  if you are logged in or not
 */

const Login = (props) => {
    return(
        !props.loggedIn &&
            <button onClick={() => {
                window.location = window.location.href.includes('localhost')
                ? 'http://localhost:8888/login'
                : 'http://obando-spotify-backend.herokuapp.com/login'}}
            className='login-button'>Sign in with Spotify</button>
    );
}
export default Login;