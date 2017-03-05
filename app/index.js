import _ from 'lodash';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import YTSearch from 'youtube-api-search';

// import SearchBar   from './components/search_bar';
// var SearchBar = require('SearchBar');
import SearchBar from './components/search_bar.js'

// import VideoList   from './components/video_list';
// var VideoList = require('VideoList');
import VideoList from './components/video_list.js'

// import VideoDetail from './components/video_detail';
// var VideoDetail = require('VideoDetail');
import VideoDetail from './components/video_detail.js'


const API_KEY = 'AIzaSyA3X9m1HfR9eND7uReEKkqPhggSh1nQhOE';


class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            videos: [],
            selectedVideo: null
        };

        this.videoSearch('surfboards');
    }

    videoSearch(term) {
        YTSearch({key: API_KEY, term: term}, (videos) => {
            console.log(videos);

            // this.state = ({ videos: data });
            // this.state = ({ videos: videos });
            this.setState({
                videos : videos,
                selectedVideo: videos[0]
            });
        });
    }

    render() {
        const videoSearch = _.debounce( (term) => { this.videoSearch(term) }, 300);

        return (
            <div>
                <SearchBar onSearchTermChange={ videoSearch } />
                <VideoDetail video={this.state.selectedVideo} />
                <VideoList
                    onVideoSelect={ selectedVideo => this.setState( {selectedVideo}) }
                    videos={this.state.videos} />
            </div>
        );
    }
}


// Take this component's generated HTML and put it
// on the page (in the DOM)
ReactDOM.render(<App />, document.getElementById('app'));

