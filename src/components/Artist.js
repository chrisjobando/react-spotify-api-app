import React from 'react';

import '../styling/Artist.sass';

const Artist = (props) => {
    return(
        <div className="artist">
            <div key={props.post.id}>
                <span>
                    <a href={props.post.external_urls.spotify}
                    target="_blank" rel="noopener noreferrer">
                        <img src={props.post.images[0].url}
                            className='pic' alt='artist-pic'></img>
                    </a>
                </span>
                <br/>
                <span className="info">
                    <a href={props.post.external_urls.spotify}
                        target="_blank" rel="noopener noreferrer">
                        <span className="bold">{props.index+1}. {props.post.name}</span>
                    </a>
                </span>
            </div>
        </div>
    )
}

export default Artist;