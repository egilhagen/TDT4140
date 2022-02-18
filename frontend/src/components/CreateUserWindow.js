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
  // TEEST flytta constructor og undereelent fra Modal

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
      const {onSave} = this.props;  
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
              {/* CreateUserWindow har sin egen save knapp, vurder om det visuelt ser bedre ut med/uten ModalFooter... blir litt feit med ModalFooter fordi den blir mata inn i ModalHeader, istedenfor utenfor som den var originalt. */}
              <ModalFooter>
              <Button
              color="success"
                  onClick={() => onSave(this.state.activeItem)}
                >
                Save
              </Button>
              </ModalFooter>
              </div> 
            );
        }
    }