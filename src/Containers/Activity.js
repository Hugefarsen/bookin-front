import React, { Component } from "react";
import { ControlLabel, ListGroupItem, PageHeader,ListGroup } from "react-bootstrap";
import "./Activity.css";

import $ from "jquery";

import {LinkContainer} from "react-router-bootstrap";

export default class Activity extends Component {
    constructor(props) {
        super(props);

        this.state = {
            activity: {},
            category: {},
            users: [],
            room: {}
        };

        this.renderUserList = this.renderUserList
    }

    componentWillMount() {
        this.getActivity();
    }

    getActivity() {
        $.ajax({
            url: 'http://localhost:8888/bookin-api/public/api/activity/' + this.props.match.params.id,
            dataType: 'json',
            headers: {
                'Authorization': 'Bearer ' + this.props.user.token,
            },
            cache: false,
            success: function(data){
                this.setState({
                    activity: data.data,
                    category: data.data.category,
                    users: data.data.users,
                    room: data.data.room
                });
            }.bind(this),
            error: function(xhr, status, err){
                console.log(err);
            }
        })
    }

    renderUserList(users){
        return users.map((row) => {
            return <LinkContainer
                key={row.id}
                to={`/user/${row.id}`}>
                    <ListGroupItem header={row.name}>
                    </ListGroupItem>
            </LinkContainer>
        })
    }

    renderUsers() {
        return (
            <div className="users">
                <PageHeader>Users</PageHeader>
                <ListGroup>
                    {this.renderUserList(this.state.users)}
                </ListGroup>
            </div>
        )
    }

    render() {
        return <div className="Activity">
            <PageHeader>{this.state.category.name}</PageHeader>
            <ControlLabel>Start tid</ControlLabel>
            <p>{this.state.activity.start}</p>
            <ControlLabel>Slut tid</ControlLabel>
            <p>{this.state.activity.end}</p>
            <ControlLabel>Bokade</ControlLabel>
            <p>{this.state.users.length} / {this.state.room.size}</p>

            <ListGroup>
                {this.props.isAdmin ? this.renderUsers() : null}
            </ListGroup>
            </div>;
    }
}