import React, { Component } from 'react';
import $ from 'jquery';
import Activities from "./Components/Activities";

import './App.css';

class App extends Component {
    constructor(){
        super();
        this.state = {
            activities: [],
        }
    }

    getActivities(){
        $.ajax({
            url: 'http://localhost:8888/bookin-api/public/api/activity',
            dataType: 'json',
            cache: false,
            success: function(data){
                this.setState({activities: data.data}, function(){
                    console.log(this.state);
                    console.log(this.state.activities);
                })
            }.bind(this),
            error: function(xhr, status, err){
                console.log(err);
            }
        })
    }


    componentWillMount(){
        this.getActivities()
    }

    componentDidMount(){
        this.getActivities();
    }

    render() {
        return (
            <div className="App">
                <Activities activities={this.state.activities} />
                <hr />
            </div>
        );
    }
}

export default App;
