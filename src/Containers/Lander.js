import React, { Component } from "react";
import {PageHeader} from "react-bootstrap";
import "./Home.css";

export default class Home extends Component {
    render() {
        return (
            <div className="Home">
                <div className="lander">
                    <PageHeader>Bookin</PageHeader>
                    <p>A simple booking app</p>
                </div>
            </div>
        );
    }
}