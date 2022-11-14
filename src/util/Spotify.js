
//  declare an empty variable that will hold the user’s access token.
const clientId = '2179a46985774ab08f64d1f019e2b93a' ;
// const redirectUri= "http://localhost:3000/";
const redirectUri = 'https://kloofsan-jamming.netlify.app/'
let userToken;

const Spotify = {
    getAccessToken() {
       if (userToken) {
        return userToken;
       }
    
       // check for access token match
        const userTokenMatch = window.location.href.match(/access_token=([^&]*)/);
        const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);

       if (userTokenMatch && expiresInMatch ) {
            userToken = userTokenMatch[1];
            const expiresIn = Number(expiresInMatch[1])

            // Use the following code to help you wipe the access token and URL parameters
            window.setTimeout(() => userToken = '', expiresIn * 1000);
            window.history.pushState('Access Token', null, '/');
            return userToken
       }
       else {
        const accessUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectUri}`
        window.location = accessUrl;
       }
    },

    
    async search(term) {
        const accessToken = Spotify.getAccessToken()
        const response = await fetch(`https://api.spotify.com/v1/search?type=track&q=${term}` ,
            {
                headers: { Authorization: `Bearer ${accessToken}` }
            }
        );
        const jsonResponse = await response.json();
        if (!jsonResponse.tracks) {
            return [];
        }
        return jsonResponse.tracks.items.map(track => ({
            id: track.id,
            name: track.name,
            artist: track.artists[0].name,
            album: track.album.name,
            uri: track.uri
        }));

    },
    
    savePlayList(name,trackUris) {
        if(!name || !trackUris.length) {
            return;
        }

        const accessToken = Spotify.getAccessToken();
        const headers = {Authorization: `Bearer ${accessToken}`}
        let userId;

        return fetch(`https://api.spotify.com/v1/me`,
            {
              headers : headers  
            }
        ).then(response => {
            return response.json()
        }).then(jsonResponse => {
            userId = jsonResponse.id
            return fetch(`https://api.spotify.com/v1/users/${userId}/playlists`,
            {
                headers: headers,
                method: 'POST',
                body: JSON.stringify({ name: name })
            }).then(response => response.json()
            ).then(jsonResponse => {
                const playlistId = jsonResponse.id;
                return fetch(`https://api.spotify.com/v1/users/${userId}/playlists/${playlistId}/tracks` , 
                {
                    headers: headers,
                    method: 'POST',
                    body: JSON.stringify({ uris: trackUris })
                })
            })
        })

    }
}


export default Spotify;