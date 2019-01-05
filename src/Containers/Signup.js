import React, { Component } from "react";
import { HelpBlock, Form, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import LoaderButton from "../Components/LoaderButton";
import "./Signup.css";
import $ from "jquery";

export default class Signup extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            isLoading: false,
            email: "",
            password: "",
            confirmPassword: "",
            user: ""
        };
    }

    validateForm() {
        return (
            this.state.email.length > 0 &&
            this.state.password.length > 0 &&
            this.state.password === this.state.confirmPassword
        );
    }

    handleChange = event => {
        this.setState({
            [event.target.id]: event.target.value
        });
    }

    getLoggedUser(){
        if(localStorage.getItem('user')){
            let user = JSON.parse(localStorage.getItem('user'))
            if (user.token){
                this.setState({user : user})
            }
        }
        this.setState({ isAuthenticating: false });
    }

    handleSubmit = async event => {
        event.preventDefault();
        var that = this;
        this.setState({ isLoading: true });

        $.ajax({
            type: 'POST',
            url: 'http://localhost:8888/bookin-api/public/api/register',
            dataType: 'json',
            data: {
                'name': this.state.name,
                'email': this.state.email,
                'password': this.state.password,
                'c_password': this.state.confirmPassword
            },
            cache: false,
            success: function(data){
                this.props.userHasAuthenticated(true);
                console.log(data);
                this.setState({userToken : data.success.token}, function(){
                    this.setState({password: "", email: "", c_password: ""});
                    localStorage.setItem('user', JSON.stringify(data.success));
                    this.setState({ isLoading: false });
                    this.getLoggedUser();
                    })
                this.props.history.push("/")


            }.bind(this),
            error: function(xhr, status, err){
                console.log(err);
                that.setState({ isLoading: false });
            }
        });
    }

    render() {
        return (
            <div className="Signup">
                <Form onSubmit={this.handleSubmit}>
                    <FormGroup controlId="name" bsSize="large">
                        <ControlLabel>Name</ControlLabel>
                        <FormControl autoFocus
                                     type="text"
                                     value={this.state.name}
                                     onChange={this.handleChange}
                        />
                    </FormGroup>
                    <FormGroup controlId="email" bsSize="large">
                        <ControlLabel>Email</ControlLabel>
                        <FormControl autoFocus
                                     type="email"
                                     value={this.state.email}
                                     onChange={this.handleChange}
                        />
                    </FormGroup>
                    <FormGroup controlId="password" bsSize="large">
                        <ControlLabel>Password</ControlLabel>
                        <FormControl value={this.state.password}
                                     onChange={this.handleChange}
                                     type="password"
                        />
                    </FormGroup>
                    <FormGroup controlId="confirmPassword" bsSize="large">
                        <ControlLabel>Confirm Password</ControlLabel>
                        <FormControl value={this.state.confirmPassword}
                                     onChange={this.handleChange}
                                     type="password"
                        />
                    </FormGroup>
                    <LoaderButton block
                                  bsSize="large"
                                  disabled={!this.validateForm()}
                                  type="submit"
                                  isLoading={this.state.isLoading}
                                  text="Signup"
                                  loadingText="Signing up…"
                    />
                </Form>
            </div>
        );
    }
}