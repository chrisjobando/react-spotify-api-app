import React from 'react';
import Track from './Track.js';

const List = (props) => {
    return (
        <div>
            {
                props.tracks.map((post) =>
                    <Track post={post}/>
                )
            }
        </div>
    )
}

export default List;