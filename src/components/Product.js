import React, { Component } from 'react';

class Product extends Component {
    render () {
        return(
        <div>
            <h2>
            {this.props.accountType} Account
            </h2>
        </div>
        );
    }
}

export default Product;
