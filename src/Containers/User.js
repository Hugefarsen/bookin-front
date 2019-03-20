import React, {Component, Fragment} from "react";
import {Button, Table, Form, InputGroup, FormControl } from "react-bootstrap";
import config from "../config";

import $ from "jquery";
import {LinkContainer} from "react-router-bootstrap";
import LoaderButton from "../Components/LoaderButton";

export default class User extends Component {
    constructor(props) {
        super(props);

        this.state = {
            user: {},
            activities: [],
            ownsActivities: [],
            showPasswordChange: false,
            showEmailChange: false,
            password: "",
            new_password: "",
            c_password: "coolio",
        };
    }

    componentWillMount() {
        this.getUser();
        this.getActivities();
        console.log(this);
    }


    changePassword = async event => {
        event.preventDefault();
        let that = this;
        console.log(this.state);
        this.setState({ isLoading: true });

        $.ajax({
            type: 'PUT',
            url: config.apiUrl + '/user/' + this.props.user.id + '/password',
            dataType: 'json',
            headers: {
                'Authorization': 'Bearer ' + this.props.user.token,
            },
            data: {
                'id' : this.state.user.id,
                'email': this.state.user.email,
                'password': this.state.password,
                'new_password': this.state.new_password,
            },
            cache: false,
            success: function(data){
                alert(data.success)
                that.setState({isLoading: false})

            }.bind(this),
            error: function(xhr, status, err){
                console.log(err);
                that.setState({isLoading: false})
            }
        });
    };

    showPasswordChange = () => {
        if (this.state.showEmailChange){
            this.setState({showEmailChange: false})
        }
        this.setState({showPasswordChange: true})
    };

    showEmailChange = () => {
        if (this.state.showPasswordChange){
            this.setState({showPasswordChange: false})
        }
        this.setState({showEmailChange: true})
    };

    getUser = () => {
        const userId = this.props.user.id;
        const supervisor = this.props.isSupervisor;
        const admin = this.props.isAdmin;

        $.ajax({
            url: config.apiUrl + '/user/' + this.props.match.params.id,
            dataType: 'json',
            headers: {
                'Authorization': 'Bearer ' + this.props.user.token,
            },
            cache: false,
            success: (data) => {
                if(data.data.id === userId || admin || supervisor){
                    this.setState({user: data.data});
                } else {
                    alert('Du får enbart kolla på dina uppgifter.');
                    this.props.history.goBack();
                }
            },
            error: (xhr, status, err) => {
                if(err === 'Not Found'){
                    alert('Användaren med id ' + this.props.match.params.id + ' finns ej.');
                    this.props.history.goBack();
                }
                console.log(err);
            }
        })
    };

    getActivities(){
        if (this.props.isAuthenticated) {
            $.ajax({
                url: config.apiUrl + '/user/' + this.props.user.id,
                dataType: 'json',
                headers: {
                    'Authorization': 'Bearer ' + this.props.user.token,
                },
                cache: false,
                success: function(data){
                    this.setState({activities: data.data.goesToActivity, ownsActivities: data.data.ownsActivity}, function(){
                    });
                }.bind(this),
                error: function(xhr, status, err){
                    console.log(err);
                }
            })
        }
    }

    renderChangePasswordForm(){
        if (this.state.showPasswordChange) {
            return (
                <Form id="changePassword" onSubmit={this.changePassword}>
                    <InputGroup  className="col-3">
                        <InputGroup>
                            <InputGroup id="oldPass">Gammalt lösenord</InputGroup>
                        </InputGroup>
                        <FormControl
                            placeholder="Gammalt lösenord"
                            aria-label="Gammalt lösenord"
                            aria-describedby="oldPass"
                            type="password"

                            onChange={(e) => this.setState({ password: e.target.value })}
                        />
                        <InputGroup >
                            <InputGroup id="password">Nytt lösenord</InputGroup>
                        </InputGroup>
                        <FormControl
                            placeholder="Nytt lösenord"
                            aria-label="Nytt lösenord"
                            aria-describedby="password"
                            type="password"

                            onChange={(e) => this.setState({ new_password: e.target.value })}
                        />
                        <InputGroup>
                            <InputGroup id="c_password">Bekräfta nytt lösenord</InputGroup>
                        </InputGroup>
                        <FormControl
                            placeholder="Bekräfta nytt lösenord"
                            aria-label="Bekräfta nytt lösenord"
                            aria-describedby="c_password"
                            type="password"

                            onChange={(e) => this.setState({ c_password: e.target.value })}
                        />

                    </InputGroup>
                    <InputGroup>
                        <LoaderButton block
                                      bsStyle="primary"
                                      bsSize="large"
                                      type="submit"
                                      isLoading={this.state.isLoading}
                                      text="Byt lösen"
                                      loadingText="byter…"
                        />
                    </InputGroup>
                </Form>
            )
        }
    }

    renderChangeMailForm(){
        if (this.state.showEmailChange) {
            return(
                <Form id="changeEmail">
                    <InputGroup className="col-3">
                        <InputGroup>
                            <InputGroup id="email_old">Nuvarande email</InputGroup>
                        </InputGroup>
                        <FormControl
                            placeholder="Nuvarande email"
                            aria-label="Nuvarande email"
                            aria-describedby="email_old"
                        />
                        <InputGroup id="email_new">Ny email</InputGroup>
                        <InputGroup>
                            <FormControl
                                placeholder="Ny email"
                                aria-label="Ny email"
                                aria-describedby="email_new"
                            />
                            <InputGroup id="email_new_c">Bekräfta ny email</InputGroup>
                        </InputGroup>
                        <FormControl

                            placeholder="Bekräfta ny email"
                            aria-label="Bekräfta ny email"
                            aria-describedby="email_new_c"
                        />
                    </InputGroup>
                    <InputGroup>
                        <button className="btn-warning">Spara ny email</button>
                    </InputGroup>
                </Form>
            )
        }
    }

    renderUserInformation(){
        return (
            <Fragment>
                <section className="jumbotron text-center">
                    <div className="container">
                        <h1 className="jumbotron-heading">{this.state.user.name}</h1>
                        <p className="lead text-muted">#{this.state.user.id}</p>
                        <p>{this.state.user.email}</p>
                        <Button bsStyle="success" onClick={this.showPasswordChange}>Byt lösenord</Button>
                        <Button bsStyle="warning" onClick={this.showEmailChange}>Byt email</Button>

                        { this.renderChangePasswordForm() }
                        { this.renderChangeMailForm() }
                    </div>
                </section>
            </Fragment>
        )
    }

    renderActivityOwner(owner){
        return owner.map((row) => {
            return (" " + row.name)
        })
    }

    renderActivitiesList(activities) {
        return activities.map((row) => {
            return <LinkContainer
                key={row.id}
                to={`/activity/${row.id}`}
            >
                <tr>
                    <td>{this.renderActivityOwner(row.owner)}</td>
                    <td>{row.start}</td>
                    <td>{row.end}</td>
                    <td>{row.room.name}</td>
                    <td>{row.users.length + "/" + row.room.size}</td>

                </tr>
            </LinkContainer>
        })
    }

    renderInstructorActivitiesList = (activities)  => {

            return activities.map((row) => {
                return <LinkContainer key={row.id} to={`/activity/${row.id}`}>
                    <tr>
                        <td>{row.start}</td>
                        <td>{row.end}</td>
                        <td>{row.room.name}</td>
                        <td>{row.users.length + "/" + row.room.size}</td>
                    </tr>
                </LinkContainer>
            })


    }


    renderActivities() {
        return (
            <div className="activities">
                <h3>Dina inbokade aktiviteter</h3>
                <Table striped bordered hover>
                    <thead>
                    <tr>
                        <th>Instruktör</th>
                        <th>Starttid</th>
                        <th>Sluttid</th>
                        <th>Rum</th>
                        <th>Antal bokade</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.renderActivitiesList(this.state.activities)}
                    </tbody>
                </Table>
            </div>
        );
    }

    renderInstructorActivities() {
        if(this.props.isAdmin === true || this.props.isSupervisor === true){
            return (
                <div className="activities">
                    <h3>Dina klasser</h3>
                    <Table striped bordered hover>
                        <thead>
                        <tr>
                            <th>Starttid</th>
                            <th>Sluttid</th>
                            <th>Rum</th>
                            <th>Antal bokade</th>
                        </tr>
                        </thead>
                        <tbody>
                        {this.renderInstructorActivitiesList(this.state.ownsActivities)}
                        </tbody>
                    </Table>
                </div>
            );
        }
    }

    render() {
        return (
            <div className="user">
                {this.renderUserInformation()}
                {this.renderActivities()}
                {this.renderInstructorActivities()}

            </div>
        )
    }
}