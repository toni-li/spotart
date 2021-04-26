import React, { Component } from 'react';
import * as $ from "jquery";

class Main extends Component {
  render() {
    function getTrackInfo() {
      // function to get the token
      var url = window.location.href
      var tokenSplit = url.split("=")[1]
      var token = tokenSplit.split("&")[0]
      localStorage.setItem("token", token)
      //console.log(token)

      // resetting error message
      document.getElementById("error").innerHTML = ""

      // parsing the track URL
      var trackURL = document.getElementById('trackURL').value;

      if (trackURL.includes("https://open.spotify.com/track/")) {
        var trackURLClean = trackURL.split("/")[4]
        trackURLClean = trackURLClean.split("?")[0]
        //console.log(trackURLClean)
        $.ajax({
          url: "https://api.spotify.com/v1/tracks/" + trackURLClean,
          type: "GET",
          beforeSend: (xhr) => {
            xhr.setRequestHeader("Authorization", "Bearer " + token);
          },
          success: function (data) {
            var trackID = trackURLClean
            var trackName = data.name
            var trackArtist = data.artists[0].name
            var trackAlbum = data.album.name
            var trackURI = data.uri

            console.log(trackID)
            console.log(trackName)
            console.log(trackArtist)
            console.log(trackAlbum)
            console.log(trackURI)

            localStorage.setItem("trackID", trackID)
            localStorage.setItem("trackName", trackName)
            localStorage.setItem("trackArtist", trackArtist)
            localStorage.setItem("trackAlbum", trackAlbum)
            localStorage.setItem("trackURI", trackURI)
            // redirect to graphic page
            window.location.replace("http://localhost:3000/generate")
          }
        });
      } else {
        document.getElementById("error").innerHTML = "error - check the track URL"
      }
    }
    return (
      <div id="main">
        <div className="App-header">
          <div id="get-info">
            Track URL: <input type="text" id="trackURL"></input>
            <button id="getTrack" onClick={() => { getTrackInfo(); }}> Generate </button>
            <p id="error"> </p>
          </div>
        </div>
      </div>
    )
  }
}

export default Main;