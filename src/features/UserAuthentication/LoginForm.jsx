import React, { useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { login, getAuthenticatedUser, getAuthErrors } from './authSlice';
import { updateUserState } from '../UserProfiles/userSlice';
import { Redirect } from 'react-router-dom';

const LoginForm = () => {
const dispatch = useDispatch();
const user = useSelector(getAuthenticatedUser);
const authErrors = useSelector(getAuthErrors);

const [credential, setCredential] = useState('');
const [password, setPassword] = useState('');

if (user) return <Redirect to="/" />;

const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login({ credential, password }))
    .unwrap()
    .then((signedInUser) => {
      dispatch(updateUserState({
        firstName: signedInUser.firstName,
        lastName: signedInUser.lastName,
        bio: signedInUser.bio
      }))
    })
  }

  return (
    <form onSubmit={handleSubmit}>
        {authErrors && (<ul>
        {authErrors.map((error, idx) => (
          <li key={idx}>{error}</li>
        ))}
      </ul>
        )}
        <label>
            Username or Email
            <input 
            type="text"
            value={credential}
            onChange={(e) => setCredential(e.target.value)}
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
        <button type="submit">Log In</button>
    </form>
  )
}

export default LoginForm