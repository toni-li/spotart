import React, { Component } from 'react';

export const authEndpoint = 'https://accounts.spotify.com/authorize';
// Replace with your app's client ID, redirect URI and desired scopes
const clientId = "f2a18728feb846ee96af7c0edee169b4";
//const redirectUri = "http://localhost:3000/callback";
const redirectUri = "https://theartspot.herokuapp.com/callback";
const scopes = [
    'streaming',
    'user-read-email',
    'user-read-private',
    'user-library-read',
    'user-library-modify',
    'user-read-playback-state',
    'user-modify-playback-state',
];

class Login extends Component {
    render() {
        return (
            <div className="App">
            <div className="App-header">
              <a
                className="btn btn--loginApp-link"
                href={`${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join("%20")}&response_type=token&show_dialog=true`}
              >
                Login to Spotify
            </a>
            </div>
          </div>
        )
    }
}

export default Login;