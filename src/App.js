import React, { Component, Fragment } from "react";
import { Link, withRouter } from "react-router-dom";
import { Nav, Navbar, NavItem } from "react-bootstrap";
import Routes from "./Routes";
import { LinkContainer } from "react-router-bootstrap";

import './App.css';
import './DateTime.css';

class App extends Component {
    constructor(props){
        super(props);

        this.state = {
            isAuthenticated: false,
            isAuthenticating: true,
            isAdmin: false,
            activities: [],
            user: {},
        }

        this.renderLinks = this.renderLinks
    }

    userHasAuthenticated = authenticated => {
        this.setState({ isAuthenticated: authenticated });
    };

    userIsAdmin = admin => {
        this.setState({ isAdmin: admin });
    };

    handleLogout = event => {
        this.userHasAuthenticated(false);
        this.setState({user: {}});
        this.setState({isAdmin: false});
        localStorage.setItem('user', "");
        this.props.history.push("/login");
    };

    userInfo = user => {
        this.setState({user: user })
    };

    getLoggedUser(){
        if(localStorage.getItem('user')){
            let user = JSON.parse(localStorage.getItem('user'))
            if (user){
                this.setState({user : user})
                let i;
                for (i = 0; i < user.role.length; i++) {
                    if(user.role[i].role === 'Admin'){
                        this.userIsAdmin(true);
                    }
                }

                this.userHasAuthenticated(true);
            }
        }
        this.setState({ isAuthenticating: false });
    }

    componentWillMount(){
        this.getLoggedUser();
    }

    componentDidMount(){
        this.getLoggedUser();
    }

    renderLinks(){
        return (
            this.state.isAdmin ?
                <Fragment>
                    <LinkContainer to="/admin">
                        <NavItem>Admin settings</NavItem>
                    </LinkContainer>
                    <LinkContainer to="/categories">
                        <NavItem>Categories</NavItem>
                    </LinkContainer>

                    <LinkContainer to="/home">
                        <NavItem>Your bookings</NavItem>
                    </LinkContainer>
                        <NavItem onClick={this.handleLogout}>Logout</NavItem>
                    </Fragment>
                    :
                <Fragment>
                    <LinkContainer to="/categories">
                        <NavItem>Categories</NavItem>
                    </LinkContainer>
                    <LinkContainer to="/">
                        <NavItem>Your bookings</NavItem>
                    </LinkContainer>
                    <NavItem onClick={this.handleLogout}>Logout</NavItem>
                </Fragment>
        )
    }

    render() {
        const childProps = {
            isAuthenticated: this.state.isAuthenticated,
            isAdmin: this.state.isAdmin,
            userHasAuthenticated: this.userHasAuthenticated,
            userIsAdmin: this.userIsAdmin,
            userLog: this.userInfo,
            user: this.state.user
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
                                ?  this.renderLinks()
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
            </div>
        );
    }
}

export default withRouter(App);