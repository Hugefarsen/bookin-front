import React, { Component } from 'react';
import uuid from 'uuid';
import $ from 'jquery';
import Bookings from './Components/Bookings';
import AddBooking from './Components/AddBooking';
import Supervisors from './Components/Supervisors';

import './App.css';

class App extends Component {
    constructor(){
        super();
        this.state = {
            bookings: [],
            todos: [],
            supervisors: []
        }
    }

    getTodos(){
        $.ajax({
            url: 'https://jsonplaceholder.typicode.com/todos/',
            dataType: 'json',
            cache: false,
            success: function(data){
                this.setState({todos: data}, function(){
                    console.log(data);
                })
            }.bind(this),
            error: function(xhr, status, err){
                console.log(err);
            }
        })
    }

    getBookings(){
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
                },
                {
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

    componentWillMount(){
        this.getBookings();
        this.getTodos();
    }

    componentDidMount(){
        this.getTodos();
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
                <hr />
                <Supervisors supervisors={this.state.supervisors} />
            </div>
        );
    }
}

export default App;
