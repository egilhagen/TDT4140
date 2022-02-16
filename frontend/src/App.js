import React, { Component } from "react";
import Modal from "./components/Modal";
import LoginWindow from "./components/LoginWindow";
import axios from "axios";


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {

      userList: [],
      modal: false,
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

  toggle = () => {
    this.setState({ modal: !this.state.modal });
  };

  handleSubmit = (user) => {
    this.toggle();

    if (user.id) {
      axios
        .put(`/api/users/${user.id}/`, user)
        .then((res) => this.refreshList());
      return;
    }
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
          {this.state.viewCompleted  }
        
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
        <h1 className="text-white text-uppercase text-center my-4">Todo app</h1>
        <div className="row">
          <div className="col-md-6 col-sm-10 mx-auto p-0">
            <div className="card p-3">
              <div className="mb-4">
                <button
                  className="btn btn-primary"
                  onClick={this.createItem}
                >
                  Add task
                </button>
              </div>
              {this.renderTabList()}
              <ul className="list-group list-group-flush border-top-0">
                {this.renderItems()}
              </ul>
            </div>
          </div>
        </div>
        {this.state.modal ? (
          <Modal
            activeItem={this.state.activeItem}
            toggle={this.toggle}
            onSave={this.handleSubmit}
            view = {<LoginWindow/>}
            

          />
        ) : null}
      </main>
    );
  }
}

export default App;
