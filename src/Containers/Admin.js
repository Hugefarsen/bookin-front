import React, { Component } from "react";
import {LinkContainer} from "react-router-bootstrap";
import {ControlLabel, FormControl, FormGroup, Glyphicon, ListGroupItem, PageHeader, PanelGroup, Panel, Button, Table} from "react-bootstrap";
import LoaderButton from "../Components/LoaderButton";
import Moment from "moment";
import DateTime from "react-datetime";
import $ from "jquery";

export default class Admin extends Component {
    constructor(props) {
        super(props);

        this.state = {
            activity: "",
            categories: [],
            users: [],
            rooms: [],
            isLoading: false,
            startDate: "",
            endDate: "",
            selectedCategory: "",
            selectedRoom: "",
            activities: []
        };

        this.handleDeleteUser = this.handleDeleteUser.bind(this);
    }

    componentWillMount() {
        this.getUsers();
        this.getCategories();
        this.getRooms();
        this.getActivities();
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

    handleDeleteCategory(e) {
        e.preventDefault();

        let targetId = e.target.id;
        $.ajax({
            type: 'DELETE',
            url: 'http://localhost:8888/bookin-api/public/api/activitycategory/' + e.target.id,
            dataType: 'json',
            headers: {
                'Authorization': 'Bearer ' + this.props.user.token,
            },
            cache: false,
            success: function(){
                if (window.confirm("Är du säker du vill ta bort denna kategori?")) {
                    let categories = this.state.categories;
                    for (let i = 0; i < categories.length; i++) {
                        if (parseInt(targetId) === parseInt(categories[i].id)) {
                            categories.splice(i, 1);
                            this.setState({categories: categories})
                        }
                    }
                }
            }.bind(this),
            error: function(xhr, status, err){
                console.log(err);
            }
        });
    }

    renderCategoriesList(categories) {
        return categories.map((row) => {
            return <LinkContainer
                    key={row.id}
                    to={`/category/${row.id}`}
                    className="row"
                >
                    <ListGroupItem header={row.name}>
                        {"Beskrivning: " + row.description}
                        <Button className="pull-right" bsStyle="danger" id={row.id} onClick={e => this.handleDeleteCategory(e)}>Ta bort <Glyphicon glyph="trash" />
                        </Button>
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

    handleDeleteRoom(e){
        e.preventDefault();

        let targetId = e.target.id;
        $.ajax({
            type: 'DELETE',
            url: 'http://localhost:8888/bookin-api/public/api/room/' + e.target.id,
            dataType: 'json',
            headers: {
                'Authorization': 'Bearer ' + this.props.user.token,
            },
            cache: false,
            success: function(){
                if (window.confirm("Är du säker du vill ta bort detta rum?")) {
                    let rooms = this.state.rooms;
                    for (let i = 0; i < rooms.length; i++) {
                        if (parseInt(targetId) === parseInt(rooms[i].id)) {
                            rooms.splice(i, 1);
                            this.setState({rooms: rooms})
                        }
                    }
                }
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
                className="row"
            >
                <ListGroupItem header={row.name}>
                    {"Id: " + row.id}
                    <br />
                    {"Beskrivning: " + row.description}
                    <br />
                    {"Storlek: " + row.size}
                    <Button className="pull-right" bsStyle="danger" id={row.id} onClick={e => this.handleDeleteRoom(e)}>Ta bort <Glyphicon glyph="trash" />
                    </Button>
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
                this.setState({users: data.data}, function(){
                });
            }.bind(this),
            error: function(xhr, status, err){
                console.log(err);
            }
        });
    }

    handleDeleteUser(e){
        e.preventDefault();

        let targetId = e.target.id;
        $.ajax({
            type: 'DELETE',
            url: 'http://localhost:8888/bookin-api/public/api/user/' + e.target.id,
            dataType: 'json',
            headers: {
                'Authorization': 'Bearer ' + this.props.user.token,
            },
            cache: false,
            success: function(){
                if (window.confirm("Är du säker du vill ta bort användaren?")) {
                    let users = this.state.users;
                    for (let i = 0; i < users.length; i++) {
                        if (parseInt(targetId) === parseInt(users[i].id)) {
                            users.splice(i, 1);
                            this.setState({users: users})
                        }
                    }
                }
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

                <tr>
                    <td>{row.id}</td>
                    <td>{row.name}</td>
                    <td>{row.email}</td>
                    <td>{this.renderUserRoles(row.role)}</td>
                    <td>
                        <Button className="pull-right" bsStyle="danger" id={row.id} onClick={e => this.handleDeleteUser(e)}>Ta bort <Glyphicon glyph="trash" />
                        </Button>
                    </td>
                </tr>
            </LinkContainer>
        })
    }

    renderActivityOwner(owner){
        return owner.map((row) => {
            return (" " + row.name)
        })
    }

    getActivities(){
        $.ajax({
            type: 'GET',
            url: 'http://localhost:8888/bookin-api/public/api/activity',
            dataType: 'json',
            headers: {
                'Authorization': 'Bearer ' + this.props.user.token,
            },
            cache: false,
            success: function(data){
                this.setState({activities: data.data}, function(){
                });
            }.bind(this),
            error: function(xhr, status, err){
                console.log(err);
            }
        });
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

                    <td>
                        <Button className="pull-right" bsStyle="danger" id={row.id} onClick={e => this.handleDeleteActivity(e)}>Ta bort <Glyphicon glyph="trash" />
                        </Button>
                    </td>
                </tr>
            </LinkContainer>
        })

    }

    handleDeleteActivity(e){
        e.preventDefault();

        let targetId = e.target.id;
        $.ajax({
            type: 'DELETE',
            url: 'http://localhost:8888/bookin-api/public/api/activity/' + e.target.id,
            dataType: 'json',
            headers: {
                'Authorization': 'Bearer ' + this.props.user.token,
            },
            cache: false,
            success: function(){
                if (window.confirm("Är du säker du vill ta bort aktiviteten?")) {
                    let activities = this.state.activities;
                    for (let i = 0; i < activities.length; i++) {
                        if (parseInt(targetId) === parseInt(activities[i].id)) {
                            activities.splice(i, 1);
                            this.setState({activities: activities})
                        }
                    }
                }
            }.bind(this),
            error: function(xhr, status, err){
                console.log(err);
            }
        });
    }

    handleStartDate(date){
        let dateToInsert = new Moment(date).format("YYYY-MM-DD HH:mm:ss");
        let endDate = new Moment(date).add(1, 'hours').format("YYYY-MM-DD HH:mm:ss");
        this.setState({startDate : dateToInsert, endDate: endDate});
    };

    handleEndDate(date){
        let dateToInsert = new Moment(date).format("YYYY-MM-DD HH:mm:ss");
        this.setState({endDate : dateToInsert});
    };

    createActivity = async event => {
        event.preventDefault();
        let that = this;

        this.setState({ isLoading: true });
        $.ajax({
            type: 'POST',
            url: 'http://localhost:8888/bookin-api/public/api/activity',
            dataType: 'json',
            headers: {
                'Authorization': 'Bearer ' + this.props.user.token,
            },
            data: {
                'room_id': this.state.selectedRoom,
                'start': this.state.startDate,
                'end': this.state.endDate,
                'category_id': this.state.selectedCategory,
                'owner': this.props.user.id
            },
            cache: false,
            success: function(data){
                that.state.activities.push(data.data);
                that.setState({ isLoading: false });
            },
            error: function(xhr, status, err){
                console.log(err);
                if(xhr.responseText) {
                    let responseTxt = JSON.parse(xhr.responseText);
                    alert('Rummet är tyvärr bokat mellan ' + responseTxt.prebooked[0].start + ' och ' + responseTxt.prebooked[0].end);
                    that.setState({isLoading: false});
                }
            }
        });

    };

    renderRoomsOptions(rooms){
        return rooms.map((room) => {
            return <option key={room.id} value={room.id}>{room.name}</option>
            }
        );
    };

    renderCategoriesOptions(categories){
        return categories.map((category) =>
            <option key={category.id} value={category.id}>{category.name}</option>
        );
    };

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
                                                  text="Skapa"
                                                  loadingText="Skapar…"
                                    />
                                </form>
                                <div className="categorylist">
                                    <h3>Redigera kategori</h3>
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
                                                  text="Skapa"
                                                  loadingText="Skapar…"
                                    />
                                </form>
                                <div className="categorylist">
                                    <h3>Redigera rum</h3>
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
                                    <Table striped bordered hover>
                                        <thead>
                                            <tr>
                                                <th>Id</th>
                                                <th>Namn</th>
                                                <th>Email</th>
                                                <th>Roller</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {this.renderUsersList(this.state.users)}
                                        </tbody>
                                    </Table>
                                </div>
                            </Panel.Body>
                        </Panel.Collapse>
                    </Panel>

                    <Panel eventKey="4" id="activities">
                        <Panel.Heading>
                            <Panel.Title toggle>
                                Aktiviteter
                            </Panel.Title>
                        </Panel.Heading>
                        <Panel.Collapse>
                            <Panel.Body>
                                <h3>Lägg till aktivitet</h3>
                                <div className="AddActivity">
                                    <form onSubmit={this.createActivity}>
                                        <FormGroup controlId="formControlsSelect">
                                            <ControlLabel>Kategori</ControlLabel>
                                            <FormControl componentClass="select"
                                                         placeholder="Kategori"
                                                         onChange={(e) => this.setState({ selectedCategory: e.target.value })}>
                                                <option value="" disabled={this.state.selectedCategory !== ""} defaultValue>
                                                    Välj kategori
                                                </option>
                                                {this.renderCategoriesOptions(this.state.categories)}
                                            </FormControl>
                                        </FormGroup>

                                        <FormGroup controlId="formControlsSelect">
                                            <ControlLabel>Rum</ControlLabel>
                                            <FormControl componentClass="select"
                                                         placeholder="Rum"
                                                         onChange={(e) => this.setState({ selectedRoom: e.target.value })}>
                                                <option value="" disabled={this.state.selectedRoom !== ""} defaultValue>
                                                    Välj rum
                                                </option>
                                                {this.renderRoomsOptions(this.state.rooms)}
                                            </FormControl>
                                        </FormGroup>

                                        <ControlLabel>Start tid</ControlLabel>
                                        <DateTime onChange={this.handleStartDate.bind(this)}
                                                  dateFormat='YYYY-MM-DD'
                                                  timeFormat='HH:mm'
                                                  value={this.state.startDate}
                                        />

                                        <ControlLabel>Slut tid</ControlLabel>
                                        <DateTime onChange={this.handleEndDate.bind(this)}
                                                  dateFormat='YYYY-MM-DD'
                                                  timeFormat='HH:mm'
                                                  value={this.state.endDate}
                                        />

                                        <LoaderButton block
                                                      bsStyle="primary"
                                                      bsSize="large"
                                            //    disabled={!this.validateForm()}
                                                      type="submit"
                                                      isLoading={this.state.isLoading}
                                                      text="Skapa"
                                                      loadingText="Skapar…"
                                        />
                                    </form>
                                </div>
                                <hr/>
                                    <div className="activitiesList">
                                        <Table striped bordered hover>
                                            <thead>
                                            <tr>
                                                <th>Instruktör</th>
                                                <th>Starttid</th>
                                                <th>Sluttid</th>
                                                <th>Rum</th>
                                                <th>Bokade</th>
                                                <th></th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                                {this.renderActivitiesList(this.state.activities)}
                                            </tbody>
                                        </Table>
                                    </div>
                            </Panel.Body>
                        </Panel.Collapse>
                    </Panel>
                </PanelGroup>
            </div>
        );
    }
};