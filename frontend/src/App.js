import React, { Component } from "react";
import Modal from "./components/Modal";
import LoginWindow from "./components/LoginWindow";
import CreateUserWindow from "./components/CreateUserWindow";
import axios from "axios";


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {

      userList: [],
      modal: false,
      modalDisplayCreateUser: false, // bestemmer om CreateNewUser skjemaet skal vises inne i modalen isteden for login
      activeItem: {
        "name": "",
        "email": "",
        "username": "",
        "has_logged_in": false
      },
    };
  }


  // Lifecycle method, invoked immediately after component is mounted.
  componentDidMount() {
    this.refreshList();
  }

  refreshList = () => {
    axios
      .get("/api/users/")
      .then((res) => this.setState({ userList: res.data }))
      .catch((err) => console.log(err));
  };

  // Viser/skjuler modal
  toggle = () => {
    this.setState({ modal: !this.state.modal });
    // sett modalDisplayCreateUser til false kver gang, sånn at du ikkje blir stuck på CreateUserWindow dersom du går inn der.
    this.setState({ modalDisplayCreateUser: false});
  };

  // Test: hopp fra login til CreateUserWindow inne i ein modal
  toggleCreateUserWindow = event => {
    //alert("toggleCreateUserWindow");
    this.setState({ modalDisplayCreateUser: !this.state.modalDisplayCreateUser });
    //event.preventDefault();
  };

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
      .post("/api/users/", user)
      .then((res) => this.refreshList());
  };


  handleDelete = (user) => {
    axios
      .delete(`/api/users/${user.id}/`)
      .then((res) => this.refreshList());
  };

  createItem = () => {
    const user = { name: "", email: "", username: "", has_logged_in: false };

    this.setState({ activeItem: user, modal: !this.state.modal });
  };

  editItem = (user) => {
    this.setState({ activeItem: user, modal: !this.state.modal });
  };



  renderTabList = () => {
    return (
      <div className="nav nav-tabs">
          {this.state.viewCompleted}
      </div>
    );
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
  };

  render() {
    return (
      <main className="container">
        <h1 className="text-black text-uppercase text-center my-4">Ticking</h1>
        <div className="row">
          <div className="col-md-6 col-sm-10 mx-auto p-0">
            <div className="card p-3">
              <div className="mb-4">
                <button
                  className="btn btn-primary"
                  onClick={this.createItem}
                >
                  Login
                </button>
              </div>
              {this.renderTabList()}
              <ul className="list-group list-group-flush border-top-0">
                {this.renderItems()}
              </ul>
            </div>
          </div>
        </div>
        {/* Først, sjekk om me skal vise modalen */}
        {this.state.modal ? (
            // Deretter sjekk om den skal vise CreateUserWindow eller LoginWindow inne i modalen,  true= CreateUserWindow, false = LoginWindow
            this.state.modalDisplayCreateUser ? (
              <Modal
                //activeItem={this.state.activeItem} 
                toggle={this.toggle}
                //onSave={this.handleSubmit}
                modalTitle = {<h3>Create new user</h3>}
                modalContent = {<CreateUserWindow activeItem = {this.state.activeItem}  onSave={this.handleSubmit} />} //onChange = {}
              />
            ) : <Modal
              //activeItem={this.state.activeItem}
              toggle={this.toggle}
              onSave={this.handleSubmit}
              // setter Content = LoginWindow, og sender inn funksjonen som lar deg bytte fra LoginWindow til CreateUserWindow som child prop 
              modalTitle = {<h3>Sign In</h3>}
              modalContent = {<LoginWindow toggleCreateUserWindow = {this.toggleCreateUserWindow}/>}
            />
        ) : null
      }
      </main>
    );
  }
}

export default App;
