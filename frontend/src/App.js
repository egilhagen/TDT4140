import React, { Component } from "react";
import Modal from "./components/Modal";
import LoginWindow from "./components/LoginWindow";
import CreateUserWindow from "./components/CreateUserWindow";
import CreatePostWindow from "./components/CreatePostWindow";
import axios from "axios";


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {

      userList: [],
      
 
      //let displayCreateUser = Symbol(displayCreateUser),
      modal: false,
      modalDisplayCreateUser: false, // bestemmer om CreateNewUser skjemaet skal vises inne i modalen isteden for login
      modalCreatePost: false,
      activeItem: {
        "name": "",
        "email": "",
        "username": "",
        "has_logged_in": false
      },
      activePost: {
        "title": "",
        "price": "",
        "date": "",
        "location": "OS",
        "category": "Concert",
        "saleOrBuy": "Sell",
        "description": "",
      }
    };
  }


  // Lifecycle method, invoked immediately after component is mounted.
  componentDidMount() {
    this.refreshList();
  }

  refreshList = () => {
    axios
      .get("/api/posts")

      .then((res) => this.setState({ userList: res.data }))
      .catch((err) => console.log(err));
  };

  // Viser/skjuler modal
  toggle = () => {
    this.setState({ modal: !this.state.modal });
    // sett modalDisplayCreateUser til false kver gang, sånn at du ikkje blir stuck på CreateUserWindow dersom du går inn der.
    this.setState({ modalDisplayCreateUser: false});
    this.setState({ modalCreatePost: false});

  };

  // Test: hopp fra login til CreateUserWindow inne i ein modal
  toggleCreateUserWindow = event => {
    //alert("toggleCreateUserWindow");
    this.setState({ modalDisplayCreateUser: !this.state.modalDisplayCreateUser });
    this.setState({ modalCreatePost: false});

    //event.preventDefault();
  };

  toggleCreatePostWindow = event => {
    //alert("toggleCreateUserWindow");
    this.setState({ modalCreatePost: !this.state.modalCreatePost });
    //event.preventDefault();
    this.setState({ modal: false});

  };

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
      .post("/api/auth/user/", user)
      .then((res) => this.refreshList());
  };

  handleSubmitPost = (post) => {
    this.toggleCreatePostWindow();
    //if user exists, update user(PUT) ?
    if (post.id) {
      axios
        .put(`/api/posts/${post.id}/`, post)
        .then((res) => this.refreshList());
      return;
    }
    // else create new user (POST) 
    axios
      .post("/api/posts/", post)
      .then((res) => this.refreshList());
    

  };


  handleDelete = (user) => {
    axios
      .delete(`/api/posts/${user.id}/`)
      .then((res) => this.refreshList());
  };

  createItem = () => {
    const user = { name: "", email: "", username: "", has_logged_in: false };

    this.setState({ activeItem: user, modal: !this.state.modal });
  };

  createPost = () => {
    const post = { title: "", price: "", date: "", location: "", category: "", saleOrBuy: "", description: "" };

    this.setState({ activePost: post, modalCreatePost: !this.state.modalCreatePost });
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
          {user.title}
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
              <div className="mb-4" id="test">
                <button
                  className="btn btn-primary"
                  onClick={this.createItem}
                >
                  Login
                </button>
                <button
                  className="btn btn-primary"
                  onClick={this.createPost}
                >
                  Create post
                </button>
              </div>
              <h4> List of users in backend database:</h4> 
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
      {this.state.modalCreatePost ? (
        // Deretter sjekk om den skal vise CreateUserWindow eller LoginWindow inne i modalen,  true= CreateUserWindow, false = LoginWindow
        <Modal
          activeUser={this.state.activeUser} 
          toggle={this.toggleCreatePostWindow}
          //onSave={this.handleSubmit}
          modalTitle = {<h3>Create new user</h3>}
          modalContent = {<CreatePostWindow activePost = {this.state.activePost}  onSave={this.handleSubmitPost} />} //onChange = {}
        />
        ) : null
      }
      <a>{this.activePost}</a>
      </main>
    );
  }
}

export default App;
