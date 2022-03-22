import React, { Component } from "react";
import Post from "../posts/Posts";

import CreatePostWindow from "../CreatePostWindow";
// API requests
import axios from "axios";

// Redux
import { connect } from "react-redux";
import PropTypes from "prop-types";

export class Filter extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
    filterLocation: "",
    filterCategory: "",
    filterStartDate: "",
    filterEndDate: "",
    filteredPostList: [Post],
    rawPostList: [Post]
        }  
    }
    static propTypes = {
        auth: PropTypes.object.isRequired,
      };

    componentDidMount() {
        this.refreshList();
    }

    matchesCriteria = (post) => (
        {}
    );

    updateFilteredPostList = () => {
    const { isAuthenticated } = this.props.auth;
    //const { viewCompleted } = this.state;
    const newPosts = this.state.rawPostList;
    this.filteredPostList = newPosts.filter((post) => {
        return (
             post.state == this.filterCategory 
             
        );
    })
    }

    refreshList = () => {
        axios
        .get("/api/posts")
        .then((res) => this.setState({ postList: res.data }))
        .catch((err) => console.log(err));
          };
        
          handleChange = (e) => {
            let { name, value } = e.target;
        
            const activePost = { ...this.state.activePost, [name]: value };
        
            this.setState({ activePost });
          }; 

    render() { 
          return (
            <div>
              <Form>
                <Label id="error"></Label>
                <FormGroup>
                  <Label for="Start date">SDate</Label>
                  <Input
                    type="date"
                    id="post-date"
                    name="date"
                    value={this.state.activePost.date}
                    onChange={this.handleChange}
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="End date">EDate</Label>
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
              </Form>
              {/* CreateUserWindow har sin egen save knapp, vurder om det visuelt ser bedre ut med/uten ModalFooter... blir litt feit med ModalFooter fordi den blir mata inn i ModalHeader, istedenfor utenfor som den var originalt. */}
            <ModalFooter>
                <Button
                color="success"
                onClick={() => onSave(this.state.activePost)}
                 // TODO: bruker bør bli logget inn etter Save.
                >
                Apply
                </Button>
            </ModalFooter>
            <a>{this.activePost}</a>
        </div>
          );
    }
}