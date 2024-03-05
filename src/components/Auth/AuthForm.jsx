import { useState } from "react";
import { useLoginMutation, useRegisterMutation } from "../../redux/api/authApi";
import { useNavigate } from "react-router-dom";

function AuthForm() {
  const [login] = useLoginMutation();
  const [register] = useRegisterMutation();
  const [error, setError] = useState(null);

  const [email, setEmail] = useState(null); // Initialize to null instead of ""
  const [password, setPassword] = useState(null); // Initialize to null instead of ""
  const [firstName, setFirstName] = useState(null); // Initialize to null instead of ""
  const [lastName, setLastName] = useState(null); // Initialize to null instead of ""

  const [isLogin, setIsLogin] = useState(true);
  const authType = isLogin ? "Login" : "Register";
  const navigate = useNavigate();
  const oppositeAuthCopy = isLogin
    ? "Don't have an account?"
    : "Already have an account?";
  const oppositeAuthType = isLogin ? "Register" : "Login";

  async function attemptAuth(event) {
    event.preventDefault();
    setError(null);

    try {
      if (isLogin) {
        await login({ email, password }).unwrap();
      } else {
        await register({ firstName, lastName, email, password }).unwrap();
      }
      navigate("/");
    } catch (error) {
      setError(error.data);
    }
  }

  return (
    <section>
      <div className="form">
        <h1>{authType}</h1>
        <form onSubmit={attemptAuth} name={authType}>
          <label htmlFor="firstName">First Name</label>
          <br />
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={firstName || ""} // Use empty string if null
            onChange={(event) => setFirstName(event.target.value)}
          />
          <br />
          <br />
          <label htmlFor="lastName">Last Name</label>
          <br />
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={lastName || ""} // Use empty string if null
            onChange={(event) => setLastName(event.target.value)}
          />
          <br />
          <br />
          <label htmlFor="email">Email</label>
          <br />
          <input
            type="text"
            id="email"
            name="email"
            value={email || ""} // Use empty string if null
            onChange={(event) => setEmail(event.target.value)}
          />
          <br />
          <br />
          <label htmlFor="password">Password</label>
          <br />
          <input
            type="password"
            id="password"
            name="password"
            value={password || ""} // Use empty string if null
            onChange={(event) => setPassword(event.target.value)}
          />
          <br />
          <br />
          <button type="submit">{authType}</button>
        </form>

        <p>
          {oppositeAuthCopy}{" "}
          <button onClick={() => setIsLogin(!isLogin)}>
            {oppositeAuthType}
          </button>
        </p>
        {error && <p className={"error"}>{error.message}</p>}
      </div>
    </section>
  );
}

export default AuthForm;
