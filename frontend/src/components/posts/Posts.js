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

  // render posts
  renderItems = () => {
    const { isAuthenticated } = this.props.auth;

    const newItems = this.state.postList;
    return newItems.map((post) => (
      /*p-0= no padding. Column width depends on screen size and is set by: md=medium, sm=small, no prefix= extra small  */
      <div className="p-0 col-md-4 col-sm-6">
        {/* li gir litt luft mellom cards */}
        <li
          key={post.id}
          className="list-group-item d-flex justify-content-between align-items-center"
        >
          {/* TODO: Få alle cards til å ha samme høgde */}

          <span>
            <Card>
              <CardBody
                inverse
                style={{ backgroundColor: "#D6DBDF ", borderColor: "#333" }}
              >
                {/* TODO: CardTitle skal egentlig automatisk bli stor, h3 skal ikkje vere nødvendig... */}
                <CardTitle>
                  <h3>{post.title}</h3>
                </CardTitle>
                <CardImg
                  top
                  width="100%"
                  src={
                    {
                      Cinema:
                        "https://en.parisinfo.com/var/otcp/sites/images/node_43/node_51/node_7112/salle-de-cin%C3%A9ma-%7C-630x405-%7C-%C2%A9-fotolia-he2/12344768-1-fre-FR/Salle-de-cin%C3%A9ma-%7C-630x405-%7C-%C2%A9-Fotolia-he2.jpg",
                      Theater:
                        "https://media.architecturaldigest.com/photos/55e76564cd709ad62e8e7796/master/w_1600%2Cc_limit/dam-images-architecture-2015-01-web-toc-theaters-historic-american-theaters-01-thalian-hall.jpg",
                      Consert:
                        "https://www.halton.com/wp-content/uploads/2020/05/Concert_hall_rock_concert-1366x668.jpg",
                    }[post.category] ||
                    "https://travel.mqcdn.com/mapquest/travel/wp-content/uploads/2020/06/GettyImages-132338731-scaled.jpg"
                  }
                  alt={
                    {
                      Cinema: "Cinema image",
                      Theater: "Theater image",
                      Consert: "Concert image",
                    }[post.category] || "default alt text"
                  }
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
            {/* TODO: Edit and Delete buttons here */}
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
      </div>
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

    const guestMessage = <h4>Log in to create a new post</h4>;

    return (
      <div>
        {/* Vis/skjul createPostWindow */}
        {this.state.modalCreatePost ? (
          <Modal
            toggle={this.toggleCreatePostWindow}
            modalTitle={<h3>Create post</h3>}
            modalContent={
              <CreatePostWindow
                activePost={this.state.activePost}
                onSave={this.handleSubmitPost}
              />
            }
          />
        ) : null}
        {/* Vis/skjul createPostButton*/}

        {/* TODO: Flytt denne opp i header komponenten, attmed login/logout knappen  */}
        <div style={{ marginLeft: "80%", marginTop: "2%" }}>
          {isAuthenticated ? createPostButton : guestMessage}
        </div>
        <h1 className="text-black  text-center my-4">TicKing</h1>

        <div className="container">
          {/* md=medium, sm=small, no prefix= xtra small */}
          <div className="row row-cols-md-3 row-cols-1">
            {this.renderItems()}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(Posts);
