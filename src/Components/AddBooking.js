import React, { Component } from 'react';
import uuid from 'uuid';
import BookingItem from "./BookingItem";
import PropTypes from "prop-types";


class AddBooking extends Component {
    constructor(){
        super();
        this.state = {
            newBooking:{}
        }
    }

    static defaultProps = {
        supervisor: ['Folke', 'Emilie', 'Kim']
    }

    handleSubmit(e){
        if(this.refs.type.value === ''){
            alert('missing type')
        } else {
            this.setState({newBooking:{
                id: uuid.v4(),
                    supervisor: this.refs.supervisor.value,
                    type: this.refs.type.value,
                    location: this.refs.location.value,
                    time: this.refs.time.value,

                }}, function (){
                this.props.addBooking(this.state.newBooking);


            })
        }
        e.preventDefault();
    }

    render() {
        let supervisors = this.props.supervisor.map(supervisor => {
            return <option key={supervisor} value={supervisor}>{supervisor}</option>
        });
        return (
            <div>
                <h3>Add booking</h3>
                <form onSubmit={this.handleSubmit.bind(this)}>
                    <div>
                        <label>Supervisor</label>

                        <select ref="supervisor">
                            {supervisors}
                        </select>
                    </div>
                    <div>
                        <label>Type</label><br/>
                        <input type="text" ref="type" />
                    </div>
                    <div>
                        <label>Location</label><br/>
                        <input type="text" ref="location" />
                    </div>
                    <div>
                        <label>Time</label><br/>
                        <input type="text" ref="time" />
                    </div>
                    <br />
                    <input type="submit" value="Skicka" />
                    <br />
                </form>
            </div>
        );
    }
}

AddBooking.propTypes = {
    supervisor: PropTypes.array,
    addBooking: PropTypes.func
}

export default AddBooking;