import React, { Component, Fragment } from "react";
//import CreateUserWindow from "./CreateUserWindow";
// Navigate va Redirect i gammel versjon
//import { Navigate, HashRouter } from "react-router-dom";

import { connect } from "react-redux";
import PropTypes from "prop-types";
import { login } from "../../actions/auth";

// test redirect if auth
//import App from "../App";
//import { HashRouter, Navigate, Routes } from "react-router-dom";

// uten default importer med {Login} !!!!
export class Login extends Component {
  state = {
    username: "",
    password: "",
  };

  // Passed from Redux store with connect at the bottom
  static propTypes = {
    login: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool,
  };

  onSubmit = (e) => {
    // prevents default redirect with login+pass info in header
    e.preventDefault();
    // call login action in auth.js
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
    // pakker ut child prop som kjem fra app.js
    const { toggleRegisterUserWindow, closeModal } = this.props;

    // pakker ut username og password fra Redux state
    const { username, password } = this.state;

    // Denne redirecter til ..... dersom allerede logget inn
    if (this.props.isAuthenticated) {
      return (
        //alert("isAuthenticated");
        //return null;
        // TODO: skjul modal eller naviger til sida med annonser+kontaktinfo
        //<Modal isOpen={false} />
        //{() => closeModal()}
        //(document.getElementById("testModal").isOpen = false)
        <div>
          <h3>
            TODO: Få til å lukke dette popup/modal-vinduet automatisk når
            isAuthenticated = true
          </h3>
        </div>

        // TODO: dersom me skal redirecte krever <Navigate/>  definisjon av kas komponent som skal visast i app.js
        // dette funka ikkje
        /* <HashRouter>
          <Fragment>
            <Routes>
              <Navigate exact path="/test" component={App} />
            </Routes>
          </Fragment>
        </HashRouter> */
      );
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

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

// The connect() function connects a React component to a Redux store. makes isAuthenticated state, and the login-action func available in this component (Login)
export default connect(mapStateToProps, { login })(Login);
