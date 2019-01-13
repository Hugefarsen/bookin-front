import React, { Component } from "react";
import { FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import LoaderButton from "../Components/LoaderButton";
import "./AddActivity.css";
import $ from "jquery";
import DateTime from "react-datetime";
import Moment from "moment";

export default class AddActivity extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: null,
            selectedCategory: "",
            selectedRoom: "",
            categories: "",
            rooms: "",
            startDate: "",
            endDate: ""
        };

        this.handleChange = this.handleChange.bind(this);
    }

    validateForm() {
        // TODO validation!
      //  return this.state.name.length > 0;
    }

    handleChange = event => {
        console.log(this.state);
        this.setState({
            [event.target.id]: event.target.value
        });
    }

    handleStartDate(date){
        let dateToInsert = new Moment(date).format("YYYY-MM-DD HH:mm:ss");
        this.setState({startDate : dateToInsert});
    };
x
    handleEndDate(date){
        let dateToInsert = new Moment(date).format("YYYY-MM-DD HH:mm:ss");
        this.setState({endDate : dateToInsert});
    };

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
                console.log(data);
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
                let optionItems = data.data.map((category) =>
                    <option key={category.id} value={category.id}>{category.name}</option>
                );
                this.setState({categories: optionItems});


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

    componentDidMount() {
        this.getCategories();
        this.getRooms();
    }

    render() {
        return (
            <div className="AddActivity">
                <form onSubmit={this.handleSubmit}>
                    <FormGroup controlId="formControlsSelect">
                        <ControlLabel>Category</ControlLabel>
                        <FormControl componentClass="select"
                                     placeholder="Category"
                                     onChange={(e) => this.setState({ selectedCategory: e.target.value })}>
                            <option value="" disabled={this.state.selectedCategory !== ""} defaultValue>
                                Välj kategori
                            </option>
                            {this.state.categories}
                        </FormControl>
                    </FormGroup>

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

                    <ControlLabel>Start tid</ControlLabel>
                    <DateTime onChange={this.handleStartDate.bind(this)}
                              dateFormat='YYYY-MM-DD'
                              timeFormat='HH:mm'
                    />

                    <ControlLabel>Slut tid</ControlLabel>
                    <DateTime onChange={this.handleEndDate.bind(this)}
                              dateFormat='YYYY-MM-DD'
                              timeFormat='HH:mm'
                    />

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
        );
    }
}