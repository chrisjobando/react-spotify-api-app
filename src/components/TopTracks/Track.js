import React from 'react';

const Track = (props) => {
    return(
        <div>
            <div key={props.post.id}>
                <span>
                    <a href={props.post.artists[0].external_urls.spotify}
                        target="_blank" rel="noopener noreferrer">
                        {props.post.artists[0].name}
                    </a>: <a href={props.post.external_urls.spotify}
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