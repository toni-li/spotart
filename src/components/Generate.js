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
        var loudness = []
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
                        loudness[i] = data.sections[i].loudness
                    }

                    console.log(sections)
                    console.log(loudness)
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
                // draw charts
                draw()
                await sleep(sections[i]);
            }
        }

        function draw() {
            // decide on number of squares to fill based on loudness factor
            var loudnessFactor = 50;
            // randomize the squares to fill
            var i;
            var x;
            var y;
            var id;
            for (i = 0; i < loudnessFactor; i++) {
                x = Math.floor(Math.random() * 20) + 1 // getting x coordinate of box
                y = Math.floor(Math.random() * 10) + 1 // getting y coordinate of box
                id = "sq" + String(x) + "-" + String(y)
                console.log(id)
                document.getElementById(id).style.backgroundColor = "red";
            }
        }
        
        return (
            <div id="generate">
                <div id="track-info">
                    <p id="buffer"> buffer</p>
                    <p id="trackName"> Track: {localStorage.getItem("trackName")} </p>
                    <p id="trackArtist"> Artist: {localStorage.getItem("trackArtist")} </p>
                    <p id="trackAlbum"> Album: {localStorage.getItem("trackAlbum")} </p>
                </div>

                <div id="chart">
                    <div id="sq1-1">  </div>
                    <div id="sq1-2">  </div>
                    <div id="sq1-3">  </div>
                    <div id="sq1-4">  </div>
                    <div id="sq1-5">  </div>
                    <div id="sq1-6">  </div>
                    <div id="sq1-7">  </div>
                    <div id="sq1-8">  </div>
                    <div id="sq1-9">  </div>
                    <div id="sq1-10">  </div>
                    <div id="sq2-1">  </div>
                    <div id="sq2-2">  </div>
                    <div id="sq2-3">  </div>
                    <div id="sq2-4">  </div>
                    <div id="sq2-5">  </div>
                    <div id="sq2-6">  </div>
                    <div id="sq2-7">  </div>
                    <div id="sq2-8">  </div>
                    <div id="sq2-9">  </div>
                    <div id="sq2-10">  </div>
                    <div id="sq3-1">  </div>
                    <div id="sq3-2">  </div>
                    <div id="sq3-3">  </div>
                    <div id="sq3-4">  </div>
                    <div id="sq3-5">  </div>
                    <div id="sq3-6">  </div>
                    <div id="sq3-7">  </div>
                    <div id="sq3-8">  </div>
                    <div id="sq3-9">  </div>
                    <div id="sq3-10">  </div>
                    <div id="sq4-1">  </div>
                    <div id="sq4-2">  </div>
                    <div id="sq4-3">  </div>
                    <div id="sq4-4">  </div>
                    <div id="sq4-5">  </div>
                    <div id="sq4-6">  </div>
                    <div id="sq4-7">  </div>
                    <div id="sq4-8">  </div>
                    <div id="sq4-9">  </div>
                    <div id="sq4-10">  </div>
                    <div id="sq5-1">  </div>
                    <div id="sq5-2">  </div>
                    <div id="sq5-3">  </div>
                    <div id="sq5-4">  </div>
                    <div id="sq5-5">  </div>
                    <div id="sq5-6">  </div>
                    <div id="sq5-7">  </div>
                    <div id="sq5-8">  </div>
                    <div id="sq5-9">  </div>
                    <div id="sq5-10">  </div>
                    <div id="sq6-1">  </div>
                    <div id="sq6-2">  </div>
                    <div id="sq6-3">  </div>
                    <div id="sq6-4">  </div>
                    <div id="sq6-5">  </div>
                    <div id="sq6-6">  </div>
                    <div id="sq6-7">  </div>
                    <div id="sq6-8">  </div>
                    <div id="sq6-9">  </div>
                    <div id="sq6-10">  </div>
                    <div id="sq7-1">  </div>
                    <div id="sq7-2">  </div>
                    <div id="sq7-3">  </div>
                    <div id="sq7-4">  </div>
                    <div id="sq7-5">  </div>
                    <div id="sq7-6">  </div>
                    <div id="sq7-7">  </div>
                    <div id="sq7-8">  </div>
                    <div id="sq7-9">  </div>
                    <div id="sq7-10">  </div>
                    <div id="sq8-1">  </div>
                    <div id="sq8-2">  </div>
                    <div id="sq8-3">  </div>
                    <div id="sq8-4">  </div>
                    <div id="sq8-5">  </div>
                    <div id="sq8-6">  </div>
                    <div id="sq8-7">  </div>
                    <div id="sq8-8">  </div>
                    <div id="sq8-9">  </div>
                    <div id="sq8-10">  </div>
                    <div id="sq9-1">  </div>
                    <div id="sq9-2">  </div>
                    <div id="sq9-3">  </div>
                    <div id="sq9-4">  </div>
                    <div id="sq9-5">  </div>
                    <div id="sq9-6">  </div>
                    <div id="sq9-7">  </div>
                    <div id="sq9-8">  </div>
                    <div id="sq9-9">  </div>
                    <div id="sq9-10">  </div>
                    <div id="sq10-1">  </div>
                    <div id="sq10-2">  </div>
                    <div id="sq10-3">  </div>
                    <div id="sq10-4">  </div>
                    <div id="sq10-5">  </div>
                    <div id="sq10-6">  </div>
                    <div id="sq10-7">  </div>
                    <div id="sq10-8">  </div>
                    <div id="sq10-9">  </div>
                    <div id="sq10-10">  </div>
                    <div id="sq11-1">  </div>
                    <div id="sq11-2">  </div>
                    <div id="sq11-3">  </div>
                    <div id="sq11-4">  </div>
                    <div id="sq11-5">  </div>
                    <div id="sq11-6">  </div>
                    <div id="sq11-7">  </div>
                    <div id="sq11-8">  </div>
                    <div id="sq11-9">  </div>
                    <div id="sq11-10">  </div>
                    <div id="sq12-1">  </div>
                    <div id="sq12-2">  </div>
                    <div id="sq12-3">  </div>
                    <div id="sq12-4">  </div>
                    <div id="sq12-5">  </div>
                    <div id="sq12-6">  </div>
                    <div id="sq12-7">  </div>
                    <div id="sq12-8">  </div>
                    <div id="sq12-9">  </div>
                    <div id="sq12-10">  </div>
                    <div id="sq13-1">  </div>
                    <div id="sq13-2">  </div>
                    <div id="sq13-3">  </div>
                    <div id="sq13-4">  </div>
                    <div id="sq13-5">  </div>
                    <div id="sq13-6">  </div>
                    <div id="sq13-7">  </div>
                    <div id="sq13-8">  </div>
                    <div id="sq13-9">  </div>
                    <div id="sq13-10">  </div>
                    <div id="sq14-1">  </div>
                    <div id="sq14-2">  </div>
                    <div id="sq14-3">  </div>
                    <div id="sq14-4">  </div>
                    <div id="sq14-5">  </div>
                    <div id="sq14-6">  </div>
                    <div id="sq14-7">  </div>
                    <div id="sq14-8">  </div>
                    <div id="sq14-9">  </div>
                    <div id="sq14-10">  </div>
                    <div id="sq15-1">  </div>
                    <div id="sq15-2">  </div>
                    <div id="sq15-3">  </div>
                    <div id="sq15-4">  </div>
                    <div id="sq15-5">  </div>
                    <div id="sq15-6">  </div>
                    <div id="sq15-7">  </div>
                    <div id="sq15-8">  </div>
                    <div id="sq15-9">  </div>
                    <div id="sq15-10">  </div>
                    <div id="sq16-1">  </div>
                    <div id="sq16-2">  </div>
                    <div id="sq16-3">  </div>
                    <div id="sq16-4">  </div>
                    <div id="sq16-5">  </div>
                    <div id="sq16-6">  </div>
                    <div id="sq16-7">  </div>
                    <div id="sq16-8">  </div>
                    <div id="sq16-9">  </div>
                    <div id="sq16-10">  </div>
                    <div id="sq17-1">  </div>
                    <div id="sq17-2">  </div>
                    <div id="sq17-3">  </div>
                    <div id="sq17-4">  </div>
                    <div id="sq17-5">  </div>
                    <div id="sq17-6">  </div>
                    <div id="sq17-7">  </div>
                    <div id="sq17-8">  </div>
                    <div id="sq17-9">  </div>
                    <div id="sq17-10">  </div>
                    <div id="sq18-1">  </div>
                    <div id="sq18-2">  </div>
                    <div id="sq18-3">  </div>
                    <div id="sq18-4">  </div>
                    <div id="sq18-5">  </div>
                    <div id="sq18-6">  </div>
                    <div id="sq18-7">  </div>
                    <div id="sq18-8">  </div>
                    <div id="sq18-9">  </div>
                    <div id="sq18-10">  </div>
                    <div id="sq19-1">  </div>
                    <div id="sq19-2">  </div>
                    <div id="sq19-3">  </div>
                    <div id="sq19-4">  </div>
                    <div id="sq19-5">  </div>
                    <div id="sq19-6">  </div>
                    <div id="sq19-7">  </div>
                    <div id="sq19-8">  </div>
                    <div id="sq19-9">  </div>
                    <div id="sq19-10">  </div>
                    <div id="sq20-1">  </div>
                    <div id="sq20-2">  </div>
                    <div id="sq20-3">  </div>
                    <div id="sq20-4">  </div>
                    <div id="sq20-5">  </div>
                    <div id="sq20-6">  </div>
                    <div id="sq20-7">  </div>
                    <div id="sq20-8">  </div>
                    <div id="sq20-9">  </div>
                    <div id="sq20-10">  </div>

                </div>


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