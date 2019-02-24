import React from 'react';
import {NavLink} from 'react-router-dom';

import '../styling/Artist.sass';

const Artist = (props) => {
    return(
        <div className="artist">
            <div key={props.post.id}>
                <span>
                    <NavLink to={{pathname:"/artist_details",
                        state:{artist: props.post}, search: window.location.search}}>
                        <img src={props.post.images[0].url}
                            className='pic' alt='artist-pic'></img>
                    </NavLink>
                </span>
                <br/>
                <span className="info">
                    <span className="bold">{props.index+1}. {props.post.name}</span>
                </span>
            </div>
        </div>
    )
}

export default Artist;