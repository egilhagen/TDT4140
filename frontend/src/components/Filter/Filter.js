import React, { Component } from "react";
import Posts from "../posts/Posts";
import "./Filter.css";

import CreatePostWindow from "../CreatePostWindow";
// API requests
import axios from "axios";

// Redux
//import { connect } from "react-redux";
//import PropTypes from "prop-types";

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

export default class Filter extends Component {
  constructor(props) {
    super(props);

    this.state = {
      filterLocation: "",
      filterCategory: "",
      filterStartDate: "",
      filterEndDate: "",
      filterSellorBuy: "",
      filteredPostList: [],
      rawPostList: [],
    };
  }

  componentDidMount() {
    this.refreshList();
  }

  /**Metoden som etterhvert har kriteriene for filtreringa */
  matchesCriteria(post) {
    /* Med den gamle koden, vil du aldri få opp noen annoser, fordi det vil aldri matche */

    return true;
  }

  /** Setter filteredPostList staten til en liste med den ønskede filteringen */
  updateFilteredPostList = () => {
    this.setState({
      filteredPostList: this.state.rawPostList.filter((post) =>
        this.matchesCriteria(post)
      ),
    });
  };

  /*Samme refreshlist som mange steder, men fordi det tar litt tid for setState å funke, 
  måtte updateFilteredPostList legges inn her, i then, for at annonsene skulle vises når 
  man åpna siden */
  refreshList = () => {
    axios
      .get("/api/posts/")
      .then((res) =>
        this.setState({ rawPostList: res.data }, this.updateFilteredPostList())
      )
      .catch((err) => console.log(err));
  };

  /**Post legges inn her, og får med lista med ferdig filtrerte objecter, og metoden for å refreshe lista
   * slik at den kan brukes når man oppretter nye annonser
   */

  render() {
    return (
      <div>
        <Posts
          filteredPostList={this.state.filteredPostList}
          refreshList={this.refreshList}
        />
        <div class="box" id="one">
          <Form>
            <Label id="error"></Label>
            <FormGroup>
              <Label for="Start date">SDate</Label>
              <Input
                type="date"
                id="post-date"
                name="date"
                onChange={(value) => {
                  this.filterStartDate = value;
                }}
              />
            </FormGroup>
            <FormGroup>
              <Label for="End date">EDate</Label>
              <Input
                type="date"
                id="post-date"
                name="date"
                onChange={(value) => {
                  this.filterEndDate = value;
                }}
              />
            </FormGroup>
            <FormGroup>
              <select
                id="post-location"
                name="location"
                onChange={(value) => {
                  this.filterLocation = value;
                }}
              >
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
                onChange={(value) => {
                  this.filterCategory = value;
                }}
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
                onChange={(value) => {
                  this.filterSellorBuy = value;
                }}
              >
                <option value="default" hidden>
                  Sell or buy
                </option>
                <option value="Sale">Sell</option>
                <option value="Buy">Buy</option>
              </select>
            </FormGroup>
          </Form>
          {/* CreateUserWindow har sin egen save knapp, vurder om det visuelt ser bedre ut med/uten ModalFooter... blir litt feit med ModalFooter fordi den blir mata inn i ModalHeader, istedenfor utenfor som den var originalt. */}
          <ModalFooter>
            <Button
              color="success"
              onClick={() => this.updateFilteredPostList()}
              // TODO: bruker bør bli logget inn etter Save.
            >
              Apply
            </Button>
          </ModalFooter>
        </div>
      </div>
    );
  }
}
