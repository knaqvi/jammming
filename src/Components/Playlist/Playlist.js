import React from 'react';
import TrackList from '../TrackList/TrackList.js';
import './Playlist.css';

class Playlist extends React.Component {
  constructor(props){
    super(props);
    this.handleNameChange = this.handleNameChange.bind(this); // step 60
  }
  handleNameChange(event){
    this.props.onNameChange(event.target.value); // Step 59
  }

  search(term) {
    console.log(term);
  }

  render () {
    return (
      <div className="Playlist">
        <input defaultValue={'New Playlist'} onChange={this.handleNameChange} />
        <TrackList tracks={this.props.playlistTracks}
          onRemove={this.props.removeTrack}  />
        <a className="Playlist-save" onClick={this.props.onSave} >
          SAVE TO SPOTIFY
        </a>
      </div>
    );
  }
}
export default Playlist;
