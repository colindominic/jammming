import React from 'react';
import './Track.css';

class Track extends React.Component {
  renderAction(isRemoval) {
    <div className="Track-action">
      if (isRemoval){
        <a>-</a>
      } else {
        <a>+</a>
      }
    </div>
  }

  render() {
    return (
      <div className="Track">
        <div className="Track-information">
          <h3>{this.props.name}</h3>
          <p>{this.props.artist} | {this.props.album}</p>
        </div>
        <a className="Track-action">{/*<!-- + or - will go here -->*/}</a>
      </div>
    );
  }
}

export default Track;
