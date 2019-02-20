import React from 'react';

import '../styling/Track.sass';

const Track = (props) => {
    return(
        <div className="track">
            <div key={props.post.id}>
                <span>
                    <a href={props.post.album.external_urls.spotify}
                    target="_blank" rel="noopener noreferrer">
                        <img src={props.post.album.images[0].url}
                            className='pic' alt='album-cover'></img>
                    </a>
                </span>
                <br/>
                <span className="info">
                    <a href={props.post.external_urls.spotify}
                        target="_blank" rel="noopener noreferrer">
                        <span className="bold">{props.index+1}. </span>
                        {props.post.name} by
                        <span className="bold"> {props.post.artists[0].name}</span>
                    </a>
                </span>
            </div>
        </div>
    )
}

export default Track;