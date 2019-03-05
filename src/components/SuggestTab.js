import React, {Component} from 'react';
import FontAwesome from 'react-fontawesome';
import Track from './Track';

/**
 * Public Spotify Web API Wrapper
 * Includes helper functions for all Spotify endpoints
 * Source: https://github.com/JMPerez/spotify-web-api-js
 */
import SpotifyWebApi from 'spotify-web-api-js';

// npm Package that is capable of parsing query strings, such as ones in the URL
import queryString from 'query-string';

// Instantiates the wrapper
const spotify = new SpotifyWebApi();

class SuggestTab extends Component {
    constructor() {
        super();
        const params = this.getHashParams();
        const token = params.access_token;
        if (token) {
          spotify.setAccessToken(token);
        };
        this.state = {
            mood: '',
            month: '',
            sixmonth: '',
            alltime: '',

            monthTracks: '',
            sixmonthTracks: '',
            alltimeTracks: ''
        };
    }

    /**
     * @author: Christopher Obando
     * From: https://www.npmjs.com/package/query-string
     * Obtains parameters from the URL
     * @return Object with all querys
     */
    getHashParams() {
        let parsed = queryString.parse(window.location.search);
        return parsed;
    }

    componentDidMount() {
        window.scrollTo(0,0);
        this.getTopTracks();
    }

    generateMood() {
        spotify.getRecommendations({limit: 5, seed_tracks: [this.props.state.recents[0].track.id,
            this.props.state.recents[1].track.id, this.props.state.recents[2].track.id,
            this.props.state.recents[3].track.id, this.props.state.recents[4].track.id]})
        .then(result => {
            this.setState({mood: result.tracks})
            console.log(result)
        });
    }

    getTopTracks() {
        spotify.getMyTopTracks({limit: 5, time_range: 'short_term'}).then(result => {
            this.setState({
                monthTracks: result.items
            });
          });
        spotify.getMyTopTracks({limit: 5, time_range: 'medium_term'}).then(result => {
            this.setState({
                sixmonthTracks: result.items
            });
          });
        spotify.getMyTopTracks({limit: 5, time_range: 'long_term'}).then(result => {
            this.setState({
                alltimeTracks: result.items
            });
        });
    }

    generateMonth() {
        spotify.getRecommendations({limit: 5, seed_tracks: [this.state.monthTracks[0].id,
            this.state.monthTracks[1].id, this.state.monthTracks[2].id,
            this.state.monthTracks[3].id, this.state.monthTracks[4].id]})
        .then(result => this.setState({month: result.tracks}));
    }

    generateSixMonth() {
        spotify.getRecommendations({limit: 5, seed_tracks: [this.state.sixmonthTracks[0].id,
            this.state.sixmonthTracks[1].id, this.state.sixmonthTracks[2].id,
            this.state.sixmonthTracks[3].id, this.state.sixmonthTracks[4].id]})
        .then(result => this.setState({sixmonth: result.tracks}));
    }

    generateAllTime() {
        spotify.getRecommendations({limit: 5, seed_tracks: [this.state.alltimeTracks[0].id,
            this.state.alltimeTracks[1].id, this.state.alltimeTracks[2].id,
            this.state.alltimeTracks[3].id, this.state.alltimeTracks[4].id]})
        .then(result => this.setState({alltime: result.tracks}));
    }

    addMonths(date, months) {
        date.setMonth(date.getMonth() + months);
        return date;
    }

    render() {
        let pastMonth = this.addMonths(new Date(), -6).toLocaleString('en-us', { month: 'long' })

        return(
            <div style={{minHeight: '50vh'}}>
                <h1>Recommendations</h1>
                <h2>(Give it a few seconds to generate)</h2>
                <br/><br/>
                <h2 style={{fontWeight: 500}}>Based on your Recent Mood</h2>
                <button style={{marginBottom: 0}}
                    onClick={() => this.generateMood()}>
                    <FontAwesome  style={{marginRight: '5px', fontSize: '12px'}} name='sync'/>Refresh</button>
                {this.props.state.recents && !this.state.mood && this.generateMood()}
                {this.state.mood && this.state.mood.map((track, index) =>
                    <Track current={this.props.state.current} post={track} index={index} key={track.id}/>)}
                <br/>
                <h2 style={{fontWeight: 500}}>Based on your Top Played this Month</h2>
                <button style={{marginBottom: 0}}
                    onClick={() => this.generateMonth()}>
                    <FontAwesome  style={{marginRight: '5px', fontSize: '12px'}} name='sync'/>Refresh</button>
                {this.state.monthTracks && !this.state.month && this.generateMonth()}
                {this.state.month && this.state.month.map((track, index) =>
                    <Track current={this.props.state.current} post={track} index={index} key={track.id}/>)}
                <br/>
                <h2 style={{fontWeight: 500}}>Based on your Top Played since {pastMonth}</h2>
                <button style={{marginBottom: 0}}
                    onClick={() => this.generateSixMonth()}>
                    <FontAwesome  style={{marginRight: '5px', fontSize: '12px'}} name='sync'/>Refresh</button>
                {this.state.sixmonthTracks && !this.state.sixmonth && this.generateSixMonth()}
                {this.state.sixmonth && this.state.sixmonth.map((track, index) =>
                    <Track current={this.props.state.current} post={track} index={index} key={track.id}/>)}
                <br/>
                <h2 style={{fontWeight: 500}}>Based on your All-Time Favorites</h2>
                <button style={{marginBottom: 0}}
                    onClick={() => this.generateAllTime()}>
                    <FontAwesome  style={{marginRight: '5px', fontSize: '12px'}} name='sync'/>Refresh</button>
                {this.state.alltimeTracks && !this.state.alltime && this.generateAllTime()}
                {this.state.alltime && this.state.alltime.map((track, index) =>
                    <Track current={this.props.state.current} post={track} index={index} key={track.id}/>)}
            </div>
        );
    }
}
export default SuggestTab;