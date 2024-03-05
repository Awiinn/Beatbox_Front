import { Route, Routes } from "react-router-dom";
import Users from "./components/Users";
import Home from "./components/Home";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import SideBar from "./components/SideBar";
import Search from "./components/SearchArtist";

function App() {
  return (
    <div>
      <SideBar />
      <Routes>
        <Route path={"/"} element={<Home />} />
        <Route path={"/users"} element={<Users />} />
        <Route path={"/login"} element={<Login />} />
        <Route path={"/register"} element={<Register />} />
        <Route path={"/search"} element={<Search />} />
      </Routes>
    </div>
  );
}

export default App;
