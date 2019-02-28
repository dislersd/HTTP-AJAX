import React, { Component } from "react";
import FriendsList from "./components/FriendsList";
import FriendForm from "./components/FriendForm";
import { NavLink } from "react-router-dom";
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

  addFriend = (e, item) => {
    e.preventDefault();
    axios
      .post("http://localhost:5000/friends", item)
      .then(res => {
        this.setState({
          friends: res.data
        });
        // HTTP STEP V - Clear data form in ItemForm and route to /item-list
        this.props.history.push("/");
      })
      .catch(err => {
        console.log(err);
      });
  };

  render() {
    return (
      <div className="App">
        <NavLink to="/">
          <button>Home</button>
        </NavLink>
        <NavLink to="/friend-form">
          <button>Add Friend</button>
        </NavLink>
        <Route
          exact
          path="/"
          render={props => <FriendsList {...this.state} {...props} />}
        />
        <Route
          exact
          path="/friend-form"
          render={props => <FriendForm {...props} addFriend={this.addFriend} />}
        />
      </div>
    );
  }
}

export default App;
