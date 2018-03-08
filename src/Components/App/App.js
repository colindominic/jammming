import React, { Component } from 'react';
import './App.css';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';
import SearchBar from '../SearchBar/SearchBar';
import {Spotify} from '../../util/Spotify';

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
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName =this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
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

  removeTrack(track) {
    let tracks = this.state.playlistTracks;
    tracks.find(playlistTrack => {
      if (playlistTrack.id === track.id) {
        let trackIndex = tracks.indexOf(playlistTrack);
        tracks.splice(trackIndex, 1);
        this.setState({playlistTracks: tracks});
      } else {
        return;
      }
    });
  }

  updatePlaylistName(name) {
    this.setState({playlistName: name});
  }

  savePlaylist() {
    let trackURIs = [];
  }

  Spotify.search(term) {
    console.log(term);
  }

  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar onSearch={this.search}/>
          <div className="App-playlist">
          <SearchResults searchResults={this.state.searchResults} onAdd={this.addTrack}/>
          <Playlist playlistName={this.state.playlistName} playlistTracks={this.state.playlistTracks} onRemove={this.removeTrack} onNameChange={this.updatePlaylistName} onSave={this.savePlaylist}/>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
