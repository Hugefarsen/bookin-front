import React, { Component } from "react";
import { PageHeader, ListGroup, ListGroupItem } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import "./Home.css";
import $ from "jquery";

export default class Home extends Component {
    constructor(props) {
        super(props);
    }

    renderLander() {
        return (
            <div className="lander">
                <h1>Bookin</h1>
                <p>A simple booking app</p>
            </div>
        );
    }

    render() {
        return (
            <div className="Home">
                <div className="lander">
                    <h1>Bookin</h1>
                    <p>A simple booking app</p>
                </div>
            </div>
        );
    }
}