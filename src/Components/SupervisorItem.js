import React, { Component } from 'react';
import PropTypes from "prop-types";

class SupervisorItem extends Component {

    deleteBooking(id){
        this.props.onDelete(id)
    }

    render() {
        return (
            <li className="Supervisor">
                {this.props.supervisor.supervisor} - {this.props.supervisor.time} - <a href="#" onClick={this.deleteBooking.bind(this, this.props.supervisor.id)}>x</a>
            </li>
        );
    }
}


SupervisorItem.propTypes = {
    supervisor: PropTypes.object,
    onDelete: PropTypes.func
}

export default SupervisorItem;