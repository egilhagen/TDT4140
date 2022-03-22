import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logout } from "../../actions/auth";

//React router navigation links
import { Link } from "react-router-dom";

export class Header extends Component {
  static propTypes = {
    auth: PropTypes.object.isRequired,
    logout: PropTypes.func.isRequired,
  };

  render() {
    const { isAuthenticated, user } = this.props.auth;

    const authLinks = (
      <ul className="navbar-nav ml-auto mt-2 mt-lg-0">
        <span className="navbar-text mr-3">
          {/* Check if Redux-store has populated the user, if not show loading untill it has. */}
          {user ? (
            <Link to={`/profiles/${user.username}`}>
              <strong>{`Welcome ${user.username}`}</strong>
            </Link>
          ) : (
            "Loading profile page link..."
          )}
        </span>
        <li className="nav-item">
          <button
            onClick={this.props.logout}
            className="nav-link btn btn-info btn-sm text-light"
          >
            Logout
          </button>
        </li>
      </ul>
    );

    const guestLinks = (
      <ul className="navbar-nav ml-auto mt-2 mt-lg-0">
        {/*  <li className="nav-item">
          <Link to="/register" className="nav-link">
            Register
          </Link> 
        </li> */}
        <li className="nav-item">
          {/* Todo: spytter ut login-knappen fra app.js, dette er yalla, flytt knappen inn her?  */}
          {this.props.loginButton}

          {/* Dette er kanskje ein bedre løsning? kan lage ein dedikert modul-komponent som kan matast inn i /login redirecten? */}
          {/*  <Link to="/login" className="nav-link">
            Login
          </Link> */}
        </li>
      </ul>
    );

    return (
      <nav className="navbar navbar-expand-sm navbar-light bg-light">
        <div className="container">
          {/* TODO: kan vere nyttig når me får profilside, dropdownmeny */}
          {/*           <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarTogglerDemo01"
            aria-controls="navbarTogglerDemo01"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button> */}
          {/* className="collapse navbar-collapse" */}
          <div id="navbarTogglerDemo01">
            <Link className="navbar-brand" to="/">
              TicKing
            </Link>
          </div>
          {/* Show login or logout button depending on authentication state */}
          {isAuthenticated ? authLinks : guestLinks}
        </div>
      </nav>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logout })(Header);
