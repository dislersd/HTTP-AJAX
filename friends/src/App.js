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
      activeFriend: null,
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

  deleteFriend = (e, id) => {
    e.preventDefault();
    axios
      .delete(`http://localhost:5000/friends/${id}`)
      .then(res => {
        this.setState({
          friends: res.data
        });
        this.props.history.push("/");
      })
      .catch(err => {
        console.log(err);
      });
  };

  setUpdateForm = (e, friend) => {
    e.preventDefault();
    this.setState({
      activeFriend: friend
    });
    this.props.history.push("/friend-form");
  };

  updateFriend = (e, friend) => {
    e.preventDefault();
    axios
      .put(`http://localhost:5000/friends/${friend.id}`, friend)
      .then(res => {
        this.setState({
          activeFriend: null,
          friends: res.data
        });
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
          render={props => (
            <FriendsList
              {...this.state}
              {...props}
              delete={this.deleteFriend}
              update={this.setUpdateForm}
            />
          )}
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
