import React, { Component } from 'react';
import * as $ from "jquery";
import SpotifyWebPlayer from 'react-spotify-web-playback';

const token = localStorage.getItem("token")
const trackID = localStorage.getItem("trackID")
const trackURI = localStorage.getItem("trackURI")

class Generate extends Component {
    render() {
        window.addEventListener('load', (event) => {
            document.getElementById("trackName").innerHTML += localStorage.getItem("trackName")
            document.getElementById("trackArtist").innerHTML += localStorage.getItem("trackArtist")
            document.getElementById("trackAlbum").innerHTML += localStorage.getItem("trackAlbum")
        });
        return (
            <div id="generate">
                <p id="trackName"> Title: </p>
                <p id="trackArtist"> Artist: </p>
                <p id="trackAlbum"> Album: </p>



                    <SpotifyWebPlayer
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
        )
    }
}

export default Generate;