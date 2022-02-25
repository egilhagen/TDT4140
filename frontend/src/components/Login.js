import React, { Component } from "react";
import CreateUserWindow from "./CreateUserWindow";

import { Link, Navigate } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { login } from "../actions/auth";

// uten default importer med {Login} !!!!
export class Login extends Component {
  state = {
    username: "",
    password: "",
  };

  static propTypes = {
    login: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool,
  };

  onSubmit = (e) => {
    //prevents default redirect
    e.preventDefault();
    this.props.login(this.state.username, this.state.password);
  };

  onChange = (e) => this.setState({ [e.target.name]: e.target.value });

  /*
    swapView  = () => {
        document.getElementById("test").innerHTML = "hellow world"; 
        // prevent page from redirecting 
        preventDefault();  
        
        //this.setState({ activeItem });
      };
*/

  /*
// Old test for changing div content with .innerHTML, can be deleted.
    DisplayUserCreationForm = event => {
        //TODO: dette kjem ikkje til å funke sånn me vil, løsning: https://stackoverflow.com/questions/33840150/onclick-doesnt-render-new-react-component
        document.getElementById("outer-container-div").innerHTML = "Create user form here";  //<CreateUserWindow/>
        // forhindrer standard html oppførsel med redirect etter form submit
        event.preventDefault();
    }
*/

  render() {
    if (this.props.isAuthenticated) {
      return <Navigate to="/" />;
    }

    // pakker ut child prop som kjem fra app.js
    const { toggleCreateUserWindow } = this.props;

    // pakker ut username og password fra state
    const { username, password } = this.state;

    return (
      <form>
        <div className="form-group">
          <label>Username</label>
          <input
            type="username"
            name="username"
            className="form-control"
            placeholder="Enter username"
            onChange={this.onChange}
            value={username}
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            placeholder="Enter password"
            name="password"
            onChange={this.onChange}
            value={password}
          />
        </div>
        <div className="form-group">
          <div className="custom-control custom-checkbox">
            <input
              type="checkbox"
              className="custom-control-input"
              id="customCheck1"
            />
            <label className="custom-control-label" htmlFor="customCheck1">
              Remember me
            </label>
          </div>
        </div>
        <button type="submit" className="btn btn-primary btn-block">
          Login
        </button>
        <p className="forgot-password text-right">
          Forgot <a href="#">password?</a>
        </p>

        <p className="forgot-password text-left">Dont have an account?</p>

        {/* TODO: onClick={() =>toggleCreateUserWindow()} Fungerer, men onClick={toggleCreateUserWindow()}  fungerer ikkje, finn ut av forskjellen!*/}
        <button
          onClick={() => toggleCreateUserWindow()}
          className="btn btn-primary btn-block"
        >
          Create new user
        </button>
      </form>
    );
  }
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

// The connect() function connects a React component to a Redux store.
export default connect(mapStateToProps, { login })(Login);

/* export default connect(
  (state) => ({
    state: state.reducer,
  }),
  (dispatch) => ({
    actions: bindActionCreators(screenActions, dispatch),
  })
)(Login); // <<--- here :)
 */
