import React from 'react';

import '../../styling/Track.sass';

const Track = (props) => {
    return(
        <div className="track">
            <div key={props.post.id}>
                <span className="info">
                    <a href={props.post.external_urls.spotify}
                        target="_blank" rel="noopener noreferrer">
                        {props.post.name}
                    </a>
                </span>
                <br />
                <span>
                    <a href={props.post.external_urls.spotify}
                    target="_blank" rel="noopener noreferrer">
                        <img src={props.post.album.images[0].url}
                            className='pic' style={{ height: 150 }}
                            alt='album-cover'></img>
                    </a>
                </span>
            </div>
        </div>
    )
}

export default Track;