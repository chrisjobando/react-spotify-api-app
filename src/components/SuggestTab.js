import React, {Component} from 'react';

class SuggestTab extends Component {
    componentDidMount() {
        window.scrollTo(0,0);
    }

    render() {
        return(
            <div style={{minHeight: '50vh'}}>
                <h1>Recommendations</h1>
                <br/>
                <h2>Based on your Recent Mood</h2>
                <br/>
                <h2>Based on your Listening Habits this Month</h2>
                <br/>
                <h2>Based on your Listening Habits for the Past 6 Months</h2>
                <br/>
                <h2>Based on your All-Time Favorites</h2>
            </div>
        );
    }
}
export default SuggestTab;