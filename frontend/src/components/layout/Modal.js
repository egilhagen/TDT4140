import React, { Component } from "react";
//import LoginWindow from "./LoginWindow";
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

export default class CustomModal extends Component {
  render() {
    // Children props  this.props.toggle <LoginWindow></LoginWindow>
    const { toggle, onSave, modalContent, modalTitle } = this.props;

    return (
      <Modal isOpen={true} toggle={toggle}>
        <ModalHeader toggle={toggle}>{modalTitle}</ModalHeader>
        <ModalBody>{modalContent}</ModalBody>
      </Modal>
    );
  }
}
