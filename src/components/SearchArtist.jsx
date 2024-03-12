import { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";

const ArtistCard = styled.div`
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 10px;
  margin: 10px 0;
`;

function SearchArtist() {
  const CLIENT_ID = "3419d36f85604b6fb16bc730622cd529";
  const REDIRECT_URI = "http://localhost:5173/search";
  const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";
  const RESPONSE_TYPE = "token";
  const [token, setToken] = useState("");
  const [searchKey, setSearchKey] = useState("");
  const [artists, setArtists] = useState([]);
  const [tracks, setTracks] = useState([]);
  const [selectedArtist, setSelectedArtist] = useState(null);

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

  const searchArtist = async (searchValue) => {
    try {
      const { data } = await axios.get("https://api.spotify.com/v1/search", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          q: searchValue,
          type: "artist",
        },
      });
      setArtists(data.artists.items);
    } catch (error) {
      console.error("Error searching artist:", error.message);
    }
  };

  const getTracks = (artistId) => {
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
        setSelectedArtist(artistId);
      })
      .catch((error) => {
        console.error("Error fetching tracks:", error.message);
      });
  };

  const toggleTracksVisibility = () => {
    setTracks([]);
    setSelectedArtist(null);
  };

  const handleInputChange = (e) => {
    const { value } = e.target;
    setSearchKey(value);
    if (value.trim() !== "") {
      searchArtist(value);
    } else {
      setArtists([]);
    }
  };

  return (
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
          <input
            type="text"
            value={searchKey}
            onChange={handleInputChange}
            placeholder="Search for an artist"
          />
          <div>
            {artists.map((artist) => (
              <ArtistCard key={artist.id}>
                {artist.images.length > 0 && (
                  <img
                    src={artist.images[0].url}
                    alt={artist.name}
                    style={{ width: "100px", height: "100px" }}
                  />
                )}
                <p>{artist.name}</p>
                {selectedArtist === artist.id ? (
                  <>
                    <button onClick={toggleTracksVisibility}>Hide Tracks</button>
                    <ul>
                      {tracks.map((track) => (
                        <li key={track.id}>{track.name}</li>
                      ))}
                    </ul>
                  </>
                ) : (
                  <button onClick={() => getTracks(artist.id)}>Show Tracks</button>
                )}
              </ArtistCard>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default SearchArtist;
