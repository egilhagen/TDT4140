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

export default class CreatePostWindow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activePost: this.props.activePost,
    };
  }

  handleChange = (e) => {
    let { name, value } = e.target;

    const activePost = { ...this.state.activePost, [name]: value };

    this.setState({ activePost });
  };

  /* TODO: blir denne brukt i det heile tatt eller er det gammelt rusk? @Elisabeth */
  handleChangeDropdown = (e) => {
    let { name, value } = e.target;
    alert("handlechangedropdown");

    /* if (!value.equals("default")) { */

    if (!this.state.activePost.name.equals("default")) {
      alert("not default");
      const activePost = { ...this.state.activePost, [name]: value };

      this.setState({ activePost });
    } else {
      alert("else");
      const activePost = { ...this.state.activePost, [name]: "BR" };
      /* document.getElementById("").innerHTML = "hellow world"; */
    }
  };

  render() {
    const { onSave } = this.props;
    return (
      <div>
        <Form>
          <Label id="error"></Label>
          <FormGroup>
            <Label for="post-title">Title</Label>
            <Input
              type="text"
              id="post-title"
              name="title"
              value={this.state.activePost.title}
              onChange={this.handleChange}
              placeholder="Create a title for your post"
            />
          </FormGroup>
          <FormGroup>
            <Label for="post-price">Price</Label>
            <Input
              type="text"
              id="post-price"
              name="price"
              value={this.state.activePost.price}
              onChange={this.handleChange}
              placeholder="Enter price"
            />
          </FormGroup>
          <FormGroup>
            <Label for="post-date">Date</Label>
            <Input
              type="date"
              id="post-date"
              name="date"
              value={this.state.activePost.date}
              onChange={this.handleChange}
            />
          </FormGroup>
          <FormGroup>
            <select
              id="post-location"
              name="location"
              onChange={this.handleChange}
              onLoad={this.handleChange}
              /* {this.handleChangeDropdown} */
            >
              {/* Funke, men lager ein egen kategori, vil ha ein if på denne og default */}

              {/*  <option value={this.state.activePost.location}>
                {this.state.activePost.location}
              </option> */}

              {/* switch på location --> vist default vis samme liste som no, 
              hvis ikkje --> eit alternativ for kvar mulighet som viser dei sortert med den øverst */}
              <option value="default" hidden>
                Location
              </option>

              <option value="OS">Oslo</option>
              <option value="BR">Bergen</option>
              <option value="TR">Trondheim</option>
              <option value="BO">Bodø</option>
            </select>
          </FormGroup>
          <FormGroup>
            <select
              type="text"
              id="post-category"
              name="category"
              onChange={this.handleChange}
            >
              <option value="default" hidden>
                Category
              </option>
              <option value="Consert">Consert</option>
              <option value="Cinema">Cinema</option>
              <option value="Theater">Theater</option>
              <option value="Other">Other</option>
            </select>
          </FormGroup>
          <FormGroup>
            <select
              type="text"
              id="post-saleOrBuy"
              name="saleOrBuy"
              onChange={this.handleChange}
            >
              <option value="default" hidden>
                Sell or buy
              </option>
              <option value="Sale">Sell</option>
              <option value="Buy">Buy</option>
            </select>
          </FormGroup>
          <FormGroup>
            <Label for="post-description">Description</Label>
            <Input
              type="text"
              id="post-description"
              name="description"
              value={this.state.activePost.description}
              onChange={this.handleChange}
              placeholder="Description of your tickets(eg. number of tickets, seats...)"
            />
          </FormGroup>
        </Form>
        {/* CreateUserWindow har sin egen save knapp, vurder om det visuelt ser bedre ut med/uten ModalFooter... blir litt feit med ModalFooter fordi den blir mata inn i ModalHeader, istedenfor utenfor som den var originalt. */}
        <ModalFooter>
          <Button color="success" onClick={() => onSave(this.state.activePost)}>
            Save
          </Button>
        </ModalFooter>
        <a>{this.activePost}</a>
      </div>
    );
  }
}
