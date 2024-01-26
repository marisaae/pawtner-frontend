import React, { useState } from 'react';

import * as authActions from './authSlice';
import { useDispatch, useSelector } from 'react-redux';
import { getUser } from './authSlice';
import { Redirect } from 'react-router-dom';

const LoginForm = () => {
const dispatch = useDispatch();
const user = useSelector(getUser);

const [credential, setCredential] = useState('');
const [password, setPassword] = useState('');
const [errors, setErrors] = useState([]);

if (user) return <Redirect to="/" />;

// const handleSubmit = (e) => {
//     e.preventDefault();
//     setErrors([]);
//     const resultAction = dispatch(authActions.login({ credential, password }))
//     if (authActions.login.fulfilled.match(resultAction)) {
//         console.log('hi', resultAction)
//         return resultAction
//     } else {
//         if (resultAction.payload) {
//             setErrors(resultAction.payload)
//         }
//     }
//   }

const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    dispatch(authActions.login({ credential, password }))
      .then((actionResult) => {
        if (authActions.login.rejected.match(actionResult)) {
          setErrors(actionResult.payload);
        }
      })
      .catch(() => {
        setErrors(["An unexpected error occurred."]);
      });
  }

  return (
    <form onSubmit={handleSubmit}>
        <ul>
        {errors.map((error, idx) => (
          <li key={idx}>{error}</li>
        ))}
      </ul>
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