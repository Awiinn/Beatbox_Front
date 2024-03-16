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
import { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Users from "./components/Users";
import Home from "./components/Home";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import SideBar from "./components/Sidenav";
import Search from "./components/SearchArtist";
import Music from "./components/Music/Music";
import Playlist from "./components/Music/Playlist";
import SpotifyPlayer from "./SpotifyPlayer";
import { GiHamburgerMenu } from "react-icons/gi";

function App() {
  const [token, setToken] = useState("");
  const [showSidenav, setShowSidenav] = useState(false);

  useEffect(() => {
    async function getToken() {
      try {
        const response = await fetch("/auth/token");
        const res = await response.json();
        console.log(res);
        setToken(res.access_token);
      } catch (error) {
        console.error("Error fetching token:", error);
      }
    }
    getToken();
  }, []);

  return (
    <div>
      <header>
        <div className="icon-wrapper">
          <GiHamburgerMenu onClick={() => setShowSidenav(!showSidenav)} />
        </div>
      </header>
      <SideBar show={showSidenav} />
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
