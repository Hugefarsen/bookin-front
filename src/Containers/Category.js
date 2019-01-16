import React, { Component } from "react";
import { ListGroupItem, PageHeader, ListGroup} from "react-bootstrap";

import $ from "jquery";
import {LinkContainer} from "react-router-bootstrap";

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
                console.log(data);
                this.setState({activities: data.data.activities, category: data.data}, function(){
                });
                console.log(this.state);
            }.bind(this),
            error: function(xhr, status, err){
                console.log(err);
            }
        })
    }

    renderActivitiesList(activities){
        return activities.map((row) => {
            return <LinkContainer
                key={row.id}
                to={`/activity/${row.id}`}>
                    <ListGroupItem header={"Start: " + new Date(row.start).toLocaleString()}>
                        {"End: " + new Date(row.end).toLocaleString()}
                        <br/>
                        {"Room: " + row.room.name}
                        <br/>
                        {"Booked: " + row.users.length + " of " + row.room.size}
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