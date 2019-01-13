import React, { Component } from "react";
import { FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import LoaderButton from "../Components/LoaderButton";
import "./Activity.css";


import $ from "jquery";
import DateTime from "react-datetime";
import Moment from "moment";

export default class Activity extends Component {
    constructor(props) {
        super(props);

        this.state = {
            activity: {}
        };
    }

    componentDidMount() {
        this.getActivity();
    }

    getActivity() {
        if (this.props.user) {
            $.ajax({
                url: 'http://localhost:8888/bookin-api/public/api/activity/' + this.props.match.params.id,
                dataType: 'json',
                headers: {
                    'Authorization': 'Bearer ' + this.props.user.token,
                },
                cache: false,
                success: function(data){
                    this.setState({activity: data.data}, function(){
                    });
                }.bind(this),
                error: function(xhr, status, err){
                    console.log(err);
                }
            })
        }
    }

    validateForm() {
        return this.state.activity.start;
    }

    handleStartDate(date){
        let activity = {...this.state.activity};
        let dateToInsert = new Moment(date).format("YYYY-MM-DD HH:mm:ss");
        activity.start = dateToInsert;
        this.setState({activity})
    };

    handleEndDate(date){
        let activity = {...this.state.activity};
        let dateToInsert = new Moment(date).format("YYYY-MM-DD HH:mm:ss");
        activity.end = dateToInsert;
        this.setState({activity });
    };


    handleChange = event => {
        this.setState({
            [event.target.id]: event.target.value
        });
    }

    handleSubmit = async event => {
        event.preventDefault();

        this.setState({ isLoading: true });

        try {
            await this.saveActivity({
                activity: this.state.activity,
            });
            alert('Nu vart det sparat');
            this.props.history.push("/");
        } catch (e) {
            alert(e);
            this.setState({ isLoading: false });
        }
    };

    saveActivity(activity) {
        $.ajax({
            type: "PUT",
            url: 'http://localhost:8888/bookin-api/public/api/activity/' + this.props.match.params.id,
            dataType: 'json',
            headers: {
                'Authorization': 'Bearer ' + this.props.user.token,
            },
            data: {
                'activity_id' : activity.activity.id,
                'start': activity.activity.start,
                'end': activity.activity.end,
                'room_id': activity.activity.room.id,
                'category_id': activity.activity.category.id
            },
            cache: false,
            success: function(data){
                console.log(data);
                this.setState({activity: data.data})
            }.bind(this),
            error: function(xhr, status, err){
                console.log(err);
            }
        })
    }

    deleteActivity() {
        $.ajax({
            type: "DELETE",
            url: 'http://localhost:8888/bookin-api/public/api/activity/' + this.props.match.params.id,
            dataType: 'json',
            headers: {
                'Authorization': 'Bearer ' + this.props.user.token,
            },
            cache: false,
            success: function(data){
                this.setState({activity: {}})
            }.bind(this),
            error: function(xhr, status, err){
                console.log(err);
            }
        })
    }

    handleDelete = async event => {
        event.preventDefault();

        const confirmed = window.confirm(
            "Are you sure you want to delete this activity?"
        );

        if (!confirmed) {
            return;
        }

        this.setState({ isDeleting: true });

        try {
            await this.deleteActivity();
            this.props.history.push("/");
        } catch (e) {
            alert(e);
            this.setState({ isDeleting: false });
        }
    };

    render() {
        return <div className="Activity">

            {this.state.activity &&
            <form onSubmit={this.handleSubmit}>
                <FormGroup controlId="name">
                    <ControlLabel>Namn</ControlLabel>
                    <FormControl
                        onChange={this.handleChange}
                        value={this.state.activity.name }
                        type="text"
                    />
                </FormGroup>
                <ControlLabel>Start tid</ControlLabel>
                <DateTime onChange={this.handleStartDate.bind(this)}
                          dateFormat='YYYY-MM-DD'
                          timeFormat='HH:mm'
                          value={new Date(this.state.activity.start)}
                />

                <ControlLabel>Slut tid</ControlLabel>
                <DateTime onChange={this.handleEndDate.bind(this)}
                          dateFormat='YYYY-MM-DD'
                          timeFormat='HH:mm'
                          value={new Date(this.state.activity.end)}
                />

                <LoaderButton
                    block
                    bsStyle="primary"
                    bsSize="large"
                    disabled={!this.validateForm()}
                    type="submit"
                    isLoading={this.state.isLoading}
                    text="Save"
                    loadingText="Saving…"
                />
                <LoaderButton
                    block
                    bsStyle="danger"
                    bsSize="large"
                    isLoading={this.state.isDeleting}
                    onClick={this.handleDelete}
                    text="Delete"
                    loadingText="Deleting…"
                />
            </form>}
            </div>;
    }
}