import React, { Component } from 'react';

class Share extends Component {
  render() {
    return (
      <div id="sharePage">
        <div id="share-info">
            <p id="buffer"> buffer</p>
            <p> {localStorage.getItem("trackName")} </p>
            <p> {localStorage.getItem("trackArtist")} - {localStorage.getItem("trackAlbum")} </p>
        </div>

        <div id="containers">
            <div id="left">
                
            </div>
            <div id="mid">

            </div>
            <div id="right">

            </div>
        </div>
      </div>

    )
  }
}

export default Share;