import { Route, Routes } from "react-router-dom";
import "./index.css";
import Users from "./components/Users/Users";
import Navigation from "./components/Navigation/Navigation";
import Home from "./components/Home/Home";
import AuthForm from "./components/Auth/AuthForm";

function App() {
  return (
    <div>
      <Navigation />
      <Routes>
        <Route path={"/"} element={<Home />} />
        <Route path={"/users"} element={<Users />} />
        <Route path={"/auth"} element={<AuthForm />} />
      </Routes>
    </div>
  );
}

export default App;
