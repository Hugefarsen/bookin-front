import React, { Component } from 'react';
import PropTypes from "prop-types";

class BookingItem extends Component {

    deleteBooking(id){
        this.props.onDelete(id)
    }

    render() {
        return (
            <li className="Booking">
                {this.props.booking.supervisor} - {this.props.booking.time} - {this.props.booking.date} <a href="#" onClick={this.deleteBooking.bind(this, this.props.booking.id)}>x</a>
            </li>
        );
    }
}


BookingItem.propTypes = {
    booking: PropTypes.object,
    onDelete: PropTypes.func
}

export default BookingItem;