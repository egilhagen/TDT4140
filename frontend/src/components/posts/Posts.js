import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

export class Posts extends Component {
  static propTypes = {
    auth: PropTypes.object.isRequired,
  };

  render() {
    const { isAuthenticated } = this.props.auth;
    const { createPost } = this.props;

    const createPostButton = (
      <div>
        <button className="btn btn-primary" onClick={() => createPost()}>
          Create post
        </button>
      </div>
    );

    const guestMessage = <a>Log in to create post</a>;

    return <div>{isAuthenticated ? createPostButton : guestMessage}</div>;
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(Posts);
