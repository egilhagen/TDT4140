import React, { Component } from "react";

// Components
import Modal from "../layout/Modal";
import CreatePostWindow from "../CreatePostWindow";
import Filter from "../Filter/Filter";

//styling
import "./Post.css";

// API requests
import axios from "axios";

// Redux
import { connect } from "react-redux";
import PropTypes from "prop-types";

// React Router
import { Link } from "react-router-dom";

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
import CreateTransactionWindow from "./CreateTransactionWindow";

export class Posts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      postList: [],
      transactionList: [],
      modalCreatePost: false,
      modalCreateTransaction: false,
      modalTitle: "",
      filteredPostList: [],
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
        postOwnerUsername: "",
        flagged: true,
      },

      activeTransaction: {
        post: "",
        seller: "",
        buyer: "",
        ratingFromSeller: "",
        ratingFromBuyer: "",
      },
    };
  }

  static propTypes = {
    auth: PropTypes.object.isRequired,
  };

  /**Bruker nå refreshList fra Filter.js */
  componentDidMount() {
    this.props.refreshList();
  }

  /* Dette fikser problemet med at du måtte refreshe sida for å sjå nye posts/endringer, MEEEN inf. loop... */
  /* componentDidUpdate() {
     this.props.refreshList(); 
  } */

  /*   refreshList = () => {
    axios
      .get("/api/posts")

      .then((res) => this.setState({ postList: res.data }))
      .catch((err) => console.log(err));
  }; */

  // refreshList = () => {
  //   axios
  //     .get("/api/users")
  //     .then((res) => this.setState({ userList: res.data }))
  //     .catch((err) => console.log(err));
  // };

  scrollToBottom = () => {
    this.el.scrollIntoView({ behavior: "smooth" });
  };

  handleSubmitPost = (post) => {
    const { refreshList } = this.props;
    /* this.toggleCreatePostWindow(); */
    /* Close window on save */
    this.setState({ modalCreatePost: false });

    //IF post exists, update post --> PUT-request
    if (post.id) {
      axios.put(`/api/posts/${post.id}/`, post).then((res) => refreshList());
      refreshList();
      refreshList();

      return;
    }
    // ELSE create new post --> POST-request
    axios.post("/api/posts/", post).then((res) => refreshList());
    refreshList();
    refreshList();
    this.scrollToBottom();
  };

  handleSubmitTransaction = (transaction) => {
    const { refreshList } = this.props;
    this.toggleCreateTransactionWindow();
    axios.post("/api/transactions/", transaction).then((res) => refreshList());
  };

  // handleSellPost = (post, user) => {

  // }

  toggleCreatePostWindow = (event) => {
    //alert("toggleCreateUserWindow");
    this.setState({ modalCreatePost: !this.state.modalCreatePost });
    //event.preventDefault();
    //this.setState({ modal: false });
  };

  toggleCreateTransactionWindow = (event) => {
    this.setState({
      modalCreateTransaction: !this.state.modalCreateTransaction,
    });
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
      postOwnerUsername: this.props.auth.user.username,
      flagged: false,
    };

    this.setState({
      activePost: post,
    });
  };
  createTransaction = (post) => {
    const transaction = {
      post: post.id,
      seller: this.props.auth.user.id,
      buyer: this.props.auth.user.id,
      ratingFromSeller: null,
      ratingFromBuyer: null,
    };

    this.setState({
      activeTransaction: transaction,
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
      postOwnerUsername: this.props.auth.user.username,
      flagged: existingPost.flagged,
    };

    this.setState({
      activePost: post,
    });
  };

  /* Setter hidden til true for å gjømme posten, også gjøres en PUT-request for å oppdatere databasen. */
  hidePost = (existingPost) => {
    const post = {
      id: existingPost.id,
      title: existingPost.title,
      price: existingPost.price,
      date: existingPost.date,
      location: existingPost.location,
      category: existingPost.category,
      saleOrBuy: existingPost.saleOrBuy,
      description: existingPost.description,
      hidden: true,
      user: this.props.auth.user.id,
      contactInfo: this.props.auth.user.email,
      postOwnerUsername: this.props.auth.user.username,
      flagged: existingPost.flagged,
    };
    this.setState({
      activePost: post,
    });
    /* TODO: dette er ein workaround, activePost: post funke ikkje før andre knappetrykk. vil egentlig submitte this.state.activePost */
    this.handleSubmitPost(post);
    /* this.handleSubmitPost(this.state.activePost); */
  };

  flagPost = (existingPost) => {
    const post = {
      id: existingPost.id,
      title: existingPost.title,
      price: existingPost.price,
      date: existingPost.date,
      location: existingPost.location,
      category: existingPost.category,
      saleOrBuy: existingPost.saleOrBuy,
      description: existingPost.description,
      hidden: existingPost.hidden,
      user: existingPost.user,
      contactInfo: existingPost.contactInfo,
      postOwnerUsername: existingPost.postOwnerUsername,
      flagged: true,
    };
    this.setState({
      activePost: post,
    });
    /* TODO: dette er ein workaround, activePost: post funke ikkje før andre knappetrykk. vil egentlig submitte this.state.activePost */
    this.handleSubmitPost(post);
    /* this.handleSubmitPost(this.state.activePost); */
  };

  /* OBS: Denne kan kun brukes der isAuthenticated == true, aka vi vet at bruker er innlogget */
  isActiveUserPost = (postOwnerId) => {
    /*  alert(postId);
    alert(this.props.auth.user.id); */
    if (this.props.auth.user.id == postOwnerId) {
      return true;
    } else {
      return false;
    }
  };
  // canRateBack = (postOwnerId, postId) => {
  //   if
  // }

  /*FUNKE, MEN GÅR AAALTFOR TREIGT, SPAMME GET-REQUESTS. Yalla måte å hente ut brukernavn fra id i post loop´en siden me kun har tilgang på id. brukes til å lage lenke til eiers profilside */
  /*   getUsernameFromID = (postOwnerId) => {
    axios
      .get(`/api/users/${postOwnerId}`)

      .then((res) => this.setState({ activeUser: res.data.username }))
      .catch((err) => console.log(err));
  }; */

  /* Used to change modal title between "create post" and "edit post" depending on what button is pushed */
  setModalTitle = (title) => {
    this.setState({
      modalTitle: title,
    });
  };

  // render posts
  renderItems = () => {
    const { isAuthenticated } = this.props.auth;
    const { filteredPostList } = this.props;

    return filteredPostList.map((post) => (
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
                /* inverse */
                /* Change card background colour based on if post is hidden or not */
                style={
                  post.hidden
                    ? {
                        backgroundColor:
                          "#D6DBDF" /* Old red colour: "#fc4103" */,
                        borderColor: "#333",
                        opacity: "0.5",
                      }
                    : post.flagged
                    ? { backgroundColor: "#fcb103", borderColor: "#333" }
                    : { backgroundColor: "#D6DBDF", borderColor: "#333" }
                }

                /* style={{ backgroundColor: "#D6DBDF ", borderColor: "#333" }} */
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
                    {/* TODO: kan ha logikk for å vise enten SOLD eller BOUGHT avhengig av post.saleOrBuy */}
                    {/* TODO: Burde egentlig ha eit felt for hidden og eit for deleted. For å vise DELETED isteden for SOLD/BOUGHT  */}
                    {/* IF hidden --> already sold/bought ELSE see comment below */}
                    {post.hidden ? (
                      post.saleOrBuy == "Sale" ? (
                        <label>SOLD</label>
                      ) : (
                        <label>BOUGHT</label>
                      )
                    ) : post.flagged ? (
                      <div>
                        <label>REPORTED</label>
                      </div>
                    ) : isAuthenticated ? (
                      <div>
                        {/* IF user isAuthenticated and postOwnerId == this.props.auth.user.id ---> show edit and delete buttons ELSE --> null  */}
                        {this.isActiveUserPost(post.user) ? (
                          <div>
                            {/* Delete button */}
                            <button
                              className="btn"
                              /* denne vises når du svever over knappen */
                              title="Click here to delete your post"
                              onClick={() => {
                                /* Submit posten, blir ein PUT-request der hidden=true  */
                                this.hidePost(post);
                              }}
                            >
                              {/* Trash-icon */}
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                height="36px"
                                viewBox="0 0 24 24"
                                width="36px"
                                fill="#000000"
                              >
                                <path d="M0 0h24v24H0V0z" fill="none" />
                                <path d="M16 9v10H8V9h8m-1.5-6h-5l-1 1H5v2h14V4h-3.5l-1-1zM18 7H6v12c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7z" />
                              </svg>
                            </button>
                            {/* Edit button */}
                            <button
                              className="btn"
                              /* denne vises når du svever over knappen */
                              title="Click here to edit your post"
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
                          </div>
                        ) : post.flagged ? (
                          <div>
                            <label>REPORTED</label>
                          </div>
                        ) : (
                          <div>
                            {/* Report button */}
                            <button
                              className="btn"
                              /* denne vises når du svever over knappen */
                              title="Click here to report this post"
                              onClick={() => {
                                this.flagPost(post);
                              }}
                            >
                              {/* Flag-icon */}
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                height="36px"
                                viewBox="0 0 24 24"
                                width="36px"
                                fill="#000000"
                              >
                                <path d="M0 0h24v24H0V0z" fill="none" />
                                <path d="M12.36 6l.4 2H18v6h-3.36l-.4-2H7V6h5.36M14 4H5v17h2v-7h5.6l.4 2h7V6h-5.6L14 4z" />
                              </svg>
                            </button>
                          </div>
                        )}
                      </div>
                    ) : null}
                  </div>
                </CardTitle>
                <CardImg
                  top
                  width="100%"
                  src={
                    {
                      Cinema: process.env.PUBLIC_URL + "/Icons/kino.jpg",
                      Theater: process.env.PUBLIC_URL + "/Icons/teater.png",
                      Consert: process.env.PUBLIC_URL + "/Icons/konsert.jpg",
                    }[post.category] ||
                    process.env.PUBLIC_URL + "/Icons/annet.jpg"
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
                  {/*  <h5>Buying or selling: {post.saleOrBuy} </h5>  */}
                  {post.saleOrBuy == "Sale" ? (
                    <h5>Selling</h5>
                  ) : (
                    <h5>Buying</h5>
                  )}
                </CardSubtitle>
                <CardSubtitle>
                  {post.category} ticket in {post.location}
                  <br />
                  {post.date}
                  <br />
                  Price: {post.price} kr
                </CardSubtitle>
                <CardText>
                  <br />
                  {post.description}
                  <br />
                </CardText>
                {/* IF hidden --> already sold. ELSE (IF isAuthenticated --> show contactInfo. ELSE --> log in to show Contactinfo.) */}
                {post.hidden ? (
                  post.saleOrBuy == "Sale" ? (
                    <label>Contact: This ticket has already been sold.</label>
                  ) : (
                    <label>Contact: This ticket has already been bought.</label>
                  )
                ) : isAuthenticated ? (
                  <div>
                    <div
                      id="profile-and-rating-wrapper"
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <div>
                        {/* TODO: legg inn lenke til eiers profilside her */}
                        {/* Det blir for mange get requests, går treigt */}
                        {/*  {this.getUsernameFromID(post.user)} */}

                        {post.saleOrBuy == "Sale" ? "Seller: " : "Buyer: "}

                        <Link
                          style={{ margin: "1rem 0" }}
                          to={`/profiles/${post.postOwnerUsername}`}
                        >
                          {post.postOwnerUsername ==
                          this.props.auth.user.username
                            ? post.postOwnerUsername + "(Me)"
                            : post.postOwnerUsername}
                        </Link>
                      </div>

                      {/* <div>Rating: x/5 stars</div> */}
                    </div>
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
                    <br></br>
                    <br></br>
                    {this.isActiveUserPost(post.user) ? (
                      <button
                        onClick={() => {
                          this.toggleCreateTransactionWindow();
                          this.createTransaction(post);
                        }}
                        className="nav-link btn btn-info btn-sm text-light"
                      >
                        {post.saleOrBuy == "Sale"
                          ? "Complete sale"
                          : "Complete purchase"}
                      </button>
                    ) : null}
                    {/* {transactionItems.find(
                      (transactionItem) =>
                        transactionItem.buyer === this.props.auth.user.id &&
                        transactionItem.post === post.id
                    ) != null ? (
                      <button
                        onClick={() => {}}
                        className="nav-link btn btn-info btn-sm text-light"
                      >
                        Rate back
                      </button>
                    ) : null}
                    ; */}
                  </div>
                ) : (
                  <div>
                    <label>Contact: Log in to show contact information</label>
                  </div>
                )}
              </CardBody>
            </Card>
          </span>
          <span>{/* TODO: Delete button here, trash icon */}</span>
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
            this.setModalTitle("Create post");
          }}
        >
          Create post
        </button>
      </div>
    );

    const guestMessage = <h4>Log in to create a new post</h4>;

    return (
      <div id="post-div">
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

        {/* TODO: Flytt denne opp i header komponenten, attmed login/logout knappen  */}
        <div style={{ marginLeft: "80%", marginTop: "2%" }}>
          {isAuthenticated ? createPostButton : guestMessage}
        </div>

        {/* Create Transaction */}
        {this.state.modalCreateTransaction ? (
          <Modal
            toggle={this.toggleCreateTransactionWindow}
            modalTitle={<h3>Review Transaction</h3>}
            modalContent={
              <CreateTransactionWindow
                activeTransaction={this.state.activeTransaction}
                // activePost={post}
                onSave={this.handleSubmitTransaction}
              />
            }
          />
        ) : null}

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <h2>Tickets</h2>
          {/*         <img
            src={
              process.env.PUBLIC_URL + "/Icons/Logo_GoldKing.svg"
            } Asset-1.svg, Logo_GoldKing.svg, Logo_BlackKing.svg  
            style={{ height: 150 }}
            alt="TickingLogo"
          /> */}
        </div>

        <div className="container">
          {/* md=medium, sm=small, no prefix= xtra small */}
          <div className="row row-cols-md-3 row-cols-1">
            {this.renderItems()}
          </div>
          <div
            ref={(el) => {
              this.el = el;
            }}
          ></div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(Posts);
