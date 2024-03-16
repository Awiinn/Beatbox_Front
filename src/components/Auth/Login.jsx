import { useState } from "react";
import { useNavigate } from "react-router";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const nav = useNavigate();

  const attemptLogin = async (e) => {
    e.preventDefault();
    setError(null);

    const credentials = { email, password };

    try {
      await credentials.unwrap();
      nav("/");
    } catch (error) {
      setError(error.data);
    }
  };

  return (
    <>
      <div className="home-main">
        <h1>Login</h1>
      </div>
      <section className="login-wrapper">
        <div className="form-wrapper">
          <form onSubmit={attemptLogin} name="Login">
            <label>Email</label>
            <br />
            <input
              type="text"
              name="email"
              onChange={(event) => {
                setEmail(event.target.value);
              }}
            />
            <br />
            <br />
            <label>Password</label>
            <br />
            <input
              type="password"
              name="password"
              onChange={(event) => {
                setPassword(event.target.value);
              }}
            />
            <br />
            <br />
            <button type="submit">Login</button>
          </form>
          <br />
          <p>
            Dont have an account?
            <button
              onClick={() => {
                nav("/register");
              }}
            >
              Register
            </button>
          </p>
          {error && <p className={"error"}>{error}</p>}
        </div>
      </section>
    </>
  );
};

export default Login;
