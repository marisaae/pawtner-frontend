import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import { restoreSession } from "./features/UserAuthentication/authSlice";
import LoginForm from "./features/UserAuthentication/LoginForm";
import SignupForm from "./features/UserProfiles/SignupForm";

function App() {
  const dispatch = useDispatch();
  
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(restoreSession()).then(() => setIsLoaded(true))
  }, [dispatch]);

  return isLoaded && (
    <Switch>
      <Route path="/login">
        <LoginForm />
      </Route>
      <Route path="/signup">
        <SignupForm />
      </Route>
    </Switch>
  );
}

export default App;
