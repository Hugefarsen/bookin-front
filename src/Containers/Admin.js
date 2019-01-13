import React, { Component } from "react";
import $ from "jquery";
import {LinkContainer} from "react-router-bootstrap";
import {ListGroupItem} from "react-bootstrap";

export default class Admin extends Component {
    constructor(props) {
        super(props);

        this.state = {
            activity: "",
            category: "",
            users: [],

        };

        this.renderUsersList = this.renderUsersList;
    }

    componentWillMount() {
        this.getUsers();
    }

    renderCreateActivity(){
        return <LinkContainer
            key="newActivity"
            to="/activity/new"
        >
            <ListGroupItem>
                <h4>
                    <b>{"\uFF0B"}</b> Create a new activity
                </h4>
            </ListGroupItem>
        </LinkContainer>
    }

    renderCreateCategory(){
        return <LinkContainer
            key="categories"
            to="/categories"
        >
            <ListGroupItem>
                <h4>
                    <b>{"\uFF0B"}</b> List and create category
                </h4>
            </ListGroupItem>
        </LinkContainer>
    }

    renderCreateRoom(){
        return <LinkContainer
            key="rooms"
            to="/rooms"
        >
            <ListGroupItem>
                <h4>
                    <b>{"\uFF0B"}</b> List and create room
                </h4>
            </ListGroupItem>
        </LinkContainer>
    }

    getUsers(){
        $.ajax({
            type: 'GET',
            url: 'http://localhost:8888/bookin-api/public/api/user',
            dataType: 'json',
            headers: {
                'Authorization': 'Bearer ' + this.props.user.token,
            },
            cache: false,
            success: function(data){
                console.log(data.data);
                this.setState({users: data.data}, function(){
                    console.log(this);
                });
            }.bind(this),
            error: function(xhr, status, err){
                console.log(err);
            }
        });
    }

    renderUsersList(users) {
        console.log(users);
        return [{}].concat(users).map(
            (user, i) => i !== 0
                ? <LinkContainer
                    key={user.id}
                    to={`/user/${user.id}`}
                >
                    <ListGroupItem header={user.name.trim().split("\n")[0]}>
                        {"Id: " + user.id}
                        <br />
                        {"Email: " + user.email}

                    </ListGroupItem>
                </LinkContainer>
                : null
        )
    }


    render() {
        return (
            <div className="Home">
                {this.renderCreateActivity()}
                {this.renderCreateCategory()}
                {this.renderCreateRoom()}
                {this.renderUsersList(this.state.users)}
            </div>
        );
    }
};