import React, { Component } from "react";
import { ListGroupItem, PageHeader, ListGroup, Button, Glyphicon} from "react-bootstrap";
import {LinkContainer} from "react-router-bootstrap";
import "./Activity.css";
import config from "../config"

import $ from "jquery";


export default class Activity extends Component {
    constructor(props) {
        super(props);

        this.state = {
            activity: {
                owner: []
            },
            category: {},
            users: [],
            room: {},
            isBooked: false
        };
    }

    componentWillMount() {
        this.getActivity();
    }

    checkBooked(users){
        var i;
        for (i = 0; i < users.length; i++) {
             if(users[i].id === this.props.user.id){
                 this.setState({isBooked: true})
             }
        }
    }

    getActivity = () => {
        $.ajax({
            url: config.apiUrl + '/activity/' + this.props.match.params.id,
            dataType: 'json',
            headers: {
                'Authorization': 'Bearer ' + this.props.user.token,
            },
            cache: false,
            success: (data) => {
                this.setState({
                    activity: data.data,
                    category: data.data.category,
                    users: data.data.users,
                    room: data.data.room
                });
                this.checkBooked(data.data.users);
            },
            error: (xhr, status, err) => {
                if (err === "Not Found") {
                    alert('Aktiviteten hittades inte');
                    this.props.history.goBack()
                }
            }
        })
    }

    renderActivityOwner(owner) {
        return owner.map((row) => {
            return (" " + row.name)
        })
    }

    renderUserList(users) {
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

    book = (e) => {
        $.ajax({
            type: 'PUT',
            url: config.apiUrl + '/activity/' + this.props.match.params.id + '/book',
            dataType: 'json',
            headers: {
                'Authorization': 'Bearer ' + this.props.user.token,
            },
            data: {
                'user_id': this.props.user.id,
                'activity_id': this.props.match.params.id,
            },
            cache: false,
            success: (data) => {
                this.setState({
                    users: data.users,
                });
                this.checkBooked(data.users);
            },
            error: (xhr, status, err) => {
                console.log(err);
            }
        })
    }

    cancel = (e) => {
        $.ajax({
            type: 'PUT',
            url: config.apiUrl + '/activity/' + this.props.match.params.id + '/cancel',
            dataType: 'json',
            headers: {
                'Authorization': 'Bearer ' + this.props.user.token,
            },
            data: {
                'user_id': this.props.user.id,
                'activity_id': this.props.match.params.id,
            },
            cache: false,
            success: (data) => {
                this.setState({
                    users: data.users, isBooked:false,
                });
                this.checkBooked(data.users);

            },
            error: (xhr, status, err) => {
                console.log(err);
            }
        })
    }

    renderBookButton(e){
        if(!e){
            return (
                <Button className="pull-right" bsStyle="success" disabled={this.state.users.length >= this.state.room.size} onClick={e => this.book(e)}>Boka klass <Glyphicon
                    glyph="check"/>
                </Button>
            )
        } else {
            return (
                <Button className="pull-right" bsStyle="warning" disabled={this.state.users.length >= this.state.room.size} onClick={e => this.cancel(e)}>Avboka <Glyphicon
                    glyph="remove-circle"/>
                </Button>
            )
        }
    }

    render() {
        return (
            <div className="Activity">
                <PageHeader>{this.state.category.name}</PageHeader>
                <h3>Ledare</h3>
                <p>{this.renderActivityOwner(this.state.activity.owner)}</p>

                <h3>Start tid</h3>
                <p>{this.state.activity.start}</p>
                <h3>Slut tid</h3>
                <p>{this.state.activity.end}</p>
                <h3>Bokade</h3>
                <p>{this.state.users.length} / {this.state.room.size}</p>

                {this.renderBookButton(this.state.isBooked)}

                <ListGroup>
                    {this.props.isAdmin ? this.renderUsers() : null}
                </ListGroup>
            </div>
        );
    };
}

