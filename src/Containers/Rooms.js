import React, { Component } from "react";
import { FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import LoaderButton from "../Components/LoaderButton";
import $ from "jquery";

export default class Rooms extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: null,
            selectedRoom: "",
            rooms: "",
        };

        this.handleChange = this.handleChange.bind(this);
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

    handleSubmit = async event => {
        event.preventDefault();

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
                'category_id': this.state.selectedCategory
            },
            cache: false,
            success: function(data){
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
                let optionItems = data.data.map((category) =>
                    <option key={category.id} value={category.id}>{category.name}</option>
                );
                this.setState({rooms: optionItems});

            }.bind(this),
            error: function(xhr, status, err){
                console.log(err);
            }
        });
    };

    getProperties(){
        $.ajax({
            type: 'GET',
            url: 'http://localhost:8888/bookin-api/public/api/roomproperty',
            dataType: 'json',
            headers: {
                'Authorization': 'Bearer ' + this.props.user.token,
            },
            cache: false,
            success: function(data){
                let optionItems = data.data.map((category) =>
                    <option key={category.id} value={category.id}>{category.name}</option>
                );
                this.setState({rooms: optionItems});

            }.bind(this),
            error: function(xhr, status, err){
                console.log(err);
            }
        });
    };

    componentDidMount() {
        this.getRooms();
        this.getProperties();
    }

    render() {
        return (
            <div className="Rooms">
                <div className="Edit">
                    <form onSubmit={this.handleSubmit}>

                        <FormGroup controlId="formControlsSelect">
                            <ControlLabel>Room</ControlLabel>
                            <FormControl componentClass="select"
                                         placeholder="select"
                                         onChange={(e) => this.setState({ selectedRoom: e.target.value })}>
                                <option value="" disabled={this.state.selectedRoom !== ""} defaultValue>
                                    Välj rum
                                </option>
                                {this.state.rooms}
                            </FormControl>
                        </FormGroup>

                        <LoaderButton block
                                      bsStyle="primary"
                                      bsSize="large"
                            //    disabled={!this.validateForm()}
                                      type="submit"
                                      isLoading={this.state.isLoading}
                                      text="Edit"
                                      loadingText="Creating…"
                        />
                    </form>
                </div>
                <div className="createRoom">
                    <form onSubmit={this.handleSubmit}>

                        <FormGroup controlId="formControlsSelect">
                            <ControlLabel>Room</ControlLabel>
                            <FormControl componentClass="select"
                                         placeholder="select"
                                         onChange={(e) => this.setState({ selectedRoom: e.target.value })}>
                                <option value="" disabled={this.state.selectedRoom !== ""} defaultValue>
                                    Välj rum
                                </option>
                                {this.state.rooms}
                            </FormControl>
                        </FormGroup>

                        <LoaderButton block
                                      bsStyle="primary"
                                      bsSize="large"
                            //    disabled={!this.validateForm()}
                                      type="submit"
                                      isLoading={this.state.isLoading}
                                      text="Edit"
                                      loadingText="Creating…"
                        />
                    </form>
                </div>
                <div className="createProperty">
                    <form onSubmit={this.handleSubmit}>

                        <FormGroup controlId="formControlsSelect">
                            <ControlLabel>Room</ControlLabel>
                            <FormControl componentClass="select"
                                         placeholder="select"
                                         onChange={(e) => this.setState({ selectedRoom: e.target.value })}>
                                <option value="" disabled={this.state.selectedRoom !== ""} defaultValue>
                                    Välj rum
                                </option>
                                {this.state.rooms}
                            </FormControl>
                        </FormGroup>

                        <LoaderButton block
                                      bsStyle="primary"
                                      bsSize="large"
                            //    disabled={!this.validateForm()}
                                      type="submit"
                                      isLoading={this.state.isLoading}
                                      text="Edit"
                                      loadingText="Creating…"
                        />
                    </form>
                </div>
            </div>
        );
    }
}