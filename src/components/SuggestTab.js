import React, {Component} from 'react';


class SuggestTab extends Component {
    componentDidMount() {
        window.scrollTo(0,0);
    }

    render() {
        return(
            <div style={{minHeight: '50vh'}}>
                <h1>Recommendations</h1>
                <h2>Coming Soon...</h2>
            </div>
        );
    }
}
export default SuggestTab;