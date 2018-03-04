import React from 'react';
import './TrackList.css';
import Track from '../Track/Track';

class TrackList extends React.Component {
  render() {
    console.log(this.props.tracks);
    return (
      <div className="TrackList">
        this.props.tracks.map(track => {
          return <Track key={this.props.track.id} name={this.props.track.name} artist={this.props.track.artist} album={this.props.track.album} />
        });
      </div>
    );
  }
}

export default TrackList;
