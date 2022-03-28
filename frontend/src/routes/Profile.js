import Modal from "../components/layout/Modal";

// Ruter URL parameters (:username)
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
// Redux
import { connect } from "react-redux";
import axios from "axios";
import RegisterUser from "../components/auth/RegisterUser";
// import { useEffect } from "react";

//Reactstrap
import { Card, CardTitle, CardText, CardImg, CardBody } from "reactstrap";

/* Functional component because Router useParams hook only works in func.comp. Class.comp is possible, but more work ? */
function Profile({ loggedInUser }) {
  /* Params gets parameters from the url, ie the username from: /profile/username. the username-key is defined in index.js: path=":username" 
  TODO: finn ut av kordan ein kan koble til redux-state her, evt sjå om ein kan bruke useParams() med ein klassebasert komponent */

  let params = useParams();
  const [users, setUsers] = useState([]);
  const [currUser, setCurrUser] = useState();
  const [transactions, setTransactions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [ratings, setRatings] = useState([]);
  const [rating, setRating] = useState();
  // const [progress, setProgress] = useState(0);
  // const [url, setUrl] = useState("");

  // const arr =
  const [edit, setEdit] = useState(false);
  //

  // const rating = ratings.reduce(function (total, transaction) {
  //   return total + transaction.ratingFromSeller;
  // }, 0);
  // console.log(ratings);

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
    const fetchData = async () => {
      // const isLoading = false;
      setIsLoading(true);
      const transactions = await axios.get("/api/transactions");
      setTransactions(Object.values(transactions.data));
      const users = await axios.get("/api/users");
      setUsers(Object.values(users.data));

      const currUser = users.data.find(
        (user) => user.username == params.username
      );
      setCurrUser(currUser);

      const ratings = transactions.data.filter(
        (transaction) => transaction.buyer === currUser.id
      );
      setRatings(ratings);

      const rating = ratings.reduce(function (total, transaction) {
        return total + transaction.ratingFromSeller;
      }, 0);
      setRating(rating);
      setIsLoading(false);
    };
    fetchData();
    // async function upload() {
    // await axios.get("/api/users").then((users) => {
    //   setUsers(Object.values(users.data)); /* Object.values(users.data) */
    // });
    // axios.get("/api/transactions").then((transactions) => {
    //   setTransactions(Object.values(transactions.data));
    // });
    // setRatings(
    //   transactions.filter((transaction) => transaction.buyer === currUser.id)
    // );
    // setRating(
    //   ratings.reduce(function (total, transaction) {
    //     return total + transaction.ratingFromSeller;
    //   }, 0)
    // );
    // url = await uploadFile(file, setProgress);
    //   setUrl("hei");
    //   // onUpload(file, url);
    // }
    // upload();
    window.scrollTo(0, 0);
  }, [params.username]);

  // if (!url) {
  //   // checking for empty url here.
  //   return null;
  // }

  // useEffect(() =>)
  // fillTransactions = () => {

  // };
  // const currUser = users.find((user) => user.username == params.username);
  // const ratings = transactions.filter(
  //   (transaction) => transaction.buyer === currUser.id
  // );
  // const rating = ratings.reduce(function (total, transaction) {
  //   return total + transaction.ratingFromSeller;
  // }, 0);
  const toggleEdit = () => {
    setEdit(!edit);
  };
  const numRatings = ratings.length;

  /* toggleEdit(() => {
    setEdit(!edit);
  }); */

  {
    /* {users
        ? users.map((item) => <div>{"Hei" + item.username}</div>)
        : "Loading profile page link..."} */
  }

  {
    /* Check if currUser is loaded --> show list ELSE --> loading... */
  }
  return (
    <div>
      {/* {isLoading==false ?  (
      <div> Loading </div>
      ):( */}
      {/* {isLoading ? (
        <div> Loading </div>
        ) : ( */}

      {isLoading ? (
        <div>Loading</div>
      ) : (
        <div>
          {currUser ? (
            <div>
              {loggedInUser.username == params.username ? (
                <div>
                  <h2
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    My profile
                    {/*  Edit button  */}
                    <button
                      className="btn"
                      /* denne vises når du svever over knappen */
                      title="Click here to edit your user"
                      onClick={() => {
                        toggleEdit();
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

                  {/* if edit --> show edit form in modal. ELSE --> null*/}
                  {edit ? (
                    /*  <RegisterUser toggleRegisterUserWindow={toggleEdit} /> */
                    <Modal
                      toggle={toggleEdit}
                      modalTitle={<h3>Edit your profile</h3>}
                      modalContent={
                        <RegisterUser toggleRegisterUserWindow={toggleEdit} />
                      }
                    />
                  ) : null}
                </div>
              ) : (
                <div>
                  <h2
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    Profile page
                  </h2>
                  {/*  <h3>{params.username}</h3>
                <h4>Avatar </h4>
                <h4>Name: {currUser.first_name} </h4>
                <h4>Last name: {currUser.last_name}</h4>
                <h4>Email: {currUser.email}</h4>
                <h4>Rating: { {currUser.rating}  }</h4>
                <h4>Description: { {currUser.desctription}  }</h4>
                <br /> */}
                </div>
              )}

              {/* TODO: Format the profile page nicely */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Card
                  body
                  inverse
                  color="primary"
                  style={{
                    width:
                      "50%" /* TODO: denne gjer at ting blir fucka på mindre skjermer */,
                  }}
                >
                  <CardBody>
                    {/*  <CardTitle
                      style={{
                        display: "flex",
                        justifyContent: "space-around",
                      }}
                    >
                      <h3>{loggedInUser.username}</h3>
                      <h4>Rating: {currUser.rating}/5 </h4>
                    </CardTitle> */}

                    {/* <h4>TODO: Avatar (Temp test-bilde under) </h4> */}

                    <CardText>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-around" /* space-between */,
                        }}
                      >
                        <img
                          width="150px"
                          height="150px"
                          src={process.env.PUBLIC_URL + "/Icons/kino.jpg"}
                          alt="Profile image"
                          style={{
                            borderRadius: "50%",
                          }}
                        />
                        <div
                          style={{
                            alignSelf: "flex-end",
                          }}
                        >
                          <h3>{currUser.username}</h3>
                          {/* Name */}
                          <h4>
                            {currUser.first_name} {currUser.last_name}
                          </h4>
                          {/* Last name */}
                          <h4>{currUser.last_name} </h4>
                          {/* Email */}
                          <h5>
                            {/* {currUser.email} */}
                            <a
                              style={{ color: "white" }}
                              href={
                                "mailto:" +
                                currUser.email +
                                "?subject=TicKing: Your profile"
                              }
                            >
                              {currUser.email}
                            </a>
                          </h5>
                          {/* alert({ratings.length}); */}
                          {numRatings > 0 ? (
                            <h5>
                              Rating: {rating / numRatings} ({numRatings})
                            </h5>
                          ) : (
                            <h5>0 (0)</h5>
                          )}
                        </div>
                      </div>
                    </CardText>

                    <CardText>
                      <div style={{}}>
                        {/* <h5> Description </h5> */}
                        <p>
                          {/* {currUser.desctription}  */}
                          Temp-testtext: hello hello fuglekassa osv. osv. OBS:
                          Bildet er temp, må fortsatt få til å legge til eit
                          bildefelt i backend...
                        </p>
                      </div>
                    </CardText>
                  </CardBody>
                </Card>
              </div>
            </div>
          ) : (
            <div>
              <br />
              <h5>Cannot find a user named {params.username}...</h5>
              <br />

              {/* Loading... */}
              {/* TODO: denne vises for alltid dersom du legger inn feil username i url´en */}
            </div>
          )}
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
