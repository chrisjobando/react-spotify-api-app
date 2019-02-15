import React, { Component } from 'react';
import '../../styling/Filter.sass';


class Filter extends Component {
    render() {
      return(
        <div>
          <span className='search-icon'>
            <i className="fas fa-search"></i>
          </span>
          <input type="text" onKeyUp={event =>
            this.props.onTextChange(event.target.value)}
            className='search-bar'/>
        </div>
      );
    }
  }

export default Filter;