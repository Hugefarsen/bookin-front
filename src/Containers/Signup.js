import React, { Component } from "react";
import { Form, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import LoaderButton from "../Components/LoaderButton";
import "./Signup.css";
import $ from "jquery";
import config from "../config"

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


    handleSubmit = async event => {
        event.preventDefault();
        this.setState({ isLoading: true });

        $.ajax({
            type: 'POST',
            url: config.apiUrl + '/register',
            dataType: 'json',
            data: {
                'name': this.state.name,
                'email': this.state.email,
                'password': this.state.password,
                'c_password': this.state.confirmPassword,
                'roles': {'3' : 'User'},
            },
            cache: false,
            success: function(data){
                let user = data.success;
                user['token'] = data.token;
                this.props.userLog(user);
                this.setState( { password: "", isLoading: false}, function(){
                    localStorage.setItem('user', JSON.stringify(user));
                });
                var i;
                for (i = 0; i < user.role.length; i++) {
                    if(user.role[i].role === 'Admin'){
                        this.props.userIsAdmin(true);

                    }
                }
                this.props.userHasAuthenticated(true);
                this.props.history.push("/");

            }.bind(this),
            error: (xhr, status, err) => {
                console.log(err);
                this.setState({ isLoading: false });
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