import React, { Component } from "react";
import { PageHeader, ListGroup } from "react-bootstrap";
import "./Home.css";
import $ from "jquery";

export default class Home extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: true,
            activities: []
        };
        console.log(this);
    }

    componentDidMount(){
        console.log(this.props.user.token);
        if (this.props.user) {
            $.ajax({
                url: 'http://localhost:8888/bookin-api/public/api/activity',
                dataType: 'json',
                data: {'Authorization' : 'Bearer'+this.props.user.token},
                cache: false,
                success: function(data){
                    this.setState({activities: data.data}, function(){
                        console.log(this.state);
                        console.log(this.state.activities);
                    })
                }.bind(this),
                error: function(xhr, status, err){
                    console.log(err);
                }
            })
        }
        this.getActivities();
    }

    getActivities(){
        if (this.state.user) {
            $.ajax({
                url: 'http://localhost:8888/bookin-api/public/api/activity',
                dataType: 'json',
                data: {'Authorization' : 'Bearer'+this.state.user.token},
                cache: false,
                success: function(data){
                    this.setState({activities: data.data}, function(){
                        console.log(this.state);
                        console.log(this.state.activities);
                    })
                }.bind(this),
                error: function(xhr, status, err){
                    console.log(err);
                }
            })
        }
    }


    renderActivitesList(activities) {
        return null;
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
                    {!this.state.isLoading && this.renderActivitesList(this.state.activities)}
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