import React, { Component, Fragment } from "react";
import $ from 'jquery';
import { Link, withRouter } from "react-router-dom";
import { Nav, Navbar, NavItem } from "react-bootstrap";
import Routes from "./Routes";
import { LinkContainer } from "react-router-bootstrap";

import Activities from "./Components/Activities";

import './App.css';
import './DateTime.css';

class App extends Component {
    constructor(){
        super();
        this.state = {
            isAuthenticated: false,
            isAuthenticating: true,
            activities: [],
            user: {},
        }
    }

    userHasAuthenticated = authenticated => {
        this.setState({ isAuthenticated: authenticated });
    }

    handleLogout = event => {
        this.userHasAuthenticated(false);
        this.setState({user: {}})
        localStorage.setItem('user', "");
        this.props.history.push("/login");

    };

    getActivities(){
        $.ajax({
            url: 'http://localhost:8888/bookin-api/public/api/activity',
            dataType: 'json',
            data: {'Authorization' : 'Bearer'+this.state.user.token},
            cache: false,
            success: function(data){
                this.setState({activities: data.data}, function(){
                  //  console.log(this.state);
                  //  console.log(this.state.activities);
                })
            }.bind(this),
            error: function(xhr, status, err){
                //console.log(err);
            }
        })
    }

    getLoggedUser(){
        if(localStorage.getItem('user')){
            let user = JSON.parse(localStorage.getItem('user'))
            if (user.token){
                this.setState({user : user})
                this.userHasAuthenticated(true);
            }
        }
        this.setState({ isAuthenticating: false });
    }

    componentWillMount(){
        this.getLoggedUser();
        //this.getActivities();
    }

    componentDidMount(){
        this.getLoggedUser();
       // this.getActivities();

    }

    render() {
        const childProps = {
            isAuthenticated: this.state.isAuthenticated,
            userHasAuthenticated: this.userHasAuthenticated,
            user: this.state.user,
        };

        return (
            <div className="App container">
                <Navbar fluid collapseOnSelect>
                    <Navbar.Header>
                        <Navbar.Brand>
                            <Link to="/">Bookin</Link>
                        </Navbar.Brand>
                        <Navbar.Toggle />
                    </Navbar.Header>
                    <Navbar.Collapse>
                        <Nav pullRight>
                            {this.state.isAuthenticated
                                ? <NavItem onClick={this.handleLogout}>Logout</NavItem>
                                : <Fragment>
                                    <LinkContainer to="/signup">
                                        <NavItem>Signup</NavItem>
                                    </LinkContainer>
                                    <LinkContainer to="/login">
                                        <NavItem>Login</NavItem>
                                    </LinkContainer>
                                </Fragment>
                            }
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
                <Routes childProps={childProps} />

                <div className="Main">
                    <Activities activities={this.state.activities} />
                    <hr />
                </div>
            </div>
        );
    }
}

export default withRouter(App);
;
