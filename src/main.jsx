import React from "react";
import ReactDOM from "react-dom/client";
import axios from "axios";

import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import store from "./store";
import { restoreCSRF } from "./store/csrf.js";
import './store/axiosConfig.js';

import * as authActions from '../src/features/UserAuthentication/authSlice.jsx';

if (process.env.NODE_ENV !== "production") {
  restoreCSRF();
  window.axios = axios;
  window.store = store;
  window.authActions = authActions;
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
