import React, { Component } from "react";

//Redux
import { connect } from "react-redux";
import PropTypes from "prop-types";

// React router lenke
import { Link } from "react-router-dom";

export class ProfilePage extends Component {
  static propTypes = {
    auth: PropTypes.object.isRequired,
  };

  render() {
    const { isAuthenticated, user } = this.props.auth;
    return (
      <main style={{ padding: "1rem 0" }}>
        <h2>Profile Page: {user.username}</h2>
        <Link to="/">Go back home</Link>
      </main>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(ProfilePage);
