import React, { Component } from "react";
import FriendsList from "./components/FriendsList";
import FriendForm from './components/FriendForm';
import axios from "axios";
import { Route } from "react-router-dom";
import "./App.css";

class App extends Component {
  constructor() {
    super();
    this.state = {
      friends: [],
      error: ""
    };
  }

  componentDidMount() {
    axios
      .get("http://localhost:5000/friends")
      .then(res => this.setState({ friends: res.data }))
      .catch(err => this.setState({ error: err }));
  }

  render() {
    return (
      <div className="App">
        <Route
          exact
          path="/"
          render={props => <FriendsList {...this.state} {...props} />}
        />
        <Route
          exact
          path="/friend-form"
          render={props => <FriendForm {...props} />}
        />
      </div>
    );
  }
}

export default App;
