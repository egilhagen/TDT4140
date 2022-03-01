//import React from "react";
import React, { Component } from "react";
//import axios from "axios";


function PropsTest(props) {
  return (
    <h2>{props.text}</h2>
  );

}

//ES6 arrow function
//const PropsTest = () => <h2>Hi, I am a Car!</h2>;

export default PropsTest;






/*

export default class Reservation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isGoing: true,
      numberOfGuests: 2,
      name: "hello:)"
    };

    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  render() {
    return (
      <form>
        <label>
          Is going:
          <input
            name="isGoing"
            type="checkbox"
            checked={this.state.isGoing}
            onChange={this.handleInputChange} />
        </label>
        <br />
        <label>
          Number of guests:
          <input
            name="numberOfGuests"
            type="number"
            value={this.state.numberOfGuests}
            onChange={this.handleInputChange} />
        </label>
        <br />
        <label>
        Name:
          <input
            name="name"
            type="text"
            value={this.state.name}
            onChange={this.handleInputChange} />
        </label>
      </form>
    );
  }
}
*/
