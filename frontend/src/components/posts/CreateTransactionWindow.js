import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
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


export class CreateTransactionWindow extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userList: [],
            activeTransaction: this.props.activeTransaction,
            post: this.props.activePost
        };
    }


    handleChange = (e) => {
        let { name, value } = e.target;

        const activeTransaction = { ...this.state.activeTransaction, [name]: value };

        this.setState({ activeTransaction });
    };

    refreshList = () => {
        axios
        .get("/api/users")
        .then((res) => this.setState({ userList: res.data }))
        .catch((err) => console.log(err));
    };

    componentDidMount() {
        this.refreshList();
    }

    handleChange(e) {
        console.log(e.target.value)
    }
    
    render() {
        // this.refreshList();
        const userItems = this.state.userList;
        //const {post} = this.props;
        const { onSave } = this.props;
        const { user } = this.props.auth;
        return (
            <div>
            {this.state.activePost}
            <Form>
                <Label id="error"></Label>
                <FormGroup>
                    {/* TODO: remove self from list of users */}
                    <select id="user" name="user" onChange={this.handleChange}>
                    <option value="default" hidden>Buyer</option>
                        {userItems.filter(userItem => userItem.id != this.props.auth.user.id).map(filteredUserItem => {
                            return (
                                <option value={filteredUserItem.id}> {filteredUserItem.username} </option>
                            )
                            })}
                    </select>
                </FormGroup>
                <FormGroup>
                <Label for="post-ratingfromseller">Rating </Label> {/* TODO: More elegant way to get a space between label and input*/}
                <input
                    type="number"
                    id="post-ratingfromseller"
                    name="ratingFromSeller"
                    min="1"
                    max="5"
                    step="1"
                    value={this.state.activeTransaction.ratingFromSeller}
                    placeholder="Enter rating (1-5)"
                    onChange={this.handleChange}
                />
{/*                 <Input
                    type="text"
                    id="post-ratingfromseller"
                    name="ratingFromSeller"
                    value={this.state.activeTransaction.ratingFromSeller}
                    onChange={this.handleChange}
                    placeholder="Enter your rating of the buyer (1-5)"
                /> */}
                </FormGroup>
                {/* {alert(this.state.activePost)} */}
                
            </Form>
            {/* CreateUserWindow har sin egen save knapp, vurder om det visuelt ser bedre ut med/uten ModalFooter... blir litt feit med ModalFooter fordi den blir mata inn i ModalHeader, istedenfor utenfor som den var originalt. */}
            <ModalFooter>
                <Button color="success" onClick={() => onSave(this.state.activeTransaction)}>
                Finish sale
                </Button>
            </ModalFooter>
            <a>{this.activeTranscation}</a>
            </div>
        );
        }


}

const mapStateToProps = (state) => ({
    auth: state.auth,
  });
  
  export default connect(mapStateToProps)(CreateTransactionWindow);

