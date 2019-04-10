import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Artist from "./components/artist";

class App extends Component {
  render() {
    return (
      // Application router
      <Router>
        <div className="container">
          <Route path="/" exact component={Artist} />
        </div>
      </Router>
    );
  }
}

export default App;
