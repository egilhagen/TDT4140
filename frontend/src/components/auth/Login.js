import React, { Component, Fragment } from "react";
// OBS: Navigate va Redirect i gammel versjon
//import { Navigate, HashRouter } from "react-router-dom";

import { connect } from "react-redux";
import PropTypes from "prop-types";
import { login } from "../../actions/auth";

// uten default export husk å importer med {Login} !!!!
export class Login extends Component {
  state = {
    username: "",
    password: "",
  };

  // Passed from Redux store with connect at the very bottom
  static propTypes = {
    login: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool,
  };

  onSubmit = (e) => {
    const { toggle } = this.props;
    // prevents default redirect with login+pass info in header
    e.preventDefault();
    // call login action in auth.js
    this.props.login(this.state.username, this.state.password);
    toggle();
  };

  onChange = (e) => this.setState({ [e.target.name]: e.target.value });

  render() {
    // pakker ut child prop som kjem fra app.js
    const { toggleRegisterUserWindow, toggle } = this.props;

    // pakker ut username og password fra Redux state
    const { username, password } = this.state;

    // ikke vis skjema dersom bruker allerede er logget inn og somehow finner login-knappen
    if (this.props.isAuthenticated) {
      return null;
    }

    return (
      <form onSubmit={this.onSubmit}>
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
          <a href="reset-password"> Forgot password?</a>
        </p>

        <p className="forgot-password text-left">Dont have an account?</p>

        {/* TODO: onClick={() =>toggleRegisterUserWindow()} Fungerer, men onClick={toggleRegisterUserWindow()}  fungerer ikkje, finn ut av forskjellen!*/}
        <button
          onClick={() => toggleRegisterUserWindow()}
          className="btn btn-primary btn-block"
        >
          Create new user
        </button>
      </form>
    );
  }
}

/*
//test: funke, kan bytte ut {login} i connect med "mapDispatchToProps"
const mapDispatchToProps = (dispatch) => ({
  login: (username, password) => {
    dispatch(login(username, password));
  },
});
*/

/* test: funker, e ein anna måte å sette propTypes på utanfor Login-klassen
Login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};
*/

// Map Redux-state to component props
const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

// The connect() function connects a React component to a Redux store. makes isAuthenticated state, and the login function from actions/auth.js  available in this component (Login)
export default connect(mapStateToProps, { login })(Login);
