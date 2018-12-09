import React, { Component } from 'react';
import uuid from 'uuid';
import Bookings from './Components/Bookings';
import AddBooking from './Components/AddBooking';

import './App.css';

class App extends Component {
    constructor(){
        super();
        this.state = {
            bookings: []
        }
    }

    componentWillMount(){
        this.setState({bookings: [
            {
                id: uuid.v4(),
                supervisor: 'Folke',
                type: 'Yoga',
                date: '12/12',
                time: '16.00',
                location: 'Stockholm',
                capacity: '32/32'
            }, {
                    id: uuid.v4(),
                    supervisor: 'Emilie',
                type: 'Spinning',
                date: '12/12',
                time: '13.00',
                location: 'Stockholm',
                capacity: '32/32'
                }, {
                    id: uuid.v4(),
                    supervisor: 'Kim',
                    type: 'Yoga',
                    date: '12/12',
                    time: '12.00',
                    location: 'Stockholm',
                    capacity: '32/32'
                },
            ]})
    }

    handleAddBooking(booking){
        let bookings = this.state.bookings;
        bookings.push(booking);
        this.setState({bookings:bookings})
    }

    handleDeleteBooking(id){
        let bookings = this.state.bookings;
        let index = bookings.findIndex(x => x.id === id);
        bookings.splice(index, 1);
        this.setState({bookings:bookings})
    }

    render() {
        return (
            <div className="App">
                <AddBooking addBooking={this.handleAddBooking.bind(this)}/>
                <Bookings bookings={this.state.bookings} onDelete={this.handleDeleteBooking.bind(this)}/>
            </div>
        );
    }
}

export default App;
