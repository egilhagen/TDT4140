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
    username: "",
    email: "",
    password: "",
    password2: "",
  };

  static propTypes = {
    register: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool,
  };

  onSubmit = (e) => {
    e.preventDefault();
    const { username, email, password, password2 } = this.state;
    const { toggleRegisterUserWindow } = this.props;
    if (password !== password2) {
      this.props.createMessage({ passwordNotMatch: "Passwords do not match" });
    } else {
      const newUser = {
        username,
        email,
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

    const { username, email, password, password2 } = this.state;

    return (
      <div>
        {/* onSubmit kjøres når en knapp med type="submit" trykkes inne i Form */}
        <Form onSubmit={this.onSubmit}>
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
});

export default connect(mapStateToProps, { register, createMessage })(
  RegisterUser
);
