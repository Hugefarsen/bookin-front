import React, { Component } from "react";
import {PageHeader, Table} from "react-bootstrap";
import $ from "jquery";
import {LinkContainer} from "react-router-bootstrap";
import config from "../config"

export default class Categories extends Component {
    constructor(props) {
        super(props);

        this.state = {
            categories: [],
        };

    }

    validateForm() {
        // TODO validation!
        //  return this.state.name.length > 0;
    }

    getCategories(){
        $.ajax({
            type: 'GET',
            url: config.apiUrl + '/activitycategory',
            dataType: 'json',
            headers: {
                'Authorization': 'Bearer ' + this.props.user.token,
            },
            cache: false,
            success: function(data){
                this.setState({categories: data.data}, function () {
                });
            }.bind(this),
            error: function(xhr, status, err){
                console.log(err);
            }
        });
    };

    renderCategoriesList(categories) {
        return categories.map((row) => {
            return <LinkContainer key={row.id} to={`/category/${row.id}`}>
                <tr>
                    <td>{row.id}</td>
                    <td>{row.name}</td>
                    <td>{row.description}</td>
                    <td>{row.activities.length}</td>
                </tr>
            </LinkContainer>
        })
    }


    componentWillMount() {
        this.getCategories();
    }

    render() {
        return (
            <div className="categories">

                <div className="categories">
                    <PageHeader>Tillgängliga kategorier</PageHeader>
                    <Table striped bordered hover>
                        <thead>
                        <tr>
                            <th>Id</th>
                            <th>Namn</th>
                            <th>Beskrivning</th>
                            <th>Antal aktiviteter</th>
                        </tr>
                        </thead>
                        <tbody>
                        {this.renderCategoriesList(this.state.categories)}
                        </tbody>
                    </Table>
                </div>
            </div>);
    }
}