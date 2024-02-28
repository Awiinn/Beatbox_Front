import { useState } from "react";
import { useLoginMutation, useRegisterMutation } from "../../redux/api/authApi";
import { useNavigate } from "react-router-dom";

/**
 * AuthForm allows a user to either login or register for an account.
 */
function AuthForm() {
  const [login] = useLoginMutation();
  const [register] = useRegisterMutation();
  const [error, setError] = useState(null);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const [isLogin, setIsLogin] = useState(true);
  const authType = isLogin ? "Login" : "Register";
  const navigate = useNavigate();
  const oppositeAuthCopy = isLogin
    ? "Don't have an account?"
    : "Already have an account?";
  const oppositeAuthType = isLogin ? "Register" : "Login";

  /**
   * Send credentials to server for authentication
   */
  async function attemptAuth(event) {
    event.preventDefault();
    setError(null);

    const authMethod = isLogin ? login : register;
    const credentials = { firstName, lastName, email, password };

    try {
      await authMethod(credentials).unwrap();
      navigate("/");
    } catch (error) {
      setError(error.data);
    }
  }

  return (
    <>
      <section>
        <div className="form">
          <h1>{authType}</h1>
          <form onSubmit={attemptAuth} name={authType}>
            <label>First Name</label>
            <br />
            <input
              type="text"
              name="firstName"
              onChange={(event) => {
                setFirstName(event.target.value);
              }}
            />
            <br />
            <br />
            <label>Last Name</label>
            <br />
            <input
              type="text"
              name="lastName"
              onChange={(event) => {
                setLastName(event.target.value);
              }}
            />
            <br />
            <br />
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
            <button type="submit">{authType}</button>
          </form>
          <p>
            {oppositeAuthCopy}{" "}
            <button
              onClick={() => {
                setIsLogin(!isLogin);
              }}
            >
              {oppositeAuthType}
            </button>
          </p>
          {error && <p className={"error"}>{error}</p>}
        </div>
      </section>
    </>
  );
}

export default AuthForm;
