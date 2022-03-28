import React, { Component } from "react";

//Redux
import { connect } from "react-redux";
import PropTypes from "prop-types";

// React router lenke, og outlet for å vise ein profil
import { Link, Outlet } from "react-router-dom";

// API requests
import axios from "axios";

//Reactstrap list
import { ListGroup, ListGroupItem } from "reactstrap";

// ProfilePage is within a Private route, can safely assume user i logged in
export class ProfilePage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userList: [],
    };
  }

  static propTypes = {
    auth: PropTypes.object.isRequired,
  };

  componentDidMount() {
    this.refreshList();
  }

  refreshList = () => {
    axios
      .get("/api/users")

      .then((res) => this.setState({ userList: res.data }))
      .catch((err) => console.log(err));
  };

  render() {
    const { isAuthenticated } = this.props.auth;
    const users = this.state.userList;
    return (
      <main
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div className="container">
          <Link to="/">Go back home</Link>

          {/* Mater ut profilsida i Outlet */}
          <div
            id="profile-and-userlist-container"
            style={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Outlet />

            <div>
              <h3>Userlist </h3>
              <div
                style={{
                  maxHeight: "300px",
                  overflow: "scroll",
                  /* border: "solid", */
                }}
              >
                <ListGroup>
                  {users.map((user) => (
                    <ListGroupItem
                      tag="a"
                      action /* La til "profile: " fordi ein key må vere unik for HEILE nettsida */
                      key={"profile: " + user.username}
                    >
                      <Link
                        style={{ display: "block", margin: "1rem 0" }}
                        to={`/profiles/${user.username}`}
                      >
                        {/* Highlight the logged-in user´s profile-link */}
                        {this.props.auth.user.username == user.username
                          ? user.username + "(Me) [ profilbilde ]"
                          : user.username + " [ profilbilde ]"}
                      </Link>
                    </ListGroupItem>
                  ))}
                </ListGroup>
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(ProfilePage);
