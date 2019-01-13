import React, { Component } from "react";
import { PageHeader, ListGroup, ListGroupItem } from "react-bootstrap";
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
        if (this.props.user) {
            $.ajax({
                url: 'http://localhost:8888/bookin-api/public/api/activity',
                dataType: 'json',
                headers: {
                    'Authorization': 'Bearer ' + this.props.user.token,
                },
                cache: false,
                success: function(data){
                    console.log(data.data);
                    this.setState({activities: data.data}, function(){
                    });
                }.bind(this),
                error: function(xhr, status, err){
                    console.log(err);
                }
            })
        }
    }

    renderActivitesList(activities) {
        return [{}].concat(activities).map(
            (activity, i) => i !== 0
                ? <LinkContainer
                    key={activity.id}
                    to={`/activity/${activity.id}`}
                >
                    <ListGroupItem header={activity.categories.name.trim().split("\n")[0]}>
                        {"Start: " + new Date(activity.start).toLocaleString()}
                        <br/>
                        {"End: " + new Date(activity.end).toLocaleString()}
                        <br/>
                        {"Room: " + activity.room.name}

                    </ListGroupItem>
                </LinkContainer>
                : null
        )
    }


    renderCreateActivity(){
        return <LinkContainer
            key="new"
            to="/activity/new"
        >
            <ListGroupItem>
                <h4>
                    <b>{"\uFF0B"}</b> Create a new activity
                </h4>
            </ListGroupItem>
        </LinkContainer>
    }


    renderLander() {
        return (
            <div className="lander">
                <h1>Bookin</h1>
                <p>A simple booking app</p>
            </div>
        );
    }

    renderActivities() {
        return (
            <div className="activities">
                <PageHeader>Your Activities</PageHeader>
                <ListGroup>
                    {this.props.isAdmin && this.renderCreateActivity()}
                    {this.renderActivitesList(this.state.activities)}
                </ListGroup>
            </div>
        );
    }

    render() {
        return (
            <div className="Home">
                {this.props.isAuthenticated ? this.renderActivities() : this.renderLander()}
                </div>
        );
    }
}