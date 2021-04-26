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
        $.ajax({
          url: "https://api.spotify.com/v1/tracks/0X5mtNbqxbiTYkwj0CQc2f",
          type: "GET",
          beforeSend: (xhr) => {
            xhr.setRequestHeader("Authorization", "Bearer " + token);
          },
          success: function(data) {
              console.log(data.name);
              console.log(data.artists[0].name)
              console.log(data.album.name)
          }
      });
      }

        return (
        <div id="main">
            <button id="getTrack" onClick={() => { getTrackInfo(); }}> Get Track Info </button> 
        </div>
        )
    }
}

export default Main;