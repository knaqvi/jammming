import React from 'react';
import './App.css';
import SearchBar from '../Components/SearchBar/SearchBar.js';
import SearchResults from '../Components/SearchResults/SearchResults.js';
import Playlist from '../Components/Playlist/Playlist.js';


class App extends React.Component {
  constructor(props){
  super(props);
    this.state = {
      searchResults: [{
        name: 'While My Guitar Gently Weeps',
        artist: 'The Beatles',
        album: 'The Beatles'
      }],
    };
  this.SearchResults = this.searchResults.bind(this);
  }

  render {
    return (
    <div>
      <h1>Ja<span className="highlight">mmm</span>ing</h1>
      <div className="App">
        <!-- Add a SearchBar component -->
        <div className="App-playlist">
          <!-- Add a SearchResults component -->
          <!-- Add a Playlist component -->
        </div>
      </div>
    </div>
    );
  }
}

export default App;
