import React, { Component } from "react";
import Posts from "../posts/Posts";

import CreatePostWindow from "../CreatePostWindow";
// API requests
import axios from "axios";

// Redux
import { connect } from "react-redux";
import PropTypes from "prop-types";

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
    filteredPostList: [Posts],
    rawPostList: [Posts]
        }  
    }
    static propTypes = {
        auth: PropTypes.object.isRequired,
      };

    componentDidMount() {
        this.refreshList();
    }

    matchesCriteria(post) {
        return post.location == this.filterLocation &&
        post.categoty == this.filterCategory &&
        post.saleOrBuy == this.filterSellorBuy
    }


    updateFilteredPostList = () => {
    const { isAuthenticated } = this.props.auth;
    this.refreshList()
    //const { viewCompleted } = this.state;
    this.filteredPostList = this.rawPostList.filter((post) => this.matchesCriteria(post))
    }

    refreshList = () => {
        axios
        .get("/api/posts")
        .then((res) => this.setState({ rawPostList: res.data }))
        .catch((err) => console.log(err));
          };

    render() { 
          return (
            <div>
              <Posts filteredPostList={this.state.filteredPostList}/>
              <Form>
                <Label id="error"></Label>
                <FormGroup>
                  <Label for="Start date">SDate</Label>
                  <Input
                    type="date"
                    id="post-date"
                    name="date"
                    onChange={(value) => {this.filterStartDate=value}}
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="End date">EDate</Label>
                  <Input
                    type="date"
                    id="post-date"
                    name="date"
                    onChange={(value) => {this.filterEndDate=value}}
                  />
                </FormGroup>
                <FormGroup>
                  <select
                    id="post-location"
                    name="location"
                    onChange={(value) => {this.filterLocation=value}}
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
                    onChange={(value) => {this.filterCategory=value}}
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
                    onChange={(value) => {this.filterSellorBuy=value}}
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
          );
    }
}