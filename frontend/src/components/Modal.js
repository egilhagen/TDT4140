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

/*
// props bruk i app.js
<Modal
            activeItem={this.state.activeItem}
            toggle={this.toggle}
            onSave={this.handleSubmit}
          />


*/

export default class CustomModal extends Component {
  //TEST: flyttet til CreateUserWindow, ligger begge plasser atm, det blir feil...
  /* 
 constructor(props) {
    super(props);
    this.state = {
      activeItem: this.props.activeItem, // burde denne staten kanskje og flyttes?
    };
  }
  */

  /*
  // Burde denne vere her? eller i CreateUserWindow
  handleChange = (e) => {
    let { name, value } = e.target;

    const activeItem = { ...this.state.activeItem, [name]: value };

    this.setState({ activeItem });
  };
*/
  render() {
    const { toggle, onSave, modalContent, modalTitle } = this.props; // Children props  this.props.toggle <LoginWindow></LoginWindow>

    // tulletest som ikkje funka, modalContent= [object object]: prøvde å gjere dette får å lukke popup/modal når bruker trykker login med korrekt info --> login vinduet returnerer null
    /* 
    if (modalContent == null) {
      alert(modalContent);
      return (
        <div>
          <h1>hello</h1>
          <Modal isOpen={false} />
        </div>
      );
    }
 */
    return (
      <Modal isOpen={true} toggle={toggle}>
        <ModalHeader toggle={toggle}>{modalTitle}</ModalHeader>
        <ModalBody>{modalContent}</ModalBody>
        {/* 
        // Denne blir laget i CreateUserWindow istedenfor her
        <ModalFooter>
          <Button
            color="success"
            onClick={() => onSave(this.state.activeItem)}
          >
            Save
          </Button>
        </ModalFooter>
        */}
      </Modal>
    );
  }
}
