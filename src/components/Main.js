import React, { Component } from 'react';
import * as $ from "jquery";

class Main extends Component {
    getTrackInfo(token, id) {
        // Make a call using the token
        $.ajax({
          url: "https://api.spotify.com/v1/tracks/" + id,
          type: "GET",
          beforeSend: (xhr) => {
            xhr.setRequestHeader("Authorization", "Bearer " + token);
          },
          success: (data) => {
            this.setState({
              name: data.name,
            //   is_playing: data.is_playing,
            //   progress_ms: data.progress_ms,
            });
          }
        });
      }
    render() {
        return (
        <div id="main">
            <p> stuff will go here </p>

        </div>
        )
    }
}

export default Main;