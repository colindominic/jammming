import React from 'react';

let client_id = process.env.SPOTIFY_SECRET;
let redirect_uri = 'http://localhost:3000/';
let accessToken;
let expiresIn;

let Spotify = {
  getAccessToken() {
    if (accessToken) {
      return accessToken;
    } else if (window.location.href.match(/access_token=([^&]*)/) && window.location.href.match(/expires_in=([^&]*)/)) {
      accessToken = window.location.href.match(/access_token=([^&]*)/);
      expiresIn = window.location.href.match(/expires_in=([^&]*)/);

      window.setTimeout(() => accessToken = '', expiresIn * 1000);
      window.history.pushState('Access Token', null, '/');
    } else {
      let url = `https://accounts.spotify.com/authorize?client_id=${client_id}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirect_uri}`;
        window.location = url;
    }
  },

  search(term) {
    fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`, {
      headers: {Authorization: `Bearer ${accessToken}`}
    }).then(
      response => {
	       if (response.ok) {
           return response.json();
         }
       }).then(jsonResponse => {
         console.log(jsonResponse);
       });
  }

};

export default Spotify;
