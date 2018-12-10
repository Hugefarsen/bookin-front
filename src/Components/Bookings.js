import React, { Component } from 'react';
import BookingItem from './BookingItem';
import PropTypes from 'prop-types';

class Bookings extends Component {
    deleteBooking(id){
        this.props.onDelete(id);
    }

    render() {
        let bookingItems;
        if (this.props.bookings){
            bookingItems = this.props.bookings.map(booking => {
                // console.log(booking);
                return (
                    <BookingItem onDelete={this.deleteBooking.bind(this)} key={booking.id} booking={booking}/>
                )
            })
        }
        return (
            <div className="Bookings">
                <h3>Latest projects</h3>
                {bookingItems};
            </div>
        );
    }
}

Bookings.propTypes = {
    bookings: PropTypes.array,
    onDelete: PropTypes.func
}

export default Bookings;