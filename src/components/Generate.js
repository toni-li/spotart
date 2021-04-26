import React, { Component } from 'react';
import SpotifyWebPlayer from 'react-spotify-web-playback';

const token = localStorage.getItem("token")
const trackID = localStorage.getItem("trackID")
const trackURI = localStorage.getItem("trackURI")

console.log(trackID)


class Generate extends Component {
    render() {
        window.addEventListener('load', (event) => {
            document.getElementById("trackName").innerHTML = localStorage.getItem("trackName")
            document.getElementById("trackArtist").innerHTML = localStorage.getItem("trackArtist")
            document.getElementById("trackAlbum").innerHTML = localStorage.getItem("trackAlbum")
        });
        return (
            <div id="generate">
                <p id="trackName"> </p>
                <p id="trackArtist"> </p>
                <p id="trackAlbum"> </p>

                    <SpotifyWebPlayer
                        autoPlay={true}
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