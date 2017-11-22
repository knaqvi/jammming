import React from 'react';
import './App.css';
import SearchBar from '../SearchBar/SearchBar.js';
import SearchResults from '../SearchResults/SearchResults.js';
import Playlist from '../Playlist/Playlist.js';
import Spotify from '../../util/Spotify.js';

class App extends React.Component {
  constructor(props){
  super(props);
    this.state = {
      searchResults: [],
      playlistName: 'Kashif Mixtape', //Step 37
      playlistTracks: [] // Step 37
    };
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this); // Step 50
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this); // step 64
    this.search = this.search.bind(this); //step 68
  }

  addTrack(track){
    // if track (id) is not in playlistTracks add track show + and add when clicked
    if (!this.state.playlistTracks.find(playlistTrack => playlistTrack.id === track.id)) {
      this.setState({ playlistTracks: track });
    }
  }

  removeTrack(track) {
    this.setState({
      playlistTracks: this.state.playlistTracks.filter(
        playlistTrack => playlistTrack.id !== track.id)
    });
  }

  updatePlaylistName(name) {
    this.setState({ playlistName: name}); // step 56
  }

  savePlaylist() {
    const trackURIs = this.state.playlistTracks.map(playlistTrack => playlistTrack.uri); // Step 63
    Spotify.savePlaylist(this.state.playlistName, trackURIs).then(() => {
      this.setState({
        playlistName: 'New Playlist',
        searchResults: []
      });
    });
  }

  search(searchTerm) {
    Spotify.search(searchTerm).then(
      searchResults => {
        this.setState({ searchResults: searchResults })
      }
    )
  }

  render() {
    return (
    <div>
      <h1>Ja<span className="highlight">mmm</span>ing</h1>
      <div className="App">
        <SearchBar onSearch={this.search} />
        <div className="App-playlist">
          <SearchResults searchResults={this.state.searchResults}
            onAdd={this.state.addTrack} />
          <Playlist
            playlistName={this.state.playlistName}
            playlistTracks={this.state.playlistTracks}
            onRemove={this.state.removeTrack} 
            onNameChange={this.state.updatePlaylistName} />
        </div>
      </div>
    </div>
    );
  }
}

export default App;
