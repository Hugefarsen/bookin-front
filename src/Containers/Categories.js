import React, { Component } from "react";
import {PageHeader, ListGroupItem} from "react-bootstrap";
import $ from "jquery";
import {LinkContainer} from "react-router-bootstrap";

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
        console.log(this);
        $.ajax({
            type: 'GET',
            url: 'http://localhost:8888/bookin-api/public/api/activitycategory',
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
        return categories.map((row) => {
            return <LinkContainer
                key={row.id}
                to={`/category/${row.id}`}
            >
                <ListGroupItem header={row.name}>
                    {"Beskrivning: " + row.description}

                </ListGroupItem>
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
                        {this.renderCategoriesList(this.state.categories)}
                </div>
            </div>);
    }
}