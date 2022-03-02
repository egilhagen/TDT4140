import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Modal from "../layout/Modal";
import CreatePostWindow from "../CreatePostWindow";

import axios from "axios";

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
import auth from "../../reducers/auth";

export class Posts extends Component {
  constructor(props) {
    super(props);

    this.state = {
      postList: [],
      //modalCreatePost: false,

      //let displayCreateUser = Symbol(displayCreateUser),
      //modal: false,
      //modalDisplayCreateUser: false, // bestemmer om CreateNewUser skjemaet skal vises inne i modalen isteden for login
      modalCreatePost: false,
      /*MERGE
      activeItem: {
        "name": "",
        "email": "",
        "username": "",
        "has_logged_in": false
      },*/
      activePost: {
        title: "",
        price: "",
        date: "",
        location: "",
        category: "",
        saleOrBuy: "",
        description: "",
        user: "",
        contactInfo: "",
      },
    };
  }
  static propTypes = {
    auth: PropTypes.object.isRequired,
  };

  // Lifecycle method, invoked immediately after component is mounted.
  componentDidMount() {
    this.refreshList();
  }

  refreshList = () => {
    axios
      .get("/api/posts")

      .then((res) => this.setState({ postList: res.data }))
      .catch((err) => console.log(err));
  };

  handleSubmitPost = (post) => {
    alert("HEi");
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
  };

  toggleCreatePostWindow = (event) => {
    //alert("toggleCreateUserWindow");
    this.setState({ modalCreatePost: !this.state.modalCreatePost });
    //event.preventDefault();
    //this.setState({ modal: false });
  };

  createPost = () => {
    const post = {
      title: "",
      price: "",
      date: "",
      location: "",
      category: "",
      saleOrBuy: "",
      description: "",
      user: this.props.auth.user.id,
      contactInfo: this.props.auth.user.email,
    };

    this.setState({
      activePost: post,
    });
  };

  // render posts
  renderItems = () => {
    const { isAuthenticated } = this.props.auth;
    //const { viewCompleted } = this.state;
    const newItems = this.state.postList;

    return newItems.map((post) => (
      <li
        key={post.id}
        className="list-group-item d-flex justify-content-between align-items-center"
      >
        <span
        /* onClick={() => alert("hallo")}
          className={`todo-title mr-2 ${
            this.state.viewCompleted ? "completed-todo" : ""
          }`} */
        //title={post.title}
        >
          <div>Buying or selling: </div>
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

              {isAuthenticated ? (
                <div>
                  <label>Contactinfo: {post.contactInfo}</label>
                </div>
              ) : (
                <div>
                  <label>Log in to show contact information</label>
                </div>
              )}
            </CardBody>
          </Card>
        </span>
        <span>
          {/*<button
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
          </button>*/}
        </span>
      </li>
    ));
  };

  render() {
    const { isAuthenticated } = this.props.auth;

    const createPostButton = (
      <div>
        <button
          className="btn btn-primary"
          onClick={() => {
            this.toggleCreatePostWindow();
            this.createPost();
          }}
        >
          Create post
        </button>
      </div>
    );

    const guestMessage = <a>Log in to create post</a>;

    return (
      <div>
        {this.state.modalCreatePost ? (
          // Deretter sjekk om den skal vise CreateUserWindow eller LoginWindow inne i modalen,  true= CreateUserWindow, false = LoginWindow
          <Modal
            //activeUser={this.state.activeUser}
            toggle={this.toggleCreatePostWindow}
            //onSave={this.handleSubmit}
            modalTitle={<h3>Create post</h3>}
            modalContent={
              <CreatePostWindow
                activePost={this.state.activePost}
                onSave={this.handleSubmitPost}
              />
            } //onChange = {}
          />
        ) : null}
        {isAuthenticated ? createPostButton : guestMessage}
        {this.renderItems()}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(Posts);
