import React from "react";

class FriendForm extends React.Component {
  state = { 
    friend: this.props.activeFriend || {
      name: "",
      age: "",
      email: ""
    }
  };

  changeHandler = ev => {
    ev.persist();
    let value = ev.target.value;
    if (ev.target.name === "age") {
      value = parseInt(value, 10);
    }
    this.setState(prevState => ({
      friend: {
        ...prevState.friend,
        [ev.target.name]: value
      }
    }));
  };

  // We have a nested object on state - Here are the steps to update
  // a single property on that nested object

  // Inside setState, we want to update "item" with a new object
  // Spread in the properties from the old "item" object - ...this.state.item
  // update the one field we are trying to update

  // this.setState({
  //   item: {
  //     ...this.state.item,
  //     [ev.target.name]: ev.target.value
  //   }
  // });

  handleSubmit = e => {
    e.preventDefault();
    if (this.props.activeFriend) {
      this.props.update(e, this.state.friend);
    } else {
      this.props.addFriend(e, this.state.friend);
    }
    this.setState({
      friend: {
        name: "",
        age: "",
        email: "",
      }
    });
  };

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            name="name"
            onChange={this.changeHandler}
            placeholder="name"
            value={this.state.friend.name}
          />
          <input
            type="number"
            name="age"
            onChange={this.changeHandler}
            placeholder="age"
            value={this.state.friend.age}
          />
          <input
            type="string"
            name="email"
            onChange={this.changeHandler}
            placeholder="email"
            value={this.state.friend.email}
          />
          <button> Submit </button>
        </form>
      </div>
    );
  }
}

export default FriendForm;
