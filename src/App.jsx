import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch } from "react-router-dom";
import { Redirect } from "react-router-dom";
import { restoreSession } from "./features/UserAuthentication/authSlice";
import LoginForm from "./features/UserAuthentication/LoginForm";
import SignupForm from "./features/UserProfiles/SignupForm";

import { getAuthenticatedUser } from "./features/UserAuthentication/authSlice";

import ProfileForm from "./features/UserProfiles/ProfileForm"
import { getUserProfile } from "./features/UserProfiles/userSlice";

function App() {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(getAuthenticatedUser)
  
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(restoreSession())
    .then((action) => {
      if(restoreSession.fulfilled.match(action) && action.payload) {
        const userId = action.payload.id;
        if(userId) {
          dispatch(getUserProfile(userId))
        }
      }
    }).finally(()=> setIsLoaded(true));
  }, [dispatch]);

  // TODO: need to add redirect to home page if isAuthenticated and change profileform component to profile page component when ready also need to add / home route and when put here without authenticated user reroute to login
  
  return isLoaded && (
    <Switch>
      <Route path="/login">
        <LoginForm />
      </Route>
      <Route path="/signup">
        <SignupForm />
      </Route>
      <Route path="/profile">
        {isAuthenticated ? <ProfileForm /> : <Redirect to="/login" />}
      </Route>
    </Switch>
  );
}

export default App;
