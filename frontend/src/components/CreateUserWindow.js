import React, { Component } from "react";


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

export default class CreateUser extends Component {
    render() {
        return (
            <div>
              <Form>
                <FormGroup>
                  <Label for="user-name">Name</Label>
                  <Input
                    type="text"
                    id="user-name"
                    name="name"
                    //value={this.state.activeUser.name}
                    //onChange={this.handleChange}
                    placeholder="Enter full name"
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="user-email">Email</Label>
                  <Input
                    type="text"
                    id="user-email"
                    name="email"
                    //value={this.state.activeUser.email}
                    //onChange={this.handleChange}
                    placeholder="Enter email"
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="user-username">Username</Label>
                  <Input
                    type="text"
                    id="user-username"
                    name="username"
                    //value={this.state.activeUser.username}
                    //onChange={this.handleChange}
                    placeholder="Enter username"
                  />
                </FormGroup>
              </Form>
              </div> 
            );
        }
    }