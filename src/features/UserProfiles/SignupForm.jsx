import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { signup, getSignupStatus } from "./userSlice";
import { updateAuthState } from "../UserAuthentication/authSlice";

import { Redirect } from "react-router-dom";

const SignupForm = () => {
  const dispatch = useDispatch();

  const signUpStatus = useSelector(getSignupStatus);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      setPasswordError("");
      dispatch(signup({ firstName, lastName, username, email, password }))
      .unwrap()
      .then((signedUpUser) => {
        dispatch(updateAuthState({
          id: signedUpUser.id,
          username: signedUpUser.username,
          email: signedUpUser.email
        }))
      })
    } else {
      setPasswordError("Passwords don't match.");
    }
  };

  if (signUpStatus.success) return <Redirect to="/" />;

  return (
    <form onSubmit={handleSubmit}>
      {(signUpStatus.error || passwordError !== "") && (
        <ul>
          {signUpStatus.error.map((error, idx) => (
            <li key={idx}>{error}</li>
          ))}
          {passwordError && <li>{passwordError}</li>}
        </ul>
      )}
      <label>
        First Name
        <input
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          required
        />
      </label>
      <label>
        Last Name
        <input
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          required
        />
      </label>
      <label>
        Username
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </label>
      <label>
        Email
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </label>
      <label>
        Password
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </label>
      <label>
        Confirm Password
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
      </label>
      <button type="submit">Sign Up</button>
    </form>
  );
};

export default SignupForm;
