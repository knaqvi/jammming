import React from 'react';
import TrackList from '../TrackList/TrackList.js';
import './SearchResults.css';

class SearchResults extends React.Component {

  render () {
    return (
      <div className="SearchResults">
        <h2>Results</h2>
        <!-- Add a TrackList component -->
        <TrackList tracks={this.props.searchResults} onAdd=(this.props.addTrack)/> // step 33

      </div>
    );
  }
}
export default SearchResults;
