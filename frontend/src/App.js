import React, { Component } from "react";
import Modal from "./components/layout/Modal";
import CreatePostWindow from "./components/CreatePostWindow";
import Posts from "./components/posts/Posts";
import axios from "axios";

import Login from "./components/auth/Login";
//import { Login } from "./components/Login"; // HOLY SHIT DETTE VAR PROBLEMET MED login-action!!!!!!: https://stackoverflow.com/questions/65915279/i-have-this-error-uncaught-typeerror-this-props-login-is-not-a-function
import RegisterUser from "./components/auth/RegisterUser";
import Header from "./components/layout/Header";

//Redux
import { Provider } from "react-redux";
import store from "./store";
import { loadUser } from "./actions/auth";

// Router
import {
  HashRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";

// post reactstrap
import {
  Card,
  Button,
  CardImg,
  CardTitle,
  CardText,
  CardColumns,
  CardSubtitle,
  CardBody,
} from "reactstrap";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      postList: [],

      //let displayCreateUser = Symbol(displayCreateUser),
      modal: false,
      modalDisplayCreateUser: false, // bestemmer om CreateNewUser skjemaet skal vises inne i modalen isteden for login
      //modalCreatePost: false,
      /*MERGE
      activeItem: {
        "name": "",
        "email": "",
        "username": "",
        "has_logged_in": false
      },*/
      /*
      activePost: {
        title: "",
        price: "",
        date: "",
        location: "OS",
        category: "Concert",
        saleOrBuy: "Sell",
        description: "",
      },*/
    };
  }

  /*   // Lifecycle method, invoked immediately after component is mounted.
  componentDidMount() {
    store.dispatch(loadUser());
    this.refreshList();
  }

  refreshList = () => {
    axios
      .get("/api/posts")

      .then((res) => this.setState({ postList: res.data }))
      .catch((err) => console.log(err));
  }; */

  // TODO: flytt desse inn i modal?
  // Viser/skjuler modal
  toggle = () => {
    this.setState({ modal: !this.state.modal });
    // sett modalDisplayCreateUser til false kver gang, sånn at du ikkje blir stuck på CreateUserWindow dersom du går inn der.
    this.setState({ modalDisplayCreateUser: false });
    this.setState({ modalCreatePost: false });
  };

  // Test: hopp fra login til CreateUserWindow inne i ein modal
  toggleRegisterUserWindow = (event) => {
    //alert("toggleCreateUserWindow");
    this.setState({
      modalDisplayCreateUser: !this.state.modalDisplayCreateUser,
    });
    this.setState({ modalCreatePost: false });

    //event.preventDefault();
  };

  /*toggleCreatePostWindow = (event) => {
    //alert("toggleCreateUserWindow");
    this.setState({ modalCreatePost: !this.state.modalCreatePost });
    //event.preventDefault();
    this.setState({ modal: false });
  };*/

  // Hopp fra login til Register inne i modal (når "create account" knappen trykkes)
  /* MERGE
 toggleRegisterUserWindow = (event) => {
    //alert("toggleRegister");
    this.setState({
      modalDisplayCreateUser: !this.state.modalDisplayCreateUser,
    });
    //event.preventDefault();
  };*/

  /*
  handleSubmit = (user) => {
    this.toggle();
    //if user exists, update user(PUT) ?
    if (user.id) {
      axios
        .put(`/api/auth/user/${user.id}/`, user)
        .then((res) => this.refreshList());
      return;
    }
    // else create new user (POST)
    axios
      .post("/api/users/", user) // api/auth/register
      .then((res) => this.refreshList());
  };
*/

  /*   handleSubmitPost = (post) => {
    this.toggleCreatePostWindow();
    //if user exists, update user(PUT) ?
    if (post.id) {
      axios
        .put(`/api/posts/${post.id}/`, post)
        .then((res) => this.refreshList());
      return;
    }
    // else create new user (POST)
    axios.post("/api/posts/", post).then((res) => this.refreshList());
  }; */

  //TODO: endre navn, creater ingenting
  createItem = () => {
    //const user = { name: "", email: "", username: "", has_logged_in: false };

    //this.setState({ activeItem: user, modal: !this.state.modal });
    this.setState({ modal: !this.state.modal });
  };

  /*   createPost = () => {
    const post = {
      title: "",
      price: "",
      date: "",
      location: "",
      category: "",
      saleOrBuy: "",
      description: "",
    };

    this.setState({
      activePost: post,
      modalCreatePost: !this.state.modalCreatePost,
    });
  }; */

  // TODO: edit user --> link til rediger profilside
  editItem = (user) => {
    this.setState({ activeItem: user, modal: !this.state.modal });
  };

  //TODO: ikkje i bruk, men kan kanskje brukes til å velge mellom å vise annonser for kjøp og salg?
  renderTabList = () => {
    return <div className="nav nav-tabs">{this.state.viewCompleted}</div>;
  };

  /* renderItems = () => {
    const { viewCompleted } = this.state;
    const newItems = this.state.postList;

    return newItems.map((post) => (
      <li
        key={post.id}
        className="list-group-item d-flex justify-content-between align-items-center"
      >
        <span
          onClick={() => alert("hallo")}
          className={`todo-title mr-2 ${
            this.state.viewCompleted ? "completed-todo" : ""
          }`}
          title={post.title}
        >
          {post.id}

          {post.saleOrBuy}

          <Card>
            <CardImg
              top
              width="100%"
              src="https://en.parisinfo.com/var/otcp/sites/images/node_43/node_51/node_7112/salle-de-cin%C3%A9ma-%7C-630x405-%7C-%C2%A9-fotolia-he2/12344768-1-fre-FR/Salle-de-cin%C3%A9ma-%7C-630x405-%7C-%C2%A9-Fotolia-he2.jpg"
              alt="Card image cap"
            />
            <CardBody>
              <CardTitle>{post.title}</CardTitle>
              <CardSubtitle>
                {post.category} in {post.location}
              </CardSubtitle>
              <CardText>
                {post.description}
                <br></br>
                Price: {post.price}
              </CardText>
              <Button>Button</Button>
            </CardBody>
          </Card>
          <Card>
            <CardImg
              top
              width="100%"
              src="https://en.parisinfo.com/var/otcp/sites/images/node_43/node_51/node_7112/salle-de-cin%C3%A9ma-%7C-630x405-%7C-%C2%A9-fotolia-he2/12344768-1-fre-FR/Salle-de-cin%C3%A9ma-%7C-630x405-%7C-%C2%A9-Fotolia-he2.jpg"
              alt="Card image cap"
            />
          </Card>
        </span>
        <span>
          {<button
            className="btn btn-secondary mr-2"
            onClick={() => this.editItem(post)}
          >
            Edit
          </button>
          <button
            className="btn btn-danger"
            onClick={() => this.handleDelete(post)}
          >
            Delete
          </button>}
        </span>
      </li>
    ));
  }; 
  */

  render() {
    return (
      /*
      <main className="container">
        <h1 className="text-black text-uppercase text-center my-4">Ticking</h1>
        <div className="row">
          <div className="col-md-6 col-sm-10 mx-auto p-0">
            <div className="card p-3">
              <div className="mb-4" id="test">
                <button
                  className="btn btn-primary"
                  onClick={this.createItem}
                >
                  Login
                </button>*/

      <Provider store={store}>
        {/* Header med login/logout og sidetittel */}
        <Header
          loginButton={
            <button className="btn btn-primary" onClick={this.createItem}>
              Login
            </button>
          }
        />
        <main className="container">
          <h1 className="text-black text-uppercase text-center my-4">
            Ticking
          </h1>
          <div className="row">
            <div className="col-md-6 col-sm-10 mx-auto p-0">
              <div className="card p-3">
                {/* Gammel login-knapp, mates nå inn som prop til Header-komponenten */}
                {/* <div className="mb-4">
                  <button className="btn btn-primary" onClick={this.createItem}>
                    Login
                  </button>
                </div>
                */}

                {/* <h4> Show posts without contact info here</h4> */}

                {/* TEST: does not work, Show contact info depending on authentication state */}
                {/*  {store.dispatch(getState(isAuthenticated))? (
                  <h4> Show posts without contact info here</h4>
                ) : (
                  <h4> posts with contact info</h4>
                )} */}

                {this.renderTabList()}
                <ul className="list-group list-group-flush border-top-0">
                  {/*this.renderItems()*/}
                  <Posts />

                  {/* <Posts></Posts> */}
                </ul>
              </div>
            </div>
          </div>

          {this.state.modal ? (
            // Deretter sjekk om den skal vise Register eller LoginWindow inne i modalen,  true= Register, false = LoginWindow
            this.state.modalDisplayCreateUser ? (
              <Modal
                //activeItem={this.state.activeItem}

                toggle={this.toggle}
                //onSave={this.handleSubmit}
                modalTitle={<h3>Create new user</h3>}
                modalContent={
                  <RegisterUser
                    toggleRegisterUserWindow={this.toggle}
                    //activeItem={this.state.activeItem}
                    //onSave={this.handleSubmit}
                  />
                } //onChange = {}
              />
            ) : (
              <Modal
                //activeItem={this.state.activeItem}
                toggle={this.toggle}
                //onSave={this.handleSubmit}
                // setter Content = LoginWindow, og sender inn funksjonen som lar deg bytte fra LoginWindow til Register som child prop
                modalTitle={<h3>Sign In</h3>}
                modalContent={
                  <Login
                    toggleRegisterUserWindow={this.toggleRegisterUserWindow}
                    toggle={this.toggle}
                  />
                }
              />
              /*) : <Modal
              //activeItem={this.state.activeItem}
              toggle={this.toggle}
              onSave={this.handleSubmit}
              // setter Content = LoginWindow, og sender inn funksjonen som lar deg bytte fra LoginWindow til CreateUserWindow som child prop 
              modalTitle = {<h3>Sign In</h3>}
              modalContent = {<LoginWindow toggleCreateUserWindow = {this.toggleCreateUserWindow}/>}
            />*/
            )
          ) : null}

          <a>{this.activePost}</a>
        </main>
        {/*</Provider> )
          ) : null}
        </main>
          */}
      </Provider>
    );
  }
}

export default App;
