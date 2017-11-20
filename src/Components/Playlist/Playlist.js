import React from 'react';
import TrackList from '../TrackList/TrackList.js';
import './Playlist.css';

class Playlist extends React.Component {
  constructor(props){
    super(props);
    this.onNameChange = this.onNameChange.bind(this);
  }
  handleNameChange(event){
    this.props.onNameChange(event.target.value);
  }

  search(term) {
    console.log(term);
  }

  render () {
    return (
      <div className="Playlist">
        <input defaultValue={'New Playlist'} onChanage={this.handleNameChange}=/>
        <!-- Add a TrackList component -->
        <TrackList tracks={this.props.playlistName}
          onRemove={this.props.removeTrack} />
        <a className="Playlist-save" >SAVE TO SPOTIFY
           onClick={this.props.onSave}
        </a>
      </div>
    );
  }
}
export default Playlist;
