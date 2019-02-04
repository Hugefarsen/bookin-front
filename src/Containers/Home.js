import React, { Component } from "react";
import { Table } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import "./Home.css";
import $ from "jquery";

export default class Home extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: true,
            activities: [],
        };

        this.renderActivitesList = this.renderActivitesList;
    }

    componentWillMount() {
        this.getActivities();
    }

    getActivities(){
        if (this.props.isAuthenticated) {
            $.ajax({
                url: 'http://localhost:8888/bookin-api/public/api/user/' + this.props.user.id,
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

    renderInstructorActivitiesList(activities) {
        let that = this;
        return activities.map((row) => {
            return <LinkContainer key={row.id} to={`/activity/${row.id}`}>
                <tr>
                    <td>{that.renderActivityOwner(row.owner)}</td>
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
            <div className="Home">
                {this.renderActivities()}
                {this.renderInstructorActivities()}
            </div>
        );
    }
}