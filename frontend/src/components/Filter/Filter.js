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
      activeFilter: {
        filterLocation: "",
        filterCategory: "",
        filterStartDate: "",
        filterEndDate: "",
        filterSellorBuy: "",
        filterSearch: "",
      },
      filteredPostList: [],
      rawPostList: [],
    };
  }

  componentDidMount() {
    this.refreshList();
  }

  /**Metoden som etterhvert har kriteriene for filtreringa */
  matchesCriteria(post) {
    //if()
    //alert(this.state.activeFilter.filterCategory);

    /* Med den gamle koden, vil du aldri få opp noen annoser, fordi det vil aldri matche */
    return (
      (post.date > this.state.activeFilter.filterStartDate ||
        this.state.activeFilter.filterStartDate == "") &&
      (post.date < this.state.activeFilter.filterEndDate ||
        this.state.activeFilter.filterEndDate == "") &&
      (post.location == this.state.activeFilter.filterLocation ||
        this.state.activeFilter.filterLocation == "") &&
      (post.category == this.state.activeFilter.filterCategory ||
        this.state.activeFilter.filterCategory == "") &&
      (post.saleOrBuy == this.state.activeFilter.filterSellorBuy ||
        this.state.activeFilter.filterSellorBuy == "") &&
      (post.description
        .toUpperCase()
        .includes(this.state.activeFilter.filterSearch.toUpperCase()) ||
        post.title
          .toUpperCase()
          .includes(this.state.activeFilter.filterSearch.toUpperCase()) ||
        this.state.activeFilter.filterSearch == "")
    );
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

  handleChange = (e) => {
    let { name, value } = e.target;
    const activeFilter = { ...this.state.activeFilter, [name]: value };

    this.setState({ activeFilter });
  };

  render() {
    return (
      <div>
        <Posts
          filteredPostList={this.state.filteredPostList}
          refreshList={this.refreshList}
        />
        <div class="box" id="one">
          <Form>
            <FormGroup>
              <Label for="search">Search</Label>
              <Input
                type="text"
                id="search-term"
                name="filterSearch"
                value={this.state.activeFilter.filterSearch}
                onChange={this.handleChange}
                placeholder="Enter a keyword"
              />
            </FormGroup>
            <Label id="error"></Label>
            <FormGroup>
              <Label for="Start date">From</Label>
              <Input
                type="date"
                id="start-date"
                name="filterStartDate"
                onChange={this.handleChange}
              />
            </FormGroup>
            <FormGroup>
              <Label for="End date">To</Label>
              <Input
                type="date"
                id="end-date"
                name="filterEndDate"
                onChange={this.handleChange}
              />
            </FormGroup>
            <FormGroup>
              <select
                id="location"
                name="filterLocation"
                onChange={this.handleChange}
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
                id="category"
                name="filterCategory"
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
                id="saleOrBuy"
                name="filterSellorBuy"
                onChange={this.handleChange}
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
            <Button
              color="success"
              onClick={() => {
                const activeFilter = {
                  ...this.state.activeFilter,
                  filterCategory: "",
                  filterLocation: "",
                  filterStartDate: "",
                  filterEndDate: "",
                  filterSellorBuy: "",
                  filterSearch: "",
                };
                this.setState({ activeFilter });
                document.getElementById("start-date").value = "default";
                document.getElementById("end-date").value = "default";
                document.getElementById("location").value = "default";
                document.getElementById("category").value = "default";
                document.getElementById("saleOrBuy").value = "default";
                this.refreshList();
              }}
            >
              Reset filters
            </Button>
          </ModalFooter>
        </div>
      </div>
    );
  }
}
