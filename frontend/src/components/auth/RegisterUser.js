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
  Alert,
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
    passwordErr: false,
  };

  static propTypes = {
    register: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool,
    auth: PropTypes.object.isRequired,
  };
  componentDidMount() {
    this.setAuthState();
  }

  onSubmit = (e) => {
    e.preventDefault();
    const { id, username, email, first_name, last_name, password, password2 } =
      this.state;
    const { toggleRegisterUserWindow } = this.props;
    if (password !== password2) {
      this.props.createMessage({ passwordNotMatch: "Passwords do not match" });
      /* Yalla error-handling som kun funke her fordi me gjer sjekken i react... Rett metode ville benytta den messagen over */
      this.setState({ ["passwordErr"]: true });
    } else {
      const newUser = {
        id,
        username,
        email,
        first_name,
        last_name,
        password,
      };
      alert(JSON.stringify(newUser));
      this.props.register(newUser);
      toggleRegisterUserWindow();
    }
  };

  /* Update internal component state as fields are filled in */
  onChange = (e) =>
    this.setState({ [e.target.name]: e.target.value, ["passwordErr"]: false });

  /* If a user is logged inn, fill state with existing data */
  setAuthState = () => {
    if (this.props.isAuthenticated) {
      const { id, username, email, first_name, last_name } =
        this.props.auth.user;

      this.setState({
        ["id"]: id,
        ["username"]: username,
        ["email"]: email,
        ["first_name"]: first_name,
        ["last_name"]: last_name,
      });

      /* this.setState({ ["id"]: this.props.auth.user.id }); */
    }
  };

  render() {
    const { id, username, email, first_name, last_name, password, password2 } =
      this.state;

    return (
      <div>
        {/* onSubmit kjøres når en knapp med type="submit" trykkes inne i Form */}
        <Form onSubmit={this.onSubmit}>
          {/* IF user logged in --> we are on a profile page (ie edit) --> hide username-field, add hidden id-field.  ELSE we are registering a new user, show username-field. */}
          {this.props.isAuthenticated ? (
            <FormGroup>
              {/*  Hidden input field holding auth user´s ID, used to make a PUT-request */}
              <Input
                type="hidden"
                id="user-id"
                name="id"
                value={id}
                onChange={this.onChange}
              />
              {/* Username required in put request? */}
              <Input
                type="hidden"
                id="user-username"
                name="username"
                value={username}
                onChange={this.onChange}
              />
            </FormGroup>
          ) : (
            /* Register new user, we need a username */
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
              value={first_name}
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
              value={last_name}
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
              value={email}
              onChange={this.onChange}
              placeholder="Enter email"
            />
          </FormGroup>
          <FormGroup>
            {this.state.passwordErr ? (
              <Alert color="danger">Passwords do not match</Alert>
            ) : null}

            <Label for="user-password">Password</Label>
            <Input
              type="password"
              id="user-password"
              name="password"
              value={password}
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
              value={password2}
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
