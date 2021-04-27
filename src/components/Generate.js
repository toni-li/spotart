import React, { Component } from 'react';
import SpotifyWebPlayer from 'react-spotify-web-playback';
import * as $ from "jquery";

const token = localStorage.getItem("token")
const trackID = localStorage.getItem("trackID")
const trackURI = localStorage.getItem("trackURI")
const trackDuration = localStorage.getItem("trackDuration")

console.log(trackID)
console.log(trackDuration)

class Generate extends Component {
    render() {
        var sections = []
        window.addEventListener('load', (event) => {
            $.ajax({
                url: "https://api.spotify.com/v1/audio-analysis/" + trackID,
                type: "GET",
                beforeSend: (xhr) => {
                  xhr.setRequestHeader("Authorization", "Bearer " + token);
                },
                success: function (data) {
                    var numSections = data.sections.length
                    //console.log(numSections);
                    var i;
                    for (i = 0; i < numSections; i++) {
                        sections[i] = data.sections[i].duration * 1000
                    }

                    console.log(sections)
                }
              });
        });

        function sleep(ms) {
            return new Promise(resolve => setTimeout(resolve, ms));
        }

        var playing = false;
        function isPlaying() {
            if (playing === false) {
                playing = true;
                nextSection()
            } else {
                playing = false;
            }
            
            console.log(playing);
        }

        async function nextSection() {
            var i;
            for (i = 0; i < sections.length; i++) {
                console.log("Section: " + i);
                console.log("Duration: " + sections[i]);
                await sleep(sections[i]);
            }
        }
        
        return (
            <div id="generate">
                <p id="trackName"> {localStorage.getItem("trackName")} </p>
                <p id="trackArtist">{localStorage.getItem("trackArtist")} </p>
                <p id="trackAlbum"> Album: {localStorage.getItem("trackAlbum")} </p>

                <div id="spotifyPlayer" onClick={() => { isPlaying(); }}>
                    <SpotifyWebPlayer id="player"
                        autoPlay={false}
                        persistDeviceSelection
                        showSaveIcon
                        syncExternalDevice
                        token={token}
                        styles={{
                            sliderColor: '#1cb954',
                        }}
                        uris={[trackURI]}
                    />
                </div>
            </div>
        )
    }
}

export default Generate;