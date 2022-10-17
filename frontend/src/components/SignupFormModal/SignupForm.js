// frontend/src/components/SignupFormModal/SignUpForm.js
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import * as sessionActions from "../../store/session";
import './SignupForm.css';

function SignupForm() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [firstName, setFirstname] = useState("");
  const [lastName, setLastname] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState([]);

  if (sessionUser) return <Redirect to="/" />;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      setErrors([]);
      return dispatch(sessionActions.signup({ email, username, firstName, lastName, password }))
        .catch(async (res) => {
          const data = await res.json();
          if (data && data.errors) setErrors(data.errors);
        });
    }
    return setErrors(['Confirm Password field must be the same as the Password field']);
  };

  return (
    <div className="signup-form-continer">
      <form onSubmit={handleSubmit}>
        <div className="signup-title">Sign Up</div>
        <div className="content-container">
          <div className="welcome-title">Welcome to AirZnZ</div>
          <ul className="errors">
            {errors && errors.map((error, idx) => <li key={idx}>{error}</li>)}
          </ul>
          <div className="input-container-outer">

            <div className="input-container">
              <label className="input-label">
                Email
                <br></br>
                <input
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="input"
                />
              </label>
            </div>
            <div className="input-container">
              <label className="input-label">
                Username
                <br></br>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  className="input"
                />
              </label>
            </div>
            <div className="input-container">
              <label className="input-label">
                First Name
                <br></br>
                <input
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstname(e.target.value)}
                  required
                  className="input"
                />
              </label>
            </div>
            <div className="input-container">
              <label className="input-label">
                Last Name
                <br></br>
                <input
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastname(e.target.value)}
                  required
                  className="input"
                />
              </label>
            </div>
            <div className="input-container">
              <label className="input-label">
                Password
                <br></br>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="input"
                />
              </label>
            </div>
            <div className="input-container">
              <label className="input-label">
                Confirm Password
                <br></br>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  className="input"
                />
              </label>
            </div>
          </div >
          <button type="submit" className="styled-button">Sign Up</button>
        </div>
      </form>
    </div>
  );
}

export default SignupForm;
