import React, { Component } from 'react';
import FontAwesome from 'react-fontawesome';
import '../styling/Filter.sass';


class Filter extends Component {
    render() {
      return(
        <div>
          <span className='search-icon'>
            <FontAwesome name='search' style={{marginRight: '10px'}} />
          </span>
          <input type="text" onKeyUp={event =>
            this.props.onTextChange(event.target.value)}
            className='search-bar'/>
        </div>
      );
    }
  }

export default Filter;