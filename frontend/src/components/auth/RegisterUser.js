import React, { Component } from "react";

// Redux
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { register } from "../../actions/auth";
import { createMessage } from "../../actions/messages";

import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Input,
  Label,
} from "reactstrap";

export class RegisterUser extends Component {
  state = {
    id: "",
    username: "",
    email: "",
    first_name: "",
    last_name: "",
    password: "",
    password2: "",
  };

  static propTypes = {
    register: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool,
    auth: PropTypes.object.isRequired,
  };

  onSubmit = (e) => {
    e.preventDefault();
    const { id, username, email, first_name, last_name, password, password2 } =
      this.state;
    const { toggleRegisterUserWindow } = this.props;
    if (password !== password2) {
      this.props.createMessage({ passwordNotMatch: "Passwords do not match" });
    } else {
      const newUser = {
        id,
        username,
        email,
        first_name,
        last_name,
        password,
      };
      this.props.register(newUser);
      toggleRegisterUserWindow();
    }
  };

  /* Update internal component state as fields are filled in */
  onChange = (e) => this.setState({ [e.target.name]: e.target.value });

  render() {
    //TODO: gjer noke dersom authenticated? naah, register skjemaet e kun tilgjengelig via login-skjemaet at the moment. muligens på brukerprofil-sida?
    /*
    if (this.props.isAuthenticated) {
      return <Redirect to="/" />;
    }
    */
    const { id, username, email, first_name, last_name, password, password2 } =
      this.state;
    /*
    if (this.props.isAuthenticated) {
      const {
        id,
        username,
        email,
        first_name,
        last_name,
        password,
        password2,
      } = this.authState;
       id, username, email, first_name, last_name, password, password2; 
    }  else {
      const {
        id,
        username,
        email,
        first_name,
        last_name,
        password,
        password2,
      } = this.state;
       id, username, email, first_name, last_name, password, password2; 
    } */

    /*   if (this.props.isAuthenticated) {
      this.setState({
        [id]: this.props.auth.user.id,
      });
    } */

    return (
      <div>
        {/* onSubmit kjøres når en knapp med type="submit" trykkes inne i Form */}
        <Form onSubmit={this.onSubmit}>
          {/* If user logged in --> register, show username-field. ELSE we are on a profile page ie edit --> hide username-field, add hidden id-field */}
          {this.props.isAuthenticated ? (
            <div>
              <FormGroup>
                {/* Hidden input field holding auth user´s ID, used to make a PUT
              request ie edit the user  */}
                <Input
                  type="hidden"
                  id="user-id"
                  name="id"
                  value={this.props.auth.user.id}
                  onChange={this.onChange}
                />
              </FormGroup>

              <FormGroup>
                <Input
                  type="hidden"
                  id="user-username"
                  name="username"
                  value={this.props.auth.user.username}
                  onChange={this.onChange}
                  placeholder="Enter username"
                />
              </FormGroup>
              {/* {alert(this.props.auth.user.username)}  Denne har korrekt data*/}
            </div>
          ) : (
            <FormGroup>
              <Label for="user-username">Username</Label>
              <Input
                type="text"
                id="user-username"
                name="username"
                value={username}
                onChange={this.onChange}
                placeholder="Enter username"
              />
            </FormGroup>
          )}

          <FormGroup>
            <Label for="user-first_name">First name</Label>
            <Input
              type="text"
              id="user-first_name"
              name="first_name"
              value={
                this.props.isAuthenticated
                  ? this.props.auth.user.first_name
                  : first_name
              }
              onChange={this.onChange}
              placeholder="Enter your first name"
            />
          </FormGroup>
          <FormGroup>
            <Label for="user-last_name">Last name</Label>
            <Input
              type="text"
              id="user-last_name"
              name="last_name"
              value={
                this.props.isAuthenticated
                  ? this.props.auth.user.last_name
                  : last_name
              }
              onChange={this.onChange}
              placeholder="Enter your last name"
            />
          </FormGroup>
          <FormGroup>
            <Label for="user-email">Email</Label>
            <Input
              type="text"
              id="user-email"
              name="email"
              value={
                this.props.isAuthenticated ? this.props.auth.user.email : email
              }
              onChange={this.onChange}
              placeholder="Enter email"
            />
          </FormGroup>
          <FormGroup>
            <Label for="user-password">Password</Label>
            <Input
              type="password"
              id="user-password"
              name="password"
              value={
                this.props.isAuthenticated
                  ? this.props.auth.user.password
                  : password
              }
              onChange={this.onChange}
              placeholder="Enter password"
            />
          </FormGroup>
          <FormGroup>
            <Label for="user-password2">Confirm password</Label>
            <Input
              type="password"
              id="user-password2"
              name="password2"
              value={
                this.props.isAuthenticated
                  ? this.props.auth.user.password
                  : password2
              }
              onChange={this.onChange}
              placeholder="Enter password again"
            />
          </FormGroup>

          {/* CreateUserWindow har sin egen save knapp, vurder om det visuelt ser bedre ut med/uten ModalFooter... blir litt feit med ModalFooter fordi den blir mata inn i ModalHeader, istedenfor utenfor som den var originalt. */}
          <ModalFooter>
            <Button type="submit" className="btn btn-primary" color="success">
              Save
            </Button>
          </ModalFooter>
        </Form>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  auth: state.auth,
});

export default connect(mapStateToProps, { register, createMessage })(
  RegisterUser
);
