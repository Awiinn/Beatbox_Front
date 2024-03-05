

import { useEffect, useState } from "react";
import axios from "axios";
function App() {
  const CLIENT_ID = "3419d36f85604b6fb16bc730622cd529";
  const REDIRECT_URI = "http://localhost:5173";
  const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";
  const RESPONSE_TYPE = "token";
  const [token, setToken] = useState("");
  const [searchKey, setSearchKey] = useState("");
  const [artists, setArtists] = useState([]);
  const [userData, setUserData] = useState(null);
  const [tracks, setTracks] = useState([]);
  const [playerData, setPlayerData] = useState(null);
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
    if (token) {
      axios
        .get("https://api.spotify.com/v1/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          setUserData(response.data);
          // console.log(response.data)
        })
        .catch((error) => {
          console.error("Error fetching user data:", error.message);
        });
      fetchPlayerData(token);
    }
  }, [token]);
  const logout = () => {
    setToken("");
    window.localStorage.removeItem("token");
  };
  const searchArtists = async (e) => {
    e.preventDefault();
    const { data } = await axios.get("https://api.spotify.com/v1/search", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        q: searchKey,
        type: "artist",
      },
    });
    setArtists(data.artists.items);
    console.log(data);
  };
  const redirectToTracks = (artistId) => {
    const accessToken = window.localStorage.getItem("token");
    if (!accessToken) {
      console.error("No access token available.");
      return;
    }
    axios
      .get(
        `https://api.spotify.com/v1/artists/${artistId}/top-tracks?country=US`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then((response) => {
        console.log(response.data);
        setTracks(response.data.tracks);
      })
      .catch((error) => {
        console.error("Error fetching tracks:", error.message);
      });
  };
  const fetchPlayerData = (accessToken) => {
    axios
      .get("https://api.spotify.com/v1/me/player", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        console.log(response.data);
        setPlayerData(response.data);
      })
      .catch((error) => {
        if (error.response && error.response.status === 401) {
          console.error("Access token expired or invalid.");
        } else {
          console.error("Error fetching player data:", error.message);
        }
      });
  };
  const renderArtists = () => {
    const filteredArtists = artists.filter(
      (artist) => artist.name.toLowerCase() === searchKey.toLowerCase()
    );
    return filteredArtists.map((artist) => (
      <div key={artist.id}>
        {artist.images.length ? (
          <>
            <img width={"100%"} src={artist.images[0].url} alt="" />
            <p>{artist.name}</p>
            <button onClick={() => redirectToTracks(artist.id)}>
              Get Tracks
            </button>
            <ul>
              {tracks.map((track) => (
                <li key={track.id}>{track.name}</li>
              ))}
            </ul>
          </>
        ) : (
          <div>No Image</div>
        )}
      </div>
    ));
  };
  return (
    <>
      <div className="App">
        <header className="App-header"></header>
        {!token ? (
          <a
            href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}`}
          >
            Login to Spotify
          </a>
        ) : (
          <>
            <button onClick={logout}>Logout </button>
            {userData && (
              <div>
                <h2>Profile</h2>
                <p>Type: {userData.type}</p>
                <p>Display Name: {userData.display_name}</p>
                <p>Followers: {userData.followers.total}</p>
              </div>
            )}
            {playerData && (
              <div>
                <h2>Player Data</h2>
                <p>Device Name: {playerData.device.name}</p>
              </div>
            )}
          </>
        )}
        {token ? (
          <form onSubmit={searchArtists}>
            <input type="text" onChange={(e) => setSearchKey(e.target.value)} />
            <button type={"submit"}>Search</button>
          </form>
        ) : (
          <h2> Please login</h2>
        )}
        {renderArtists()}
      </div>
    </>
  );
}
export default App;