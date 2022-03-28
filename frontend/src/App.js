import React, { Component } from "react";

//Our components
import Modal from "./components/layout/Modal";
import Posts from "./components/posts/Posts";
import Login from "./components/auth/Login"; // OBS: { Login } gir feil. https://stackoverflow.com/questions/65915279/i-have-this-error-uncaught-typeerror-this-props-login-is-not-a-function
import RegisterUser from "./components/auth/RegisterUser";
import Header from "./components/layout/Header";
import Filter from "./components/Filter/Filter";

//Redux
import { Provider } from "react-redux";
import store from "./store";
import { loadUser } from "./actions/auth";

// Router - Outlet is where components passed to a Route are rendered.
import { Outlet } from "react-router-dom";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      modal: false,
      modalDisplayCreateUser: false, //TODO: dårlig navn. bestemmer om CreateNewUser skjemaet skal vises inne i modalen isteden for login
    };
  }

  // Lifecycle method, invoked immediately after component is mounted. If there is an auth token in the store it loads the logged in user.TODO: Cause of flashing logout button bug
  componentDidMount() {
    store.dispatch(loadUser());
  }

  // TODO: flytt desse inn i modal?
  // Viser/skjuler modal
  toggle = () => {
    this.setState({ modal: !this.state.modal });
    // sett modalDisplayCreateUser til false kver gang, sånn at du ikkje blir stuck på CreateUserWindow dersom du går inn der.
    this.setState({ modalDisplayCreateUser: false });
    this.setState({ modalCreatePost: false });
    this.setState({ modalCreateTransaction: false });
  };

  // Hopp fra login til CreateUserWindow inne i modal-popupen
  toggleRegisterUserWindow = (event) => {
    this.setState({
      modalDisplayCreateUser: !this.state.modalDisplayCreateUser,
    });
    this.setState({ modalCreatePost: false });
  };

  //TODO: endre navn, creater ingenting:] Viser modal-popupen
  createItem = () => {
    this.setState({ modal: !this.state.modal });
  };

  // TODO: edit user --> link til rediger profilside?
  editItem = (user) => {
    this.setState({ activeItem: user, modal: !this.state.modal });
  };

  //TODO: ikkje i bruk, men kan kanskje brukes til å velge mellom å vise annonser for kjøp og salg?
  renderTabList = () => {
    return <div className="nav nav-tabs">{this.state.viewCompleted}</div>;
  };

  render() {
    return (
      <Provider store={store}>
        {/* Header med sidetittel, mater inn login/logoutknapp som prop */}
        <Header
          loginButton={
            <button className="btn btn-primary" onClick={this.createItem}>
              Login
            </button>
          }
        />
        {/* Router Outlet, child routes of app.js get rendered here! i.e the profile-page */}
        <Outlet />

        {/* TODO: lag switch på å vise Outlet eller Posts ? linja under funka ikkje  */}
        {/* {!!(<Outlet />) ? <Outlet /> : <Posts />} */}
        {/*  {this.props.match.params === "solan" ? <Outlet /> : <Posts />} */}

        {/* TODO: Bruk renderTabList til å vise SALE eller BUY tickets */}
        {/* {this.renderTabList()} */}
        {/* <ul className="list-group list-group-flush border-top-0"> */}

        {/* Post Component renders all posts in database */}


        <Filter
        />

        {/* </ul> */}

        {/* Vis/skjul modal/popup */}
        {this.state.modal ? (
          // Deretter sjekk om den skal vise Register eller LoginWindow inne i modalen,  true= Register, false = LoginWindow
          this.state.modalDisplayCreateUser ? (
            <Modal
              toggle={this.toggle}
              modalTitle={<h3>Create new user</h3>}
              modalContent={
                <RegisterUser toggleRegisterUserWindow={this.toggle} />
              }
            />
          ) : (
            <Modal
              toggle={this.toggle}
              modalTitle={<h3>Sign In</h3>}
              // setter Content = LoginWindow, og sender inn funksjonen som lar deg bytte fra LoginWindow til Register som child prop
              modalContent={
                <Login
                  toggleRegisterUserWindow={this.toggleRegisterUserWindow}
                  toggle={this.toggle}
                />
              }
            />
          )
        ) : null}
      </Provider>
    );
  }
}

export default App;
