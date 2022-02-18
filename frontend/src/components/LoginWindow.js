import React, { Component } from "react";
import CreateUserWindow from "./CreateUserWindow"
export default class Login extends Component {

    /*
    swapView  = () => {
        document.getElementById("test").innerHTML = "hellow world"; 
        // prevent page from redirecting 
        preventDefault();  
        
        //this.setState({ activeItem });
      };
*/

/*
// Old test for changing div content with .innerHTML, can be deleted.
    DisplayUserCreationForm = event => {
        //TODO: dette kjem ikkje til å funke sånn me vil, løsning: https://stackoverflow.com/questions/33840150/onclick-doesnt-render-new-react-component
        document.getElementById("outer-container-div").innerHTML = "Create user form here";  //<CreateUserWindow/>
        // forhindrer standard html oppførsel med redirect etter form submit
        event.preventDefault();
    }
*/


    render() {
        // pakker ut child prop som kjem fra app.js
        const { toggleCreateUserWindow } = this.props;  

        return (
            <form>
                <h3>Sign In</h3>
                <div className="form-group" >
                    <label>Email address</label>
                    <input type="email" className="form-control" placeholder="Enter email" />
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <input type="password" className="form-control" placeholder="Enter password" />
                </div>
                <div className="form-group">
                    <div className="custom-control custom-checkbox">
                        <input type="checkbox" className="custom-control-input" id="customCheck1" />
                        <label className="custom-control-label" htmlFor="customCheck1">Remember me</label>
                    </div>
                </div>
                <button type="submit" className="btn btn-primary btn-block">Login</button>
                <p className="forgot-password text-right">
                    Forgot <a href="#">password?</a>
                </p>

                <p className="forgot-password text-left">
                    Dont have an account?
                </p>
                
                {/* TODO: onClick={() =>toggleCreateUserWindow()} Fungerer, men onClick={toggleCreateUserWindow()}  fungerer ikkje, finn ut av forskjellen!*/}
                <button  onClick={() =>toggleCreateUserWindow()} className="btn btn-primary btn-block">Create new user</button> 
                 
            </form>
        );
    }
}