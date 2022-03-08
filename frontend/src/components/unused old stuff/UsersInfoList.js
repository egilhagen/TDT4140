import React, { Component } from "react";
import axios from "axios";

//TODO: OLD shit, SLETT. hentet alle users fra det gamle api-et

/*
Fetch and display user info from API

Example user:
        "id": 1,
        "name": "halvor",
        "email": "e@ntnu.no",
        "username": "nei",
        "has_logged_in": false

*/

//todo: denne bør deles opp i/bygges opp av fleire komponents!

export default class UsersInfoList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      persons: [],
    };
  }
  // Lifecycle method, invoked immediately after component is mounted. diagram: https://projects.wojtekmaj.pl/react-lifecycle-methods-diagram/
  componentDidMount() {
    axios.get("/api/users").then((res) => {
      const persons = res.data;
      this.setState({ persons });
    });
  }

  render() {
    return (
      <ol>
        {this.state.persons.map((person) => (
          <div>
            <li key={person.id}>
              {" "}
              <h3>Brukernavn: {person.username}</h3>
            </li>
            <ul>
              <li>
                {" "}
                <h3>Navn: {person.name}</h3>
              </li>
              <li>
                {" "}
                <h3>E-post: {person.email}</h3>
              </li>
              <li>
                {" "}
                <h3>Logget inn: {String(person.has_logged_in)}</h3>
              </li>
            </ul>
          </div>
        ))}
      </ol>
    );
  }
}
