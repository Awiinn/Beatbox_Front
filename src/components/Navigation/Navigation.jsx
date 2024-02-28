import { useNavigate } from "react-router";

function Navigation() {
  const nav = useNavigate();
  return (
    <div>
      <div className="nav-container">
        <div>
          <button onClick={() => nav("/")}>Home</button>
          <button onClick={() => nav("/users")}>Users</button>
          <button onClick={() => nav("/auth")}>Login</button>
        </div>
      </div>
    </div>
  );
}

export default Navigation;
