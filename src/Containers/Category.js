import React, { Component } from "react";
import { PageHeader, Table } from "react-bootstrap";
import {LinkContainer} from "react-router-bootstrap";
import config from "../config"

import $ from "jquery";

export default class Activity extends Component {
    constructor(props) {
        super(props);

        this.state = {
            activities: [],
            category: {}
        };
    }

    componentDidMount() {
        this.getActivities();
    }

    getActivities() {
        $.ajax({
            url: config.apiUrl + '/activitycategory/' + this.props.match.params.id,
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

    renderActivities(){
        return (
            <div className="activities">
                <PageHeader>{this.state.category.name}</PageHeader>
                <Table striped bordered hover>
                    <thead>
                    <tr>
                        <th>Instruktör</th>
                        <th>Starttid</th>
                        <th>Sluttid</th>
                        <th>Rum</th>
                        <th>Bokade</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.renderActivitiesList(this.state.activities)}
                    </tbody>
                </Table>
            </div>
        )
    }

    render() {
        return(
            <div className="Category">
                    {this.renderActivities()}
            </div>
        )
    }
}