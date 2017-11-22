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
      playlistName: 'New Playlist',
      playlistTracks: []
    };
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this); // Step 50
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this); // step 64
    this.search = this.search.bind(this); //step 68
  }

  addTrack(track){
    // if track (id) is not in playlistTracks add track show + and add when clicked
    let tracks = this.state.playlistTracks;
    if (!tracks.includes(track)) {
      tracks.push(track);
      this.setState({ playlistTracks: tracks });
    }
  //  if (!this.state.playlistTracks.find(playlistTrack => playlistTrack.id === track.id)) {
  //    this.setState({ playlistTracks: track });
  }

  removeTrack(track) {
    let tracks = this.state.playlistTracks.filter(
        playlistTrack => playlistTrack.id !== track.id);
        this.setState({ playlistTracks: tracks })
  }

  updatePlaylistName(name) {
    this.setState({ playlistName: name});
  }

  savePlaylist() {
    let trackURIs = this.state.playlistTracks.map(track => track.uri);
    Spotify.savePlaylist(this.state.playlistName, trackURIs).then(searchResults => {
      this.setState({ playlistName: 'New Playlist', playlistTracks: [] });
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
            onAdd={this.addTrack} />
          <Playlist
            playlistName={this.state.playlistName}
            playlistTracks={this.state.playlistTracks}
            onRemove={this.removeTrack}
            onNameChange={this.updatePlaylistName}
            onSave={this.savePlaylist}
             />
        </div>
      </div>
    </div>
    );
  }
}

export default App;
