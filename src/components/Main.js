import React, { Component } from 'react';
import * as $ from "jquery";

class Main extends Component {
  render() {
    function checkURL() {
      var trackURL = document.getElementById("trackURL").value;
      if (trackURL.includes("https://open.spotify.com/track/")) {
        document.getElementById("error").innerHTML = "";
        document.getElementById("generate").style.display = "Block";
      } else {
        document.getElementById("error").innerHTML = "error - check the Track URL"
        document.getElementById("generate").style.display = "None";
      }
    }

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
          }
        });
        $.ajax({
          url: "https://api.spotify.com/v1/audio-features/" + trackURLClean,
          type: "GET",
          beforeSend: (xhr) => {
            xhr.setRequestHeader("Authorization", "Bearer " + token);
          },
          success: function (data) {
            var trackDuration = data.duration_ms
            console.log(trackDuration)
            localStorage.setItem("trackDuration", trackDuration)
            // redirect to graphic page
            window.location.replace("http://localhost:3000/generate")
          }
        });
      }
    }

    localStorage.setItem("r", 30)
    localStorage.setItem("g", 205)
    localStorage.setItem("b", 151)

    function changeSwatch() {
      var hex = document.getElementById("hexCode").value;

      if (hex.includes("#") && hex.length === 7) {
        var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        var r = parseInt(result[1], 16);
        var g = parseInt(result[2], 16);
        var b = parseInt(result[3], 16);
  
        localStorage.setItem("r", r)
        localStorage.setItem("g", g)
        localStorage.setItem("b", b)
        console.log("R:" + r);
        console.log("G:" + g);
        console.log("B:" + b);
  
        var color = "rgb(" + String(r) + ", " + String(g) + ", " + String(b) + ")"
        document.getElementById("swatch").style.backgroundColor = color;
        document.getElementById("error").innerHTML = "";
        document.getElementById("generate").style.display = "Block";
      } else {
        document.getElementById("error").innerHTML = "error - check the hex code"
        document.getElementById("generate").style.display = "None";
      }
    }

    function getRandTrack() {
      // function to get the token
      var url = window.location.href
      var tokenSplit = url.split("=")[1]
      var token = tokenSplit.split("&")[0]
      localStorage.setItem("token", token)
      //console.log(token)

      const alphabet = "abcdefghijklmnopqrstuvwxyz"
      const randomCharacter = alphabet[Math.floor(Math.random() * alphabet.length)]

      //console.log(randomCharacter)

      $.ajax({
        url: "https://api.spotify.com/v1/search?q=" + randomCharacter + "&type=track&limit=1",
        type: "GET",
        beforeSend: (xhr) => {
          xhr.setRequestHeader("Authorization", "Bearer " + token);
        },
        success: function (data) {
          var trackURL = data.tracks.items[0].external_urls.spotify
          document.getElementById("trackURL").value = trackURL;

          console.log(trackURL)
        }
      });

      document.getElementById("error").innerHTML = "";
      document.getElementById("generate").style.display = "Block";
    }

    function getRandHex() {

    }

    return (
      <div id="main">
        <div id="get-info">
          <div id="trackcont">
            <label for="trackURL" id="trackURLLabel"> Track URL: </label>
            <input type="text" id="trackURL" onBlur={() => { checkURL(); }}></input>
            <button id="randTrack" onClick={() => { getRandTrack(); }}> Randomize </button>
          </div>
          <div id="hexcont">
            <label for="hexCode" id="hexCodeLabel"> Hex Code: </label>
            <input type="text" id="hexCode" placeholder="#1ecd97" maxlength="7" onBlur={() => { changeSwatch(); }}></input>
            <div id="swatch"> </div>
            <button id="randHex"> Randomize </button>
          </div>
          <button id="generate" onClick={() => { getTrackInfo(); }}> Generate </button>
          <p id="error"> </p>
        </div>
      </div>

    )
  }
}

export default Main;