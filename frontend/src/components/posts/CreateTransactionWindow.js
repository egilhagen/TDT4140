import React, { Component } from "react";
import axios from "axios";
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


export default class CreateTransactionWindow extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userList: [],
            activeTransaction: this.props.activeTransaction,
            activePost: this.props.activePost,
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
        const { userItems } = this.state.userList;
        const { onSave } = this.props;
        return (
            <div>
            <Form>
                <Label id="error"></Label>
                <FormGroup>
                <select
                id="post-buyer"
                name="buyer"
                onChange={this.handleChange}
                >
                <option value="default" hidden>
                    Buyer
                </option>
                {/* <option value=[USER]>[USER'S NAME]</option> Needs a list of all users */}
                </select>
            </FormGroup>
                <FormGroup>
                <Label for="post-ratingfromseller">Rating</Label>
                <Input
                    type="text"
                    id="post-ratingfromseller"
                    name="ratingFromSeller"
                    value={this.state.activeTransaction.ratingFromSeller}
                    onChange={this.handleChange}
                    placeholder="Enter your rating of the buyer (1-5)"
                />
                </FormGroup>
                {/* {alert(this.state.activePost)}
                    <select onChange={this.handleChange}>
                        {userItems.map(userItem => {
                        return (
                            <option value={userItem.id}> {userItem.username} </option>
                        )
                        })}
                    </select> */}
                
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