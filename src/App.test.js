import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import ReduxStore from "./reducers/store";
import App from "./App";

describe("App Component", () => {
  it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(
      <Provider store={ReduxStore}>
        <App />
      </Provider>,
      div
    );
    ReactDOM.unmountComponentAtNode(div);
  });
});
