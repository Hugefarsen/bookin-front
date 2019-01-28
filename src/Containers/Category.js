import React, { Component } from "react";
import { ListGroupItem, PageHeader, ListGroup} from "react-bootstrap";
import {LinkContainer} from "react-router-bootstrap";

import $ from "jquery";

export default class Activity extends Component {
    constructor(props) {
        super(props);

        this.state = {
            activities: [],
            category: {},
        };
        this.renderActivitiesList = this.renderActivitiesList
    }

    componentDidMount() {
        this.getActivities();
    }

    getActivities() {
        $.ajax({
            url: 'http://localhost:8888/bookin-api/public/api/activitycategory/' + this.props.match.params.id,
            dataType: 'json',
            headers: {
                'Authorization': 'Bearer ' + this.props.user.token,
            },
            cache: false,
            success: function(data){
                this.setState({activities: data.data.activities, category: data.data}, function(){
                });
            }.bind(this),
            error: function(xhr, status, err){
                console.log(err);
            }
        })
    }

    renderActivityOwner(owner){
        return owner.map((row) => {
            return (" " + row.name)
        })
    }

    renderActivitiesList(activities){
        console.log(activities);
        return activities.map((row) => {
            return <LinkContainer
                key={row.id}
                to={`/activity/${row.id}`}>
                    <ListGroupItem header={"Start: " + new Date(row.start).toLocaleString()}>
                        {"Slut: " + new Date(row.end).toLocaleString()}
                        <br/>
                        {"Rum: " + row.room.name}
                        <br/>
                        {"Bokade: " + row.users.length + " of " + row.room.size}
                        <br/>
                        {"Ledare: " + this.renderActivityOwner(row.owner)}
                    </ListGroupItem>
            </LinkContainer>
        })
    }

    renderActivities(){
        return (
            <div className="activities">
                <PageHeader>{this.state.category.name}</PageHeader>
                <ListGroup>
                    {this.renderActivitiesList(this.state.activities)}
                </ListGroup>
            </div>
        )
    }

    render() {
        return(
            <div className="Category">
                <ListGroup>
                    {this.renderActivities()}
                </ListGroup>
            </div>
        )
    }
}