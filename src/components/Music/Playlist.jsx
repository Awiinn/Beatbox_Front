import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import styled from "styled-components"; 


const TrackContainer = styled.div`
  margin-top: 20px;
`;

function Playlist() {
  const CLIENT_ID = "3419d36f85604b6fb16bc730622cd529";
  const REDIRECT_URI = "http://localhost:5173/music";
  const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";
  const RESPONSE_TYPE = "token";
  const [token, setToken] = useState("");
  const { type, id } = useParams();
  const [tracks, setTracks] = useState([]);

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
        console.log("Fetched tracks:", response.data.items);
        console.log("API Response:", response);
        setTracks(response.data.items);
      } catch (error) {
        console.error("Error fetching tracks:", error.message);
      }
    };
    fetchData();
  }, [type, id, token]);

  console.log("Token:", token);
  console.log("Tracks:", tracks);

  return (
    <div>
      {!token ? (
        <a
          href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}`}
        >
          Login to Spotify
        </a>
      ) : (
        <>
          <Link to="/">Go back to homepage</Link>
          <h1>Tracks</h1>
          <TrackContainer>
            {Object.keys(tracks).length > 0 ? (
              <ul>
                {Object.keys(tracks).map((key) => (
                  <li key={key}>
                    <h2>{tracks[key].track.name}</h2>
                    {/* Render other track information here */}
                  </li>
                ))}
              </ul>
            ) : (
              <p>Loading...</p>
            )}
          </TrackContainer>
        </>
      )}
    </div>
  );
            }
              
export default Playlist;
