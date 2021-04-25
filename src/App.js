import logo from './logo.svg';
import './App.css';
import React from 'react';
import { SpotifyApiContext } from 'react-spotify-api';
import Cookies from 'js-cookie';

import { SpotifyAuth, Scopes } from 'react-spotify-auth';
import 'react-spotify-auth/dist/index.css';

function App() {
  const token = Cookies.get('spotifyAuthToken')
  return (
    <div className="App">
      <div id="login">
        {token ? (
          <SpotifyApiContext.Provider value={token}>
            {/* Your Spotify Code here */}
            <App />
            {/* <p>You are authorized with token: {token}</p> */}
          </SpotifyApiContext.Provider>
        ) : (
          // Display the login page
          <SpotifyAuth
            redirectUri='http://localhost:3000/callback'
            clientID='f2a18728feb846ee96af7c0edee169b4'
            scopes={[Scopes.userReadPrivate, 'user-read-email']} // either style will work
          />
        )}
      </div>

      <form id="search">
        <label for="url">Spotify URL:  </label>
        <input type="text" id="url" name="url"></input> &nbsp;&nbsp;
        <input type="submit" value="GO!"></input>
      </form>







    </div>
  );
}

export default App;
