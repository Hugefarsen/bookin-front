import React, { Component } from 'react';
import SupervisorItem from './SupervisorItem';
import PropTypes from 'prop-types';

class Supervisors extends Component {
    deleteBooking(id){
        this.props.onDelete(id);
    }

    render() {
        let supervisorItems;
        if (this.props.supervisors){
            supervisorItems = this.props.supervisors.map(supervisor => {
                // console.log(booking);
                return (
                    <SupervisorItem onDelete={this.deleteBooking.bind(this)} key={supervisor.title} supervisor={supervisor}/>
                )
            })
        }
        return (
            <div className="Supervisor">
                <h3>SUpervisors</h3>
                {supervisorItems};
            </div>
        );
    }
}

Supervisors.propTypes = {
    supervisors: PropTypes.array,
    onDelete: PropTypes.func
}

export default Supervisors;