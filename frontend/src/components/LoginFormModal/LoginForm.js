import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import './LoginForm.css';

function LoginForm() {
  const dispatch = useDispatch();
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    return dispatch(sessionActions.login({ credential, password })).catch(
      async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      }
    );
  };

  const handleDemoUser = (e) => {
    e.preventDefault();
    setErrors([]);
    return dispatch(sessionActions.login({ credential: "Demo-lition", password: 'password' })).catch(
      async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      }
    );
  };

  return (
    <div className="login-form-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <div className="login-title">Log In</div>
        <div className="content-container">
          <div className="welcome-title">Welcome to AirZnZ</div>
          <div className="login_error_container">
            <ul className="errors">
              {errors.map((error, idx) => (
                <li key={idx}>{error}</li>
              ))}
            </ul>
          </div>
            <div className="input-container">
              <label className="input-label">
                Username or Email
                <br></br>
                <input className="input"
                  type="text"
                  value={credential}
                  onChange={(e) => setCredential(e.target.value)}
                  required
                />
              </label>
            </div>
            <div className="input-container">
              <label className="input-label">
                Password
                <br></br>
                <input className="input"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </label>

          </div>
          <div>
            <button className="styled-button" type="submit">Log In</button>
            <button className="styled-button" onClick={handleDemoUser}>Demo User</button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default LoginForm;
