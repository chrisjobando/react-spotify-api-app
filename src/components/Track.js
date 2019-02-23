import React from 'react';

import '../styling/Track.sass';

const Track = (props) => {
    let track = props.post;
    return(
        <div className="track">
            <div key={track.id}>
                <span>
                    <a href={track.album.external_urls.spotify}
                    target="_blank" rel="noopener noreferrer">
                        <img src={track.album.images[0].url}
                            className='pic' alt='album-cover'></img>
                    </a>
                </span>
                <br/>
                <span className="info">
                    <a href={track.external_urls.spotify}
                        target="_blank" rel="noopener noreferrer">
                        <span className="bold">{props.index+1}. </span>
                        {track.name} <br/>
                    </a>
                    <a href={track.artists[0].external_urls.spotify}
                        target="_blank" rel="noopener noreferrer">
                        <span className="bold"> {track.artists[0].name}</span>
                    </a>
                </span>
            </div>
        </div>
    )
}

export default Track;