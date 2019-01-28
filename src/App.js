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
            isSupervisor: false,
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

    userIsSupervisor = supervisor => {
        this.setState({ isSupervisor: supervisor });
    };

    handleLogout = event => {
        this.userHasAuthenticated(false);
        this.setState({user: {}, isAdmin: false, isSupervisor: false});
        localStorage.setItem('user', "");
        this.props.history.push("/");
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
                    if(user.role[i].role === 'Supervisor'){
                        this.userIsSupervisor(true);
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

    renderAdminLinks(){
        if(this.state.isAdmin || this.state.isSupervisor){
            return (
                <Fragment>
                    <LinkContainer to="/admin">
                        <NavItem>Admin</NavItem>
                    </LinkContainer>
                </Fragment>
            )
        }
    }


    renderUserLinks(){
        if(this.state.isAuthenticated){
            return (
                <Fragment>
                    <LinkContainer to="/categories">
                        <NavItem>Kategorier</NavItem>
                    </LinkContainer>
                    <LinkContainer to="/home">
                        <NavItem>Dina aktiviteter</NavItem>
                    </LinkContainer>
                    <NavItem onClick={this.handleLogout}>Logga ut</NavItem>
                </Fragment>
            )
        } else {
            return <Fragment>
                <LinkContainer to="/signup">
                    <NavItem>Registrera dig</NavItem>
                </LinkContainer>
                <LinkContainer to="/login">
                    <NavItem>Logga in</NavItem>
                </LinkContainer>
            </Fragment>
        }
    }

    render() {
        const childProps = {
            isAuthenticated: this.state.isAuthenticated,
            isAdmin: this.state.isAdmin,
            userHasAuthenticated: this.userHasAuthenticated,
            userIsAdmin: this.userIsAdmin,
            userIsSupervisor: this.userIsSupervisor,
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
                            {this.renderAdminLinks()}
                            {this.renderUserLinks()}
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
                <Routes childProps={childProps} />
            </div>
        );
    }
}

export default withRouter(App);