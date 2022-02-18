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
  // TEEST flytta constructor og undereelent fra Modal, ligger

  constructor(props) {
    super(props);
    this.state = {
      activeItem: this.props.activeItem, 
    };
  }


    // TEST: flytta fra Modal til her
    handleChange = (e) => {
      let { name, value } = e.target;

      const activeItem = { ...this.state.activeItem, [name]: value };

      this.setState({ activeItem });
    };



    render() {
      // TODO: send inn som children fra app.js og pakk ut value og onChange!
      //const { activeItem } = this.props; 
        return (
            <div>
              <Form>
                <FormGroup>
                  <Label for="user-name">Name</Label>
                  <Input
                    type="text"
                    id="user-name"
                    name="name"
                    value={this.state.activeItem.name}
                    onChange={this.handleChange}
                    placeholder="Enter full name"
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="user-email">Email</Label>
                  <Input
                    type="text"
                    id="user-email"
                    name="email"
                    value={this.state.activeItem.email}
                    onChange={this.handleChange}
                    placeholder="Enter email"
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="user-username">Username</Label>
                  <Input
                    type="text"
                    id="user-username"
                    name="username"
                    value={this.state.activeItem.username}
                    onChange={this.handleChange}
                    placeholder="Enter username"
                  />
                </FormGroup>
              </Form>
              </div> 
            );
        }
    }