// Ruter URL parameters (:username)
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
// Redux
import { connect } from "react-redux";
import axios from "axios";
import RegisterUser from "../components/auth/RegisterUser";
// import { useEffect } from "react";

/* Functional component because Router useParams hook only works in func.comp. Class.comp is possible, but more work ? */
function Profile({ loggedInUser }) {
  /* Params gets parameters from the url, ie the username from: /profile/username. the username-key is defined in index.js: path=":username" 
  TODO: finn ut av kordan ein kan koble til redux-state her, evt sjå om ein kan bruke useParams() med ein klassebasert komponent */

  let params = useParams();
  const [users, setUsers] = useState([]);
  const currUser = users.find((user) => user.username == params.username);
  const [edit, setEdit] = useState(false);
  /* alert(typeof users); object!*/
  // const getMatchingUser = function (userList) {
  //   return userList;
  // };
  // const refreshList = () => {
  //   axios
  //     .get("/api/users")
  //     .then((res) => {
  //       const userList = res.data;
  //       return userList;
  //     })
  //     .then(getMatchingUser)
  //     .catch((err) => console.log(err));
  // };

  // useEffect(() => {
  //   refreshList();
  // });

  useEffect(() => {
    axios.get("/api/users").then((users) => {
      setUsers(Object.values(users.data)); /* Object.values(users.data) */
    });
  }, []);

  const toggleEdit = () => {
    setEdit(!edit);
  };
  /* toggleEdit(() => {
    setEdit(!edit);
  }); */

  return (
    <div>
      {/* {users
        ? users.map((item) => <div>{"Hei" + item.username}</div>)
        : "Loading profile page link..."} */}

      {/* Check if currUser is loaded --> show list ELSE --> loading... */}
      {currUser ? (
        <div>
          {loggedInUser.username == params.username ? (
            <div>
              <h2>
                My profile
                {/*  Edit button  */}
                <button
                  className="btn"
                  /* denne vises når du svever over knappen */
                  title="Click here to edit your user"
                  onClick={() => {
                    toggleEdit();
                    /* setEdit(!edit); */

                    /* alert("Få dette til å funke:)"); */

                    /* this.props.toggleCreatePostWindow();
              this.editPost(post);
                this.setModalTitle("Edit post");  */
                  }}
                >
                  {/* Edit-icon */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="36px"
                    viewBox="0 0 24 24"
                    width="36px"
                    fill="#000000"
                  >
                    <path d="M0 0h24v24H0V0z" fill="none" />
                    <path d="M14.06 9.02l.92.92L5.92 19H5v-.92l9.06-9.06M17.66 3c-.25 0-.51.1-.7.29l-1.83 1.83 3.75 3.75 1.83-1.83c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.2-.2-.45-.29-.71-.29zm-3.6 3.19L3 17.25V21h3.75L17.81 9.94l-3.75-3.75z" />
                  </svg>
                </button>
              </h2>

              <h3>{loggedInUser.username}</h3>

              {/* if edit --> show edit form. ELSE --> show list of user info */}
              {edit ? (
                <RegisterUser toggleRegisterUserWindow={toggleEdit} />
              ) : (
                <div>
                  <h4>Avatar </h4>
                  <h4>Name: {currUser.first_name} </h4>
                  <h4>Last name: {currUser.last_name} </h4>
                  <h4>Email: {currUser.email}</h4>
                  <h4>Rating: {/* {currUser.rating}  */}</h4>
                  <br />
                </div>
              )}
            </div>
          ) : (
            <div>
              <h2>Profile: {params.username}</h2>
              <h4>Avatar </h4>
              <h4>Name: {currUser.first_name} </h4>
              <h4>Last name: {currUser.last_name}</h4>
              <h4>Email: {currUser.email}</h4>
              <h4>Rating: {/* {currUser.rating}  */}</h4>
              <br />
            </div>
          )}
        </div>
      ) : (
        <div>
          Loading...
          {/* TODO: denne vises for alltid dersom du legger inn feil username i url´en */}
        </div>
      )}

      {/* End main div */}
    </div>

    /* End return */
  );
}

/* TODO: sjekk om brukernavn fra URL matcher med ein i brukerlista */
/* validUsername = (usernameFromURL) => {
   if (usernameFromURL is in list of users) {
      return true;
    } else {
      return false;
    } 
}; */

function mapStateToProps(state) {
  return { loggedInUser: state.auth.user };
}

export default connect(mapStateToProps)(Profile);

/* 
import React, { Component } from "react";

export default class Profile extends Component {
  render() {
    const { username } = this.props.match.params;
    return (
      <div>
        {" "}
        <h2>Profile: {username}</h2>
        <h5>
          TODO: mat inn verdier (og edit-knapp dersom
          this.props.auth.user.username==params.username)
        </h5>
        <h4>Avatar </h4>
        <h4>Name: </h4>
        <h4>Last name: </h4>
        <h4>Email: </h4>
        <br />
      </div>
    );
  }
} */
