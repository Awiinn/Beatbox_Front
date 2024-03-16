import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function SpotifyPlayer() {
  const CLIENT_ID = "3419d36f85604b6fb16bc730622cd529";
  const REDIRECT_URI = "http://localhost:5173/music";
  const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";
  const RESPONSE_TYPE = "token";
  const [token, setToken] = useState("");
  const { type, id } = useParams();
  const [tracks, setTracks] = useState([]);
  const [playerControls, setPlayerControls] = useState(null);

  useEffect(() => {
    const hash = window.location.hash;
    let token = window.localStorage.getItem("token");
    if (!token && hash) {
      token = hash
        .substring(1)
        .split("&")
        .find((elem) => elem.startsWith("access_token"))
        .split("=")[1];
      window.location.hash = "";
      window.localStorage.setItem("token", token);
    }
    setToken(token);

    // Load Spotify Web Playback SDK script when the component mounts
    const script = document.createElement("script");
    script.src = "https://sdk.scdn.co/spotify-player.js";
    script.async = true;

    document.body.appendChild(script);

    // Clean up: remove the script when the component unmounts
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  useEffect(() => {
    if (token) {
      // Initialize Spotify Web Playback SDK when token is available
      if (window.Spotify) {
        // Spotify SDK script has been loaded
        window.onSpotifyWebPlaybackSDKReady = () => {
          const player = new window.Spotify.Player({
            name: "Web Playback SDK Player",
            getOAuthToken: (cb) => {
              cb(token);
            },
          });

          // Add listeners and other initialization logic here
          // For example:
          player.addListener("ready", ({ device_id }) => {
            console.log("Player ready with Device ID:", device_id);
            setPlayerControls(player);
          });

          player.addListener("not_ready", ({ device_id }) => {
            console.log("Device ID has gone offline:", device_id);
            setPlayerControls(null);
          });

          player.connect();
        };
      } else {
        console.error("Spotify Web Playback SDK script not loaded");
      }
    }
  }, [token]);

  // Your component JSX goes here
  return <div id="spotify-player"></div>;
}

export default SpotifyPlayer;
