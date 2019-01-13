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
                var i;
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

            </div>
        );
    }
}

export default withRouter(App);