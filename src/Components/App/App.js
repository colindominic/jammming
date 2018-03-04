import React, { Component } from 'react';
import './App.css';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {searchResults: [{
        id: 1,
        name: 'name1',
        artist: 'artist1',
        album: 'album1'
      },
      {
          id: 2,
          name: 'name2',
          artist: 'artist2',
          album: 'album2'
        }],
      playlistName: 'playlist1',
      playlistTracks: [{
          id: 'pl_1',
          name: 'pl_name1',
          artist: 'pl_artist1',
          album: 'pl_album1'
        },
        {
            id: 'pl_2',
            name: 'pl_name2',
            artist: 'pl_artist2',
            album: 'pl_album2'
          }]
    };

    this.addTrack = this.addTrack.bind(this);
  }

  addTrack(track) {
    let tracks = this.state.playlistTracks;
    tracks.find(playlistTrack => {
      if (playlistTrack.id === track.id) {
        return;
      } else {
        tracks.push(track);
        this.setState({playlistTracks: tracks});
      }
    });
  }

  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          {/*<!-- Add a SearchBar component -->*/}
          <div className="App-playlist">
          <SearchResults searchResults={this.state.searchResults} onAdd={this.addTrack}/>
          <Playlist playlistName={this.state.playlistName} playlistTracks={this.state.playlistTracks}/>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
