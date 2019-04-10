import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import ReduxStore from "./reducers/store";
import App from "./App";
import "bootstrap/dist/css/bootstrap.css";

ReactDOM.render(
  <Provider store={ReduxStore}>
    <App />
  </Provider>,
  document.getElementById("root")
);
