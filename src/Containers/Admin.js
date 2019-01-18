import React, { Component } from "react";
import $ from "jquery";
import {LinkContainer} from "react-router-bootstrap";
import {ControlLabel, FormControl, FormGroup, ListGroupItem, PageHeader, PanelGroup, Panel} from "react-bootstrap";
import LoaderButton from "../Components/LoaderButton";

export default class Admin extends Component {
    constructor(props) {
        super(props);

        this.state = {
            activity: "",
            categories: [],
            users: [],
            rooms: [],
            isLoading: false,

        };

        this.renderUsersList = this.renderUsersList;
        this.handleChange = this.handleChange.bind(this);
    }

    componentWillMount() {
        this.getUsers();
        this.getCategories();
        this.getRooms();
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
        return categories.map((row) => {
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

    createRoom = async event => {
        event.preventDefault();

        this.setState({ isLoading: true });

        $.ajax({
            type: 'POST',
            url: 'http://localhost:8888/bookin-api/public/api/room',
            dataType: 'json',
            headers: {
                'Authorization': 'Bearer ' + this.props.user.token,
            },
            data: {
                'name': this.state.roomName,
                'description': this.state.roomDescription,
                'size': this.state.roomSize,
            },
            cache: false,
            success: function(data){
                this.state.rooms.push(data.data);
                this.setState({ isLoading: false });
            }.bind(this),
            error: function(xhr, status, err){
                console.log(err);
            }
        });
    };

    getRooms(){
        $.ajax({
            type: 'GET',
            url: 'http://localhost:8888/bookin-api/public/api/room',
            dataType: 'json',
            headers: {
                'Authorization': 'Bearer ' + this.props.user.token,
            },
            cache: false,
            success: function(data){
                this.setState({rooms: data.data}, function(){
                });
            }.bind(this),
            error: function(xhr, status, err){
                console.log(err);
            }
        });
    }

    renderRoomsList(rooms) {
        return rooms.map((row) => {
            return <LinkContainer
                key={row.id}
                to={`/user/${row.id}`}
            >
                <ListGroupItem header={row.name}>
                    {"Id: " + row.id}
                    <br />
                    {"Beskrivning: " + row.description}
                    <br />
                    {"Storlek: " + row.size}

                </ListGroupItem>
            </LinkContainer>
        })
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
                console.log(data);
                this.setState({users: data.data}, function(){
                });
            }.bind(this),
            error: function(xhr, status, err){
                console.log(err);
            }
        });
    }

    renderUserRoles(item){
        return item.map((row) => {
            return (" " + row.role)
        })
    }

    renderUsersList(users) {
        return users.map((row) => {
            return <LinkContainer
                key={row.id}
                to={`/user/${row.id}`}
            >
                <ListGroupItem header={row.name}>
                    {"Id: " + row.id}
                    <br />
                    {"Email: " + row.email}
                    <br />
                    {"Roles:" + this.renderUserRoles(row.role)}
                </ListGroupItem>
            </LinkContainer>
        })
    }

    render() {
        return (
            <div className="admin">
                <PageHeader>Admin</PageHeader>

                <PanelGroup accordion id="admin">
                    <Panel eventKey="1" id="categories">
                        <Panel.Heading>
                            <Panel.Title toggle>
                                Kategorier
                            </Panel.Title>
                        </Panel.Heading>
                        <Panel.Collapse>
                            <Panel.Body>
                                <h4>Skapa ny kategori</h4>
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
                                <div className="categorylist">
                                    <h3>Tillgängliga kategorier</h3>
                                    {this.renderCategoriesList(this.state.categories)}
                                </div>
                            </Panel.Body>
                        </Panel.Collapse>
                    </Panel>
                    <Panel eventKey="2" id="rooms">
                        <Panel.Heading>
                            <Panel.Title toggle>
                                Rum
                            </Panel.Title>
                        </Panel.Heading>
                        <Panel.Collapse>
                            <Panel.Body>
                                <h4>Skapa nytt rum</h4>
                                <form onSubmit={this.createRoom}>
                                    <FormGroup controlId="formControlsSelect">
                                        <ControlLabel>Namn</ControlLabel>
                                        <FormControl
                                            placeholder="Namn"
                                            onChange={(e) => this.setState({ roomName: e.target.value })}>
                                        </FormControl>
                                    </FormGroup>
                                    <FormGroup controlId="formControlsSelect">
                                        <ControlLabel>Beskrivning</ControlLabel>
                                        <FormControl
                                            placeholder="Beskrivning"
                                            onChange={(e) => this.setState({ roomDescription: e.target.value })}>
                                        </FormControl>
                                    </FormGroup>
                                    <FormGroup controlId="formControlsSelect">
                                        <ControlLabel>Storlek</ControlLabel>
                                        <FormControl
                                            placeholder="Antal platser"
                                            type="number"
                                            onChange={(e) => this.setState({ roomSize: e.target.value })}>
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
                                <div className="categorylist">
                                    <h3>Tillgängliga rum</h3>
                                    {this.renderRoomsList(this.state.rooms)}
                                </div>
                            </Panel.Body>
                        </Panel.Collapse>
                    </Panel>
                    <Panel eventKey="3" id="users">
                        <Panel.Heading>
                            <Panel.Title toggle>
                                Användare
                            </Panel.Title>
                        </Panel.Heading>
                        <Panel.Collapse>
                            <Panel.Body>
                                <h3>Hantera användare</h3>
                                <div className="userlists">
                                    {this.renderUsersList(this.state.users)}
                                </div>
                            </Panel.Body>
                        </Panel.Collapse>
                    </Panel>

                </PanelGroup>
            </div>
/*

            <div className="Home">
                {this.renderCreateActivity()}
                {this.renderCreateCategory()}
                {this.renderCreateRoom()}
                {this.renderUsersList(this.state.users)}
            </div>
            */
        );
    }
};