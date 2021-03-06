let client_id = '7df0ccfd354142dfa52d811af670d95d';
let redirect_uri = 'http://colin_jammming.surge.sh/';
let url = `https://accounts.spotify.com/authorize?client_id=${client_id}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirect_uri}`;
let accessToken;
let expiresIn;

let Spotify = {
  getAccessToken() {
    if (accessToken) {
      return accessToken;
    }
    let accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
    let expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);
    if ( accessTokenMatch && expiresInMatch) {
      accessToken = accessTokenMatch[1];
      expiresIn = expiresInMatch[1];
      window.setTimeout(() => accessToken = '', expiresIn * 1000);
      window.history.pushState('Access Token', null, '/');
      return accessToken;
    } else {
        window.location = url;
    }
  },

  search(term) {
    return fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`, {
      headers: {Authorization: `Bearer ${accessToken}`}
    }).then(response => response.json())
      .then(jsonResponse => {
         if (!jsonResponse.tracks) {
           return [];
         }
         console.log(jsonResponse.tracks.items);
         return jsonResponse.tracks.items.map(track => {
           return {
             id: track.id,
             name: track.name,
             artist: track.artists[0].name,
             album: track.album.name,
             uri: track.uri};
         });
       });
  },

  /*savePlaylist(playlistName, trackURIs) {
    if (!playlistName || !trackURIs.length) {
      return;
    }
    const accessToken = Spotify.getAccessToken();
    const headers = {Authorization: `Bearer ${accessToken}`};
    let userId;
    let playlistId;

    return fetch('https://api.spotify.com/v1/me', {
      headers: headers
      }).then(response => {
  	       if (response.ok) {
             return response.json();
           }
         }).then(jsonResponse => {
              userId = jsonResponse.id;
              return fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
                        headers: headers,
                        method: 'POST',
                        data: JSON.stringify({name: playlistName})
                      }).then(response => {
                            if (response.ok){
                              return response.json();
                            }
                          }).then(jsonResponse => {
                            return playlistId = jsonResponse.id;
                          }).then(() => {
                  return fetch(`https://api.spotify.com/v1/users/${userId}/playlists/${playlistId}/tracks`, {
                            headers: headers,
                            method: 'POST',
                            data: JSON.stringify({uris: trackURIs})
                          })
          })
        });
  }*/
  savePlaylist(playlistName, trackURIs) {
     if (!playlistName || !trackURIs.length) {
       return;
     }
     const headers = {
        Authorization: `Bearer ${accessToken}`
      };
      let userId;
      let playlistId;

      fetch('https://api.spotify.com/v1/me', {
        headers: headers
      }).then(response => response.json()
      ).then(jsonResponse => userId = jsonResponse.id
      ).then(() => {

        fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify({
              name: playlistName
            })
        }).then(response => response.json()
      ).then(jsonResponse => playlistId = jsonResponse.id
      ).then(() => {

        fetch(`https://api.spotify.com/v1/users/${userId}/playlists/${playlistId}/tracks`, {
          method: 'POST',
          headers: headers,
          body: JSON.stringify({
            uris: trackURIs
          })
        });
      })
    })
  }
};

export default Spotify;
