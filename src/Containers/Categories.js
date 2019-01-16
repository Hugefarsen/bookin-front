import React, { Component } from "react";
import {FormGroup, FormControl, ControlLabel, ListGroupItem} from "react-bootstrap";
import LoaderButton from "../Components/LoaderButton";
import $ from "jquery";
import {LinkContainer} from "react-router-bootstrap";

export default class Categories extends Component {
    constructor(props) {
        super(props);

        this.state = {
            categories: {},
            categoryName: "",
            categoryDescription: "",
        };

        this.handleChange = this.handleChange.bind(this);
        this.renderCategoriesList = this.renderCategoriesList;

    }

    validateForm() {
        // TODO validation!
        //  return this.state.name.length > 0;
    }

    handleChange = event => {
        this.setState({
            [event.target.id]: event.target.value
        });
    }

    createCategory = async event => {
        event.preventDefault();

        this.setState({ isLoading: true });

        $.ajax({
            type: 'POST',
            url: 'http://localhost:8888/bookin-api/public/api/activitycategory',
            dataType: 'json',
            headers: {
                'Authorization': 'Bearer ' + this.props.user.token,
            },
            data: {
                'name': this.state.categoryName,
                'description': this.state.categoryDescription,
            },
            cache: false,
            success: function(data){
                this.state.categories.push(data.data);
                this.setState({ isLoading: false });
            }.bind(this),
            error: function(xhr, status, err){
                console.log(err);
            }
        });
    };

    getCategories(){
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
        return [{}].concat(categories).map(
            (category, i) => i !== 0
                ? <LinkContainer
                    key={category.id + category.id}
                    to={`/category/${category.id}`}
                >
                    <ListGroupItem header={category.name}>
                        {"Beskrivning: " + category.description}

                    </ListGroupItem>
                </LinkContainer>
                : null
        )
    }

    componentWillMount() {
        this.getCategories();
    }

    render() {
        return (
            <div className="categories">
                <h1>Kategorier</h1>
                <div className="addCategory">
                    <h2>Skapa ny kategori</h2>
                <form onSubmit={this.createCategory}>

                    <FormGroup controlId="formControlsSelect">
                        <ControlLabel>Namn</ControlLabel>
                        <FormControl
                            placeholder="Namn"
                            onChange={(e) => this.setState({ categoryName: e.target.value })}>
                        </FormControl>
                    </FormGroup>
                    <FormGroup controlId="formControlsSelect">
                        <ControlLabel>Beskrivning</ControlLabel>
                        <FormControl
                            placeholder="Beskrivning"
                            onChange={(e) => this.setState({ categoryDescription: e.target.value })}>
                        </FormControl>
                    </FormGroup>



                    <LoaderButton block
                                  bsStyle="primary"
                                  bsSize="large"
                        //    disabled={!this.validateForm()}
                                  type="submit"
                                  isLoading={this.state.isLoading}
                                  text="Create"
                                  loadingText="Creating…"
                    />
                </form>
                </div>
                <div className="categories">
                    <h3>Tillgängliga kategorier</h3>
                        {this.renderCategoriesList(this.state.categories)}
                </div>
            </div>);
    }
}