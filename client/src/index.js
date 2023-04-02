import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";

import reportWebVitals from "./reportWebVitals";

import Routing from "./router/routing";

import store from "./redux/store";

import "./styles/styles.scss";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <Routing />
      </Router>
    </Provider>
  </React.StrictMode>
);

reportWebVitals();
