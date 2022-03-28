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
        sortByString: "",
        filterSold: false,
      },
      filteredPostList: [],
      rawPostList: [],
    };
  }

  componentDidMount() {
    this.refreshList();
  }

  sortBy(a, b) {
    switch (this.state.activeFilter.sortByString) {
      case "PriceLowToHigh":
        return a.price - b.price;
      case "PriceHighToLow":
        return b.price - a.price;
      case "DateEarlyToLate":
        return new Date(a.date) - new Date(b.date);
      case "DateLateToEarly":
        return new Date(b.date) - new Date(a.date);
      default:
        return a, b;
    }
  }

  compareBoolean(a, b) {
    if (a == "true" && b == true) return true;
    else return false;
  }

  /**Metoden som etterhvert har kriteriene for filtreringa */
  matchesCriteria(post) {
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
        this.state.activeFilter.filterSearch == "") &&
      (this.compareBoolean(this.state.activeFilter.filterSold, post.hidden) ||
        post.hidden == false)
    );
  }

  /** Setter filteredPostList staten til en liste med den ønskede filteringen */
  updateFilteredPostList = () => {
    this.setState({
      filteredPostList: this.state.rawPostList
        .sort((a, b) => {
          return this.sortBy(a, b);
        })
        .filter((post) => this.matchesCriteria(post)),
    });
  };

  /*Samme refreshlist som mange steder, men fordi det tar litt tid for setState å funke, 
  måtte updateFilteredPostList legges inn her, i then, for at annonsene skulle vises når 
  man åpna siden */
  refreshList = () => {
    /*   alert("Refreshlist!"); */

    axios
      .get("/api/posts/")
      .then((res) =>
        this.setState({ rawPostList: res.data }, this.updateFilteredPostList())
      )
      .catch((err) => console.log(err));
  };

  /**Post legges inn her, og får med lista med ferdig filtrerte objekter, og metoden for å refreshe lista
   * slik at den kan brukes når man oppretter nye annonser
   */

  handleChange = (e) => {
    let { name, value } = e.target;
    const activeFilter = { ...this.state.activeFilter, [name]: value };

    this.setState({ activeFilter });
  };

  render() {
    const [checked] = "false";
    return (
      <div className="container">
        {/* Gammel logo */}
        {/*  <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <img
            src={process.env.PUBLIC_URL + "/Icons/Asset-1.svg"}
            style={{ height: 150 }}
            alt="TickingLogo"
          />
        </div> */}
        <div className="row row-cols-md-2">
          <div className="col-md-2">
            <Form>
              <br />
              <br />
              <br />
              <br />

              <h2>Filtration</h2>
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
              <FormGroup>
                <select
                  id="sort-by"
                  name="sortByString"
                  onChange={this.handleChange}
                >
                  <option value="default" hidden>
                    Sort by:
                  </option>
                  <option value="PriceLowToHigh">Prices: low to high</option>
                  <option value="PriceHighToLow">Prices: high to low</option>
                  <option value="DateEarlyToLate">
                    Date: earliest to latest
                  </option>
                  <option value="DateLateToEarly">
                    Date: latest to earliest
                  </option>
                </select>
              </FormGroup>
              <FormGroup>
                <Label for="hidden">
                  {/** Jeg skjønner ikke helt hvorfor det funker å sette value til this.state.checked,
                   * når det ikke finnes en this.state.checked, men det er det eneste som får det til å funke
                   */}
                  <Input
                    type="checkbox"
                    id="showSold"
                    name="filterSold"
                    value={!this.state.checked}
                    onChange={this.handleChange}
                  />
                  Show inactive posts
                </Label>
              </FormGroup>
            </Form>
            {/* CreateUserWindow har sin egen save knapp, vurder om det visuelt ser bedre ut med/uten ModalFooter... blir litt feit med ModalFooter fordi den blir mata inn i ModalHeader, istedenfor utenfor som den var originalt. */}
            <ModalFooter>
              <div className="d-grid gap-2">
                <Button
                  color="success"
                  onClick={() => this.updateFilteredPostList()}
                  // TODO: bruker bør bli logget inn etter Save.
                  size="sm"
                  block
                >
                  Apply
                </Button>
                {"  "}
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
                      sortByString: "",
                      filterSold: false,
                    };
                    this.setState({ activeFilter });
                    document.getElementById("start-date").value = "default";
                    document.getElementById("end-date").value = "default";
                    document.getElementById("location").value = "default";
                    document.getElementById("category").value = "default";
                    document.getElementById("saleOrBuy").value = "default";
                    document.getElementById("sort-by").value = "default";
                    document.getElementById("showSold").checked = !checked;

                    /** Må kjøres to ganger for å gå tilbake til ikkesortert tilstand */
                    this.refreshList();
                    this.refreshList();
                  }}
                  size="sm"
                  block
                >
                  Reset filters
                </Button>
              </div>
            </ModalFooter>
          </div>
          <div className="col-md-10">
            <Posts
              filteredPostList={this.state.filteredPostList}
              refreshList={this.refreshList}
            />
          </div>
        </div>
      </div>
    );
  }
}
