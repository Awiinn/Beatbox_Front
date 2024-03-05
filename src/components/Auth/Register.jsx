import { useState } from "react";
import { useNavigate } from "react-router";

const Register = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [error, setError] = useState(null);
  const nav = useNavigate();

  const attemptRegister = async (e) => {
    e.preventDefault();
    setError(null);

    const credentials = { firstName, lastName, email, password, username };

    try {
      await credentials.unwrap();
      nav("/login");
    } catch (error) {
      setError(error.data);
    }
  };
  return (
    <>
      <div className="register-main">
        <h1>Register</h1>
      </div>
      <section className="register-wrapper">
        <div className="form">
          <form onSubmit={attemptRegister} name="Register">
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
            <label>Username</label>
            <br />
            <input
              type="text"
              name="username"
              onChange={(event) => {
                setUsername(event.target.value);
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
            <button type="submit">Register</button>
          </form>
          <br />
          <p>
            Already have an account?
            <button
              onClick={() => {
                nav("/login");
              }}
            >
              Login
            </button>
          </p>
          {error && <p className={"error"}>{error}</p>}
        </div>
      </section>
    </>
  );
};

export default Register;
