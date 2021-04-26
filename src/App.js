// https://levelup.gitconnected.com/how-to-build-a-spotify-player-with-react-in-15-minutes-7e01991bc4b6

import React, { Component } from "react";
import hash from "./hash";
import "./App.css";

import {
  BrowserRouter as Router,
  Route, Switch
  } from "react-router-dom";

import Main from "./components/Main"

export const authEndpoint = 'https://accounts.spotify.com/authorize';
// Replace with your app's client ID, redirect URI and desired scopes
const clientId = "f2a18728feb846ee96af7c0edee169b4";
const redirectUri = "http://localhost:3000/callback";
//const scopes = [];

class App extends Component {
  componentDidMount() {
    // Set token
    let _token = hash.access_token;
    if (_token) {
      // Set token
      this.setState({
        token: _token
      });
    }
  }
render() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <a
            className="btn btn--loginApp-link"
            href={`${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=token&show_dialog=true`}
          >
            Login to Spotify
          </a>

        </header>

        <Switch>
          <Route path="/callback" component={Main}/>
          <Route path="/" component={App}/>
        </Switch>
      </div>
    </Router>
  );
  }
}
export default App;