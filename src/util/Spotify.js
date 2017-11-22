const CLIENT_ID = 'e08e0ab763e54945a92465476121260a';
const REDIRECT_URI  = 'http://localhost:3000/';
let accessToken;

const Spotify = {
  getAccessToken() { // Step 78
    if(accessToken) {
      return accessToken;
    }

    const retrieveAccessToken = window.location.href.match(/access_token=([^&]*)/);
    const retrieveExpirationTime = window.location.href.match(/expires_in=([^&]*)/);

    if(retrieveAccessToken && retrieveExpirationTime) {
      accessToken = retrieveAccessToken[1];
      const expiresIn = Number(retrieveExpirationTime[1]);

      window.setTimeout(() => accessToken = '', expiresIn * 1000);
      window.history.pushState('Access Token', null, '/');
      return accessToken;
    } else {
      const accessUrl = `https://accounts.spotify.com/authorize?client_id=${CLIENT_ID}&response_type=token&scope=playlist-modify-public&redirect_uri=${REDIRECT_URI}`;
      window.location = accessUrl;
    }
  },

  search(term) {
    const accessToken = Spotify.getAccessToken();
    return fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`,
      {
        headers:
        {
        Authorization: `Bearer ${accessToken}`
        }
      }).then(response => {
        return response.json();
      }).then(jsonResponse => {
        if (!jsonResponse.tracks) {
          return [];
        }
        return jsonResponse.tracks.items.map(track => ({
          id:     track.id,
          name:   track.name,
          artist: track.artists[0].name,
          album:  track.album.name,
          uri:    track.uri
        }));
      });
  },

  savePlaylist(name, trackURIs) {
    if(!name || !trackURIs.length) {
      return;
    }
    const accessToken = Spotify.getAccessToken();
    const headers = { Authorization: `Bearer ${accessToken}`};
    let userID;
  //let playlistID;

    return fetch(`https://api.spotify.com/v1/me`,
      {
        headers: headers
      }
    ).then(response => response.json()
    ).then(jsonResponse => {
        userID = jsonResponse.id;
        // headers: {"Content-type": "application/json"},
        //headers['Content-Type'] = 'application/json';
        //let bodyString = JSON.stringify({ name: JSON.stringify(playlist) });
        return fetch(`https://api.spotify.com/v1/users/${userID}/playlists`,
        {
          method: 'POST',
          headers: headers,
          body: JSON.stringify({ name: name })
        }).then(response => response.json()
      ).then(jsonResponse => {
        const playlistID = jsonResponse.id;
        fetch(`https://api.spotify.com/v1/users/${userID}/playlists/${playlistID}/tracks`,
          {
            method: 'POST',
            headers: headers,
            body: JSON.stringify({ uris: trackURIs })
          }).then(
            response => {
              if(response.ok)
              {
                return response.json()
              }
              throw new Error('Adding track to playlist failed...');
            });
        });
    });
 }
};
export default Spotify;
