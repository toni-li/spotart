import React, { Component } from 'react';
import * as $ from "jquery";

var token = "";
var id = "0X5mtNbqxbiTYkwj0CQc2f"; // change to take in from user CRASH MY CAR - COIN

class Main extends Component {
  render() {
    function getTrackInfo(token, id) {
      // function to get the token
      var url = window.location.href
      var tokenSplit = url.split("=")[1]
      token = tokenSplit.split("&")[0]
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
            // console.log(data.name);
            // console.log(data.artists[0].name)
            // console.log(data.album.name)
            document.getElementById("title").innerHTML = data.name
            document.getElementById("artist").innerHTML = data.artists[0].name
            document.getElementById("album").innerHTML = data.album.name
          }
        });
      } else {
        document.getElementById("error").innerHTML = "error - check the track URL"
      }



    }

    return (
      <div id="main">
        <div id="get-info">
          Track URL: <input type="text" id="trackURL"></input>
          <button id="getTrack" onClick={() => { getTrackInfo(); }}> Generate </button>
          <p id="error"> </p>
        </div>
        <div id="track-info"> 
          <p id="title"></p>
          <p id="artist"></p>
          <p id="album"></p>
        </div>
      </div>
    )
  }
}

export default Main;