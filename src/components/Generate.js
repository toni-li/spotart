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
        var beats = []
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
                    var numBeats = data.beats.length
                    //console.log(numSections);
                    var i;
                    sections[0] = data.sections[0].duration * 1000
                    loudness[0] = 1 / (data.sections[0].loudness * -1)
                    for (i = 1; i < numSections; i++) {
                        sections[i] = sections[i - 1] + data.sections[i].duration * 1000
                        loudness[i] = 1 / (data.sections[i].loudness * -1)
                    }
                    for (i = 0; i < numBeats; i++) {
                        beats[i] = data.beats[i].duration * 1000
                    }

                    console.log("Sections: " + sections)
                    console.log("Loudness: " + loudness)
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

        var time = 0;
        async function nextSection() {
            var i;
            for (i = 0; i < beats.length; i++) {
                // draw charts
                time = time + beats[i]
                //console.log(time)
                draw(time)
                await sleep(beats[i]);
            }
        }

        function getSection(time) {
            var i;
            for (i = 0; i < sections.length; i++) {
                if (time <= sections[i]) {
                    return i;
                }
            }
        }

        function draw(time) {
            // randomize the squares to fill
            var i;
            var j;
            var x;
            var y;
            var alpha;
            var id;

            // factors to normalize loudness feature
            var rmin = Math.min.apply(Math, loudness);
            var rmax = Math.max.apply(Math, loudness);
            var tmin = 5;
            var tmax = 20 * 10;

            var section = getSection(time);
            console.log("In Section: " + section)
            var loudnessFactor = Math.floor(((loudness[section] - rmin) / (rmax - rmin)) * (tmax - tmin) + tmin)
            console.log("Loudness Factor: " + loudnessFactor)

            // clearing grid
            for (i = 1; i < 21; i++) {
                for (j = 1; j < 11; j++) {
                    id = "sq" + String(i) + "-" + String(j)
                    document.getElementById(id).style.backgroundColor = "white";
                }
            }

            var alphas = [0, 0.2, 0.4, 0.6, 0.8, 1]
            var left = loudnessFactor;
            // row uno
            for (i = 0; i < Math.min(20, loudnessFactor); i++) {
                x = Math.floor(Math.random() * 20) + 1 // getting x coordinate of box
                //y = Math.floor(Math.random() * 2) + 1 // getting y coordinate of box
                alpha = Math.floor(Math.random() * 5) + 1 // getting alpha value

                id = "sq" + String(x) + "-1"
                document.getElementById(id).style.backgroundColor = "rgba(255, 0, 0, " + alphas[alpha] + ")";
            }
            // row dos
            left = loudnessFactor - 20;
            if (left > 0) {
                for (i = 0; i < Math.min(20, left); i++) {
                    x = Math.floor(Math.random() * 20) + 1 // getting x coordinate of box
                    //y = Math.floor(Math.random() * 2) + 1 // getting y coordinate of box
                    alpha = Math.floor(Math.random() * 5) + 1 // getting alpha value

                    id = "sq" + String(x) + "-2"
                    document.getElementById(id).style.backgroundColor = "rgba(255, 0, 0, " + alphas[alpha] + ")";
                }
            }
            // row tres
            left = left - 20;
            if (left > 0) {
                for (i = 0; i < Math.min(20, left); i++) {
                    x = Math.floor(Math.random() * 20) + 1 // getting x coordinate of box
                    //y = Math.floor(Math.random() * 2) + 1 // getting y coordinate of box
                    alpha = Math.floor(Math.random() * 5) + 1 // getting alpha value

                    id = "sq" + String(x) + "-3"
                    document.getElementById(id).style.backgroundColor = "rgba(255, 0, 0, " + alphas[alpha] + ")";
                }
            }
            // row char
            left = left - 20;
            if (left > 0) {
                for (i = 0; i < Math.min(20, left); i++) {
                    x = Math.floor(Math.random() * 20) + 1 // getting x coordinate of box
                    //y = Math.floor(Math.random() * 2) + 1 // getting y coordinate of box
                    alpha = Math.floor(Math.random() * 5) + 1 // getting alpha value

                    id = "sq" + String(x) + "-4"
                    document.getElementById(id).style.backgroundColor = "rgba(255, 0, 0, " + alphas[alpha] + ")";
                }
            }
            // row cinq
            left = left - 20;
            if (left > 0) {
                for (i = 0; i < Math.min(20, left); i++) {
                    x = Math.floor(Math.random() * 20) + 1 // getting x coordinate of box
                    //y = Math.floor(Math.random() * 2) + 1 // getting y coordinate of box
                    alpha = Math.floor(Math.random() * 5) + 1 // getting alpha value

                    id = "sq" + String(x) + "-5"
                    document.getElementById(id).style.backgroundColor = "rgba(255, 0, 0, " + alphas[alpha] + ")";
                }
            }
            // row six
            left = left - 20;
            if (left > 0) {
                for (i = 0; i < Math.min(20, left); i++) {
                    x = Math.floor(Math.random() * 20) + 1 // getting x coordinate of box
                    //y = Math.floor(Math.random() * 2) + 1 // getting y coordinate of box
                    alpha = Math.floor(Math.random() * 5) + 1 // getting alpha value

                    id = "sq" + String(x) + "-6"
                    document.getElementById(id).style.backgroundColor = "rgba(255, 0, 0, " + alphas[alpha] + ")";
                }
            }
            // row seven
            left = left - 20;
            if (left > 0) {
                for (i = 0; i < Math.min(20, left); i++) {
                    x = Math.floor(Math.random() * 20) + 1 // getting x coordinate of box
                    //y = Math.floor(Math.random() * 2) + 1 // getting y coordinate of box
                    alpha = Math.floor(Math.random() * 5) + 1 // getting alpha value

                    id = "sq" + String(x) + "-7"
                    document.getElementById(id).style.backgroundColor = "rgba(255, 0, 0, " + alphas[alpha] + ")";
                }
            }
            // row ba
            left = left - 20;
            if (left > 0) {
                for (i = 0; i < Math.min(20, left); i++) {
                    x = Math.floor(Math.random() * 20) + 1 // getting x coordinate of box
                    //y = Math.floor(Math.random() * 2) + 1 // getting y coordinate of box
                    alpha = Math.floor(Math.random() * 5) + 1 // getting alpha value

                    id = "sq" + String(x) + "-8"
                    document.getElementById(id).style.backgroundColor = "rgba(255, 0, 0, " + alphas[alpha] + ")";
                }
            }
            // row neuf
            left = left - 20;
            if (left > 0) {
                for (i = 0; i < Math.min(20, left); i++) {
                    x = Math.floor(Math.random() * 20) + 1 // getting x coordinate of box
                    //y = Math.floor(Math.random() * 2) + 1 // getting y coordinate of box
                    alpha = Math.floor(Math.random() * 5) + 1 // getting alpha value

                    id = "sq" + String(x) + "-9"
                    document.getElementById(id).style.backgroundColor = "rgba(255, 0, 0, " + alphas[alpha] + ")";
                }
            }
            // row dix
            left = left - 20;
            if (left > 0) {
                for (i = 0; i < Math.min(20, left); i++) {
                    x = Math.floor(Math.random() * 20) + 1 // getting x coordinate of box
                    //y = Math.floor(Math.random() * 2) + 1 // getting y coordinate of box
                    alpha = Math.floor(Math.random() * 5) + 1 // getting alpha value

                    id = "sq" + String(x) + "-10"
                    document.getElementById(id).style.backgroundColor = "rgba(255, 0, 0, " + alphas[alpha] + ")";
                }
            }


        }

        function goBack() {
            window.history.back();
        }
        return (
            <div id="graphic">
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

                <button id="back" onClick={() => { goBack(); }}> Back </button>
                <button id="share"> Share </button>

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