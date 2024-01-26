import { Route, Switch } from "react-router-dom";
import LoginForm from "./features/UserAuthentication/LoginForm";

function App() {
  return (
    <Switch>
      <Route path="/login">
        <LoginForm />
      </Route>
    </Switch>
  );
}

export default App;
