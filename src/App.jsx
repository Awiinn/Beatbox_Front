// import { Route, Routes } from "react-router-dom";
// import Users from "./components/Users";
// import Home from "./components/Home";
// import Login from "./components/Auth/Login";
// import Register from "./components/Auth/Register";
// import SideBar from "./components/SideBar";
// import Search from "./components/SearchArtist";
// import Music from "./components/Music/Music";
// import Playlist from "./components/Music/Playlist";

// function App() {
//   return (
//     <div>
//       <SideBar />
//       <Routes>
//         <Route path={"/"} element={<Home />} />
//         <Route path={"/home"} element={<Home />} />
//         <Route path={"/users"} element={<Users />} />
//         <Route path={"/login"} element={<Login />} />
//         <Route path={"/register"} element={<Register />} />
//         <Route path={"/search"} element={<Search />} />
//         <Route path={"/music/:type/:id"} element={<Music />} />
//         <Route path={"/music"} element={<Music />} />
//         <Route path={"/playlist/:type/:id"} element={<Playlist />} />
//       </Routes>
//     </div>
//   );
// }

// export default App;
import React, { useState, useEffect } from 'react';
import { Route, Routes } from "react-router-dom";
import Users from "./components/Users";
import Home from "./components/Home";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import SideBar from "./components/SideBar";
import Search from "./components/SearchArtist";
import Music from "./components/Music/Music";
import Playlist from "./components/Music/Playlist";
import SpotifyPlayer from './SpotifyPlayer';


function App() {
  const [token, setToken] = useState('');

  useEffect(() => {
    async function getToken() {
      try {
        const response = await fetch('/auth/token');
        const json = await response.json();
        setToken(json.access_token);
      } catch (error) {
        console.error('Error fetching token:', error);
      }
    }
    getToken();
  }, []);

  return (
    <div>
      <SideBar />
      <Routes>
        <Route path={"/"} element={<Home />} />
        <Route path={"/home"} element={<Home />} />
        <Route path={"/users"} element={<Users />} />
        <Route path={"/login"} element={<Login />} />
        <Route path={"/register"} element={<Register />} />
        <Route path={"/search"} element={<Search />} />
        <Route path={"/music/:type/:id"} element={<Music />} />
        <Route path={"/music"} element={<Music />} />
        <Route path={"/playlist/:type/:id"} element={<Playlist />} />
      </Routes>
      {token && <SpotifyPlayer token={token} />}
    </div>
  );
}

export default App;
