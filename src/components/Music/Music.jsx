import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
import SpotifyPlayer from "../../SpotifyPlayer";

const TrackContainer = styled.div`
  margin-top: 20px;
`;

function Music() {
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
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://api.spotify.com/v1/${type}/${id}/tracks`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setTracks(response.data.items);
      } catch (error) {
        console.error("Error fetching tracks:", error.message);
      }
    };
    fetchData();
  }, [type, id, token]);

  return (
    <div>
      <Link to="/">Go back to Home</Link>
      {!token ? (
        <a
          href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}`}
        >
          Login to Spotify
        </a>
      ) : (
        <>
          {/* Render WebPlayback component with token prop */}
          <SpotifyPlayer token={token} setControls={setPlayerControls} />
          <h1>Tracks</h1>
          <TrackContainer>
            {tracks.length > 0 ? (
              <ul>
                {tracks.map((track) => (
                  <li key={track.id}>
                    <h2>{track.name}</h2>
                    <p>
                      Artist:{" "}
                      {track.artists
                        ? track.artists.map((artist) => artist.name).join(", ")
                        : "Unknown"}
                    </p>
                    {track.album &&
                      track.album.images &&
                      track.album.images.length > 0 && (
                        <img
                          src={track.album.images[0].url}
                          alt="Album Cover"
                          style={{ width: 100, height: 100 }}
                        />
                      )}
                  </li>
                ))}
              </ul>
            ) : (
              <p>Loading...</p>
            )}
          </TrackContainer>
          {/* Render playback control buttons */}
          {playerControls && (
            <div>
              <button onClick={() => playerControls.togglePlayback()}>
                {playerControls.isPaused ? "Play" : "Pause"}
              </button>
              <button onClick={() => playerControls.previousTrack()}>
                Previous
              </button>
              <button onClick={() => playerControls.nextTrack()}>Next</button>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default Music;
