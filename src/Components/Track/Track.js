import React from 'react';
import './Track.css';

class Track extends React.Component {
  constructor(props){
    super(props);
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this); // Step 54
  };

  render() {
    return (
      <div className="Track">
        <div className="Track-information">
          <h3>{this.props.track.name}</h3>
          <p>{this.props.track.artist} | {this.props.track.album}</p>
        </div>
        {this.renderAction};
      </div>
    );
  }
  renderAction() {

      if(this.props.isRemoval)
      {
        return (<a className='Track-action' onClick={this.removeTrack}>-</a>); //Step 55
      }
      else
      {
        return (<a className='Track-action' onClick={this.addTrack}>+</a>); // Step 47
      }

  }
  addTrack() {
    this.props.onAdd = this.props.track;
  }
  removeTrack() { // Step 53
    this.props.onRemove = this.props.track;
  }
}
export default Track;
