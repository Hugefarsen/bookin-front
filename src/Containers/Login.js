import React, { Component } from "react";
import { FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import "./Login.css";
import LoaderButton from "../Components/LoaderButton";
import $ from "jquery";
import config from "../config"

class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: false,
            email: "",
            password: "",
        };
    }

    validateForm() {
        return this.state.email.length > 0 && this.state.password.length > 0;
    }

    handleChange = event => {
        this.setState({
            [event.target.id]: event.target.value
        });
    };

    handleSubmit = async event => {
        event.preventDefault();
        this.setState({ isLoading: true });

        $.ajax({
                type: 'POST',
                url: config.apiUrl + '/login',
                dataType: 'json',
                data: {
                    'email': this.state.email,
                    'password': this.state.password
                },
                cache: false,
                success: (data) => {
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
                },
                error: (xhr, status, err) => {
                    console.log(err);
                    if(err === "Unauthorized"){
                        alert("Du har angivet fel email eller lösenord");
                    }
                    this.setState({isLoading: false});
                }
            });

    };

    render() {
        return (
            <div className="Login">
                <form onSubmit={this.handleSubmit}>
                    <FormGroup controlId="email" bsSize="large">
                        <ControlLabel>Email</ControlLabel>
                        <FormControl
                            autoFocus
                            type="email"
                            value={this.state.email}
                            onChange={this.handleChange}
                        />
                    </FormGroup>
                    <FormGroup controlId="password" bsSize="large">
                        <ControlLabel>Password</ControlLabel>
                        <FormControl
                            value={this.state.password}
                            onChange={this.handleChange}
                            type="password"
                        />
                    </FormGroup>
                    <LoaderButton
                        block
                        bsSize="large"
                        disabled={!this.validateForm()}
                        type="submit"
                        isLoading={this.state.isLoading}
                        text="Login"
                        loadingText="Logging in…"
                    />
                </form>
            </div>
        );
    }
}

export default Login;