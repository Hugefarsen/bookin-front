import React, {Component, Fragment} from "react";
import {Button, Table} from "react-bootstrap";
import config from "../config";

import $ from "jquery";
import {LinkContainer} from "react-router-bootstrap";

export default class User extends Component {
    constructor(props) {
        super(props);

        this.state = {
            user: {},
            activities: []
        };
    }

    componentWillMount() {
        this.getUser();
        this.getActivities();
        console.log(this);
    }

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
                    console.log(this);
                    alert('Användaren med id ' + this.props.match.params.id + ' finns ej.');
                    this.props.history.goBack();
                }
                console.log(err);
            }
        })
    }

    renderUserInformation(){
        return (
            <Fragment>
                <section className="jumbotron text-center">
                    <div className="container">
                        <h1 className="jumbotron-heading">{this.state.user.name}</h1>
                        <p className="lead text-muted">#{this.state.user.id}</p>
                        <p>{this.state.user.email}</p>
                        <Button bsStyle="success">Byt lösenord</Button>
                        <Button bsStyle="warning">Byt email</Button>
                    </div>
                </section>
            </Fragment>
        )
    }


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
                    this.setState({activities: data.data.goesToActivity}, function(){
                    });
                }.bind(this),
                error: function(xhr, status, err){
                    console.log(err);
                }
            })
        }
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
                    <td>{this.renderActivityOwner(row.owner)}</td>
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
                <h3>Dina aktiviteter</h3>
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
        return (
            <div className="activities">
                <h3>Dina aktiviteter</h3>
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
                    {this.renderInstructorActivitiesList(this.state.activities)}
                    </tbody>
                </Table>
            </div>
        );
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