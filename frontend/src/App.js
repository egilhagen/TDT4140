/*
class App extends Component {
  // added
  componentDidMount() {
    store.dispatch(loadUser());
  }

  render() {
    return (
      <Provider store={store}>
        <Router history={history}>
          <Header />
          <Switch>
            <PrivateRoute exact path='/' component={Dashboard} /> // updated
            <Route exact path='/delete/:id' component={TodoDelete} />
            <Route exact path='/edit/:id' component={TodoEdit} />
            <Route exact path='/login' component={LoginForm} /> // added
          </Switch>
        </Router>
      </Provider>
    );
  }
}

*/

import React, { Component } from "react";
import Modal from "./components/layout/Modal";
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

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //userList: [],
      modal: false,
      modalDisplayCreateUser: false, // bestemmer om CreateNewUser skjemaet skal vises inne i modalen isteden for login
      /*
      activeItem: {
        name: "",
        email: "",
        username: "",
        has_logged_in: false,
      },*/
    };
  }

  // Lifecycle method, invoked immediately after component is mounted.
  componentDidMount() {
    store.dispatch(loadUser());
    //this.refreshList();
  }
  /*
  refreshList = () => {
    axios
      .get("/api/users/")
      .then((res) => this.setState({ userList: res.data }))
      .catch((err) => console.log(err));
  };*/

  // TODO: flytt desse inn i modal?
  // Viser/skjuler modal
  toggle = () => {
    this.setState({ modal: !this.state.modal });
    // sett modalDisplayCreateUser til false kver gang, sånn at du ikkje blir stuck på Register dersom du går inn der.
    this.setState({ modalDisplayCreateUser: false });
  };

  // Hopp fra login til Register inne i modal (når "create account" knappen trykkes)
  toggleRegisterUserWindow = (event) => {
    //alert("toggleRegister");
    this.setState({
      modalDisplayCreateUser: !this.state.modalDisplayCreateUser,
    });
    //event.preventDefault();
  };

  /*
  handleSubmit = (user) => {
    this.toggle();
    //if user exists, update user(PUT) ?
    if (user.id) {
      axios
        .put(`/api/users/${user.id}/`, user)
        .then((res) => this.refreshList());
      return;
    }
    // else create new user (POST)
    axios
      .post("/api/users/", user) // api/auth/register
      .then((res) => this.refreshList());
  };
*/

  /* 
  handleDelete = (user) => {
    axios.delete(`/api/users/${user.id}/`).then((res) => this.refreshList());
  }; */

  createItem = () => {
    //const user = { name: "", email: "", username: "", has_logged_in: false };

    //this.setState({ activeItem: user, modal: !this.state.modal });
    this.setState({ modal: !this.state.modal });
  };
  /*
  editItem = (user) => {
    this.setState({ activeItem: user, modal: !this.state.modal });
  };

  renderTabList = () => {
    return <div className="nav nav-tabs">{this.state.viewCompleted}</div>;
  };

  renderItems = () => {
    const { viewCompleted } = this.state;
    const newItems = this.state.userList;

    return newItems.map((user) => (
      <li
        key={user.id}
        className="list-group-item d-flex justify-content-between align-items-center"
      >
        <span
          className={`todo-title mr-2 ${
            this.state.viewCompleted ? "completed-todo" : ""
          }`}
          title={user.name}
        >
          {user.name}
          {user.id}
        </span>
        <span>
          <button
            className="btn btn-secondary mr-2"
            onClick={() => this.editItem(user)}
          >
            Edit
          </button>
          <button
            className="btn btn-danger"
            onClick={() => this.handleDelete(user)}
          >
            Delete
          </button>
        </span>
      </li>
    ));
  }; */

  render() {
    return (
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

                <h4> Show posts without contact info here</h4>
                {/* TEST: does not work, Show contact info depending on authentication state */}
                {/*  {store.dispatch(getState(isAuthenticated))? (
                  <h4> Show posts without contact info here</h4>
                ) : (
                  <h4> posts with contact info</h4>
                )} */}

                {/*this.renderTabList()*/}
                <ul className="list-group list-group-flush border-top-0">
                  {/*this.renderItems()*/}
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
                  />
                }
              />
            )
          ) : null}
        </main>
      </Provider>
    );
  }
}

export default App;
