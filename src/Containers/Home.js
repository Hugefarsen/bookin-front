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
        if (this.props.isAuthenticated) {
            console.log(this.props.user);
            $.ajax({
                url: 'http://localhost:8888/bookin-api/public/api/user/' + this.props.user.id,
                dataType: 'json',
                headers: {
                    'Authorization': 'Bearer ' + this.props.user.token,
                },
                cache: false,
                success: function(data){
                    console.log(data.data);
                    this.setState({activities: data.data.goesToActivity}, function(){
                    });
                }.bind(this),
                error: function(xhr, status, err){
                    console.log(err);
                }
            })
        }
    }

    renderActivitesList(activities) {
        return activities.map((row) => {
            return <LinkContainer
                key={row.id}
                to={`/activity/${row.id}`}>
                <ListGroupItem header={row.category.name}>
                    {"Start: " + new Date(row.start).toLocaleString()}
                    <br/>
                    {"End: " + new Date(row.end).toLocaleString()}
                    <br/>
                    {"Room: " + row.room.name}
                </ListGroupItem>
            </LinkContainer>
        })
    }


    renderActivities() {
        return (
            <div className="activities">
                <PageHeader>Your Activities</PageHeader>
                <ListGroup>
                    {this.renderActivitesList(this.state.activities)}
                </ListGroup>
            </div>
        );
    }

    render() {
        return (
            <div className="Home">
                {this.renderActivities()}
                </div>
        );
    }
}