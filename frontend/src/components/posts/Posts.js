import React, { Component } from "react";

// Components
import Modal from "../layout/Modal";
import CreatePostWindow from "../CreatePostWindow";

// API requests
import axios from "axios";

// Redux
import { connect } from "react-redux";
import PropTypes from "prop-types";

// Post reactstrap-cards
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

export class Posts extends Component {
  constructor(props) {
    super(props);

    this.state = {
      postList: [],
      modalCreatePost: false,
      modalTitle: "",
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
    /* Close window on save */
    this.toggleCreatePostWindow();
    //IF post exists --> update existing post (PUT-request)
    if (post.id) {
      axios
        .put(`/api/posts/${post.id}/`, post)
        .then((res) => this.refreshList());
      return;
    }
    // ELSE create new post (POST-request)
    axios.post("/api/posts/", post).then((res) => this.refreshList());
  };

  toggleCreatePostWindow = (event) => {
    this.setState({ modalCreatePost: !this.state.modalCreatePost });
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

  editPost = (existingPost) => {
    const post = {
      id: existingPost.id /* ein existing post har fått ein id, dette brukest for å gjere ein PUT-request når ein redigerer */,
      title: existingPost.title,
      price: existingPost.price,
      date: existingPost.date,
      location: existingPost.location,
      category: existingPost.category,
      saleOrBuy: existingPost.saleOrBuy,
      description: existingPost.description,
      user: this.props.auth.user
        .id /* TODO: kan dette bli et problem? kan sjå på da som ein feature, e-post og id blir oppdatert dersom de har blitt endret ;) */,
      contactInfo: this.props.auth.user.email,
    };

    this.setState({
      activePost: post,
    });
  };

  /* OBS: Denne kan kun brukes der isAuthenticated == true, aka vi vet at bruker er innlogget */
  canEditPost = (postOwnerId) => {
    /*  alert(postId);
    alert(this.props.auth.user.id); */
    if (this.props.auth.user.id == postOwnerId) {
      return true;
    } else {
      return false;
    }
  };

  /* Used to change modal title between "create post" and "edit post" depending on what button is pushed */
  setModalTitle = (title) => {
    this.setState({
      modalTitle: title,
    });
  };

  // render posts
  renderItems = () => {
    const { isAuthenticated } = this.props.auth;

    const newItems = this.state.postList;

    return newItems.map((post) => (
      <li
        key={post.id}
        className="list-group-item d-flex justify-content-between align-items-center"
      >
        <span>
          <Card>
            <CardBody
              /* inverse */
              style={{ backgroundColor: "#D6DBDF ", borderColor: "#333" }}
            >
              <CardTitle>
                {/* Flexbox magi for å få knapp og overskrift på vertikal og horisontal linje + med plass mellom. https://css-tricks.com/snippets/css/a-guide-to-flexbox/  */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  {/* TODO: CardTitle skal egentlig automatisk bli stor, h3 skal ikkje vere nødvendig... */}
                  <h3>{post.title}</h3>

                  {isAuthenticated ? (
                    <div>
                      {/* IF user isAuthenticated and postOwnerId == this.props.auth.user.id ---> show edit button ELSE --> null  */}
                      {this.canEditPost(post.user) ? (
                        <button
                          className="btn"
                          title="Click here to edit your post" /* denne vises når du svever over knappen */
                          onClick={() => {
                            this.toggleCreatePostWindow();
                            this.editPost(post);
                            this.setModalTitle("Edit post");
                          }}

                          /* TODO: gjør edit-blyanten større onHover: */
                          /* 
                          onMouseEnter={() => {
                            alert("Event:MouseEnter");
                          }}
                         */
                        >
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
                      ) : null}
                    </div>
                  ) : null}
                </div>
              </CardTitle>
              <CardImg
                top
                width="100%"
                //TODO: Legg in ein switch på post.category som bestemmer bildet
                src="https://en.parisinfo.com/var/otcp/sites/images/node_43/node_51/node_7112/salle-de-cin%C3%A9ma-%7C-630x405-%7C-%C2%A9-fotolia-he2/12344768-1-fre-FR/Salle-de-cin%C3%A9ma-%7C-630x405-%7C-%C2%A9-Fotolia-he2.jpg"
                alt="Card image cap"
              />

              <CardSubtitle>
                <br />
                <h5>Buying or selling: {post.saleOrBuy} </h5>
              </CardSubtitle>
              <CardSubtitle>
                {post.category} ticket in {post.location}
                <br />
                {post.date}
                <br />
                Price: {post.price}
              </CardSubtitle>
              <CardText>
                <br />
                {post.description}
                <br />
              </CardText>

              {isAuthenticated ? (
                <div>
                  <label>
                    {/* Todo: dette kan umulig være rett måte å få mellomrom etter "Contact" :] */}
                    {"Contact: "}
                    {/* Kan sette subject og body på emailen: ?subject=TicKing ticket: &body=Hello!" */}
                    <a
                      href={
                        "mailto:" +
                        post.contactInfo +
                        "?subject=TicKing ticket: " +
                        post.title
                      }
                    >
                      {post.contactInfo}
                    </a>
                  </label>
                </div>
              ) : (
                <div>
                  <label>Contact: Log in to show contact information</label>
                </div>
              )}
            </CardBody>
          </Card>
        </span>
        <span>
          {/* TODO: Delete button here, trash icon */}
          {/*
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
            this.setModalTitle("Create post");
          }}
        >
          Create post
        </button>
      </div>
    );

    const guestMessage = <h4>Log in to create a new post</h4>;

    return (
      <div>
        {/* Vis/skjul createPostWindow */}
        {this.state.modalCreatePost ? (
          <Modal
            toggle={this.toggleCreatePostWindow}
            modalTitle={<h3>{this.state.modalTitle}</h3>}
            modalContent={
              <CreatePostWindow
                activePost={this.state.activePost}
                onSave={this.handleSubmitPost}
              />
            }
          />
        ) : null}
        {/* Vis/skjul createPostButton*/}
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
