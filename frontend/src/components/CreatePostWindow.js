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

    if (!value.equals("default")) {
      const activePost = { ...this.state.activePost, [name]: value };

      this.setState({ activePost });
    } else {
      document.getElementById("").innerHTML = "hellow world";
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
            >
              {/* Switch på location for å vise default dersom ny post og activePost.location dersom en eksisterende post redigeres. 
              Deretter en nested switch for å gjøre forkortelsene OS,BR,TR,BO lesbare for bruker. 
              -Hidden gjør at <option> ikke vises i dropdown´en 
              -Dersom activePost.location er tom, aka == "" (som når du lager en ny post), vises default "Location")*/}
              {{
                "": (
                  <option value="default" hidden>
                    Location
                  </option>
                ),
              }[this.state.activePost.location] || (
                <option value={this.state.activePost.location} hidden>
                  {{ OS: "Oslo", BR: "Bergen", TR: "Trondheim", BO: "Bodø" }[
                    this.state.activePost.location
                  ] || "Invalid location"}
                </option>
              )}

              {/* TODO: OS og Oslo burde være det samme, ikkje hardkode "OSLO", då slepp ein nested switch over. */}
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
              {/* Switch for create og edit post, dersom vi har en activePost(aka edit): vis activePost sin data */}
              {{
                "": (
                  <option value="default" hidden>
                    Category
                  </option>
                ),
              }[this.state.activePost.category] || (
                <option value={this.state.activePost.category} hidden>
                  {this.state.activePost.category}
                </option>
              )}
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
              {/* Switch for create og edit post, dersom vi har en activePost(aka edit): vis activePost sin data */}
              {{
                "": (
                  <option value="default" hidden>
                    Sell or buy
                  </option>
                ),
              }[this.state.activePost.saleOrBuy] || (
                <option value={this.state.activePost.saleOrBuy} hidden>
                  {{ Sale: "Sell", Buy: "Buy" }[
                    this.state.activePost.saleOrBuy
                  ] || "Invalid type buy/sell"}
                </option>
              )}

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
        {/* TODO: ka gjer denne? */}
        <a>{this.activePost}</a>
      </div>
    );
  }
}
