const CLIENT_ID = 'e08e0ab763e54945a92465476121260a';
const REDIRECT_URI  = 'http://localhost:3000/';
let accessToken;

const Spotify = {
  getAccessToken() { // Step 78
    const retrieveAccessToken = window.location.href.match(/access_token=([^&]*)/);
    const retrieveExpirationTime = window.location.href.match(/expires_in=([^&]*)/);

    if(accessToken) {
      return accessToken;
    };

    if(retrieveAccessToken && retrieveExpirationTime) {
      accessToken = retrieveAccessToken[1];
      const expiresIn = Number (retrieveExpirationTime[1]);
      window.setTimeout(() => accessToken = '', expiresIn * 1000);
      window.history.pushState('Access Token', null, '/');
    } else {
      const accessUrl = `https://accounts.spotify.com/authorize?client_id=${CLIENT_ID}&response_type=token&scope=playlist-modify-public&redirect_uri=${REDIRECT_URI}`;
      window.location = accessUrl;
    }
  },
  search(term) {
    Spotify.getAccessToken();
    return fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`,
      {
        headers:
        {
        Authorization: `Bearer ${accessToken}`
        }
      }).then(
        response => response.json()
      ).then(
      responseJSON => {
        return responseJSON.tracks.items.map(track => ({
          id:     track.id,
          name:   track.name,
          artist: track.artists[0].name,
          album:  track.album.name,
          uri:    track.uri
        }));
      }
    );
  },
  savePlaylist(playlist, trackURIs) {
    if(!playlist || !trackURIs) {
      return;
    };
    const accessToken = Spotify.getAccessToken();
    const headers = { Authorization: `Bearer ${accessToken}`};
    let userID;
    let playlistID;

    return fetch(`https://api.spotify.com/v1/me`,
      {
        headers: headers
      }
    ).then(
      response => {
        if(response.ok) {
          return response.json()
        }
        throw new Error('Getting User ID failed...');
      }
    ).then(responseJSON => {
        userID = responseJSON.id;
        // headers: {"Content-type": "application/json"},
        headers['Content-Type'] = 'application/json';
        let body = JSON.stringify({ name: JSON.stringify(playlist) });

        return fetch(`https://api.spotify.com/v1/users/${userID}/playlists`,
        {
          method: 'POST',
          headers: headers,
          body: body
        }).then(response =>
          {
            if (response.ok)
            {
              return response.json()
            }
            throw new Error('Creating playlist failed...')
          }
    ).then(
      responseJSON => {
        playlistID = responseJSON.id;
        body = JSON.stringify({ uris: trackURIs });
        fetch(`https://api.spotify.com/v1/users/${userID}/playlists/${playlistID}/tracks`,
          {
            method: 'POST',
            headers: headers,
            body: body
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
}
export default Spotify;
