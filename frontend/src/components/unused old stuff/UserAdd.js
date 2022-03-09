import React, { Component } from "react";
import axios from "axios";
//axios.defaults.xsrfHeaderName = "X-crftoken";
//axios.defaults.xsrfCookieName = "csrftoken";

// TODO: SLETT dette er OLD shit. fra før tokens va ei greie

/*
Denne i backend settings.py løser 403 ? 
REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': [
        'rest_framework.authentication.BasicAuthentication',
    ]
}

*/

/*
Add new user with a POST request to the API

Example user:
        "id": 1,
        "name": "halvor",
        "email": "e@ntnu.no",
        "username": "nei",
        "has_logged_in": false

*/

export default class UserAdd extends Component {
  state = {
    //id: 4,
    username: "",
    name: "",
    email: "",
    has_logged_in: false,
  };

  handleChange = (event) => {
    this.setState({
      // TODO: lista spytter kun ut siste verdi i event.target.value
      username: "janusBananus", //event.target.name,
      name: "janbanan", //event.target.value,
      email: "janb@hotmail.com", //event.target.value
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();

    const user = {
      //id: this.state.id,
      username: this.state.username,
      name: this.state.name,
      email: this.state.email,
      has_logged_in: this.state.has_logged_in,
    };
    alert(user.username + " " + user.email + " " + user.name);

    axios.post("/api/users/", { user }).then((res) => {
      console.log(res);
      console.log(res.data);
    });
  };

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label>
            Person username:
            <input type="text" name="username" onChange={this.handleChange} />
          </label>
          <label>
            Person name:
            <input type="text" name="name" onChange={this.handleChange} />
          </label>
          <label>
            Person email:
            <input type="text" name="email" onChange={this.handleChange} />
          </label>
          <button type="submit">Add</button>
        </form>
      </div>
    );
  }
}
