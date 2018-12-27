import React, { Component } from 'react';
import ActivityItem from './ActivityItem';
import PropTypes from 'prop-types';

class Activities extends Component {

    render() {
        let activityItems;
        if (this.props.activities){
            console.log(this.props.activities);
            activityItems = this.props.activities.map(activity => {
                return (
                    <ActivityItem key={activity.name} activity={activity}/>
                )
            })
        }

        return (
            <div className="Activities">
                <h3>Tillgängliga aktiviteter</h3>
                {activityItems};
            </div>
        )
    }
}

Activities.propTypes = {
    Activities: PropTypes.array
}

export default Activities;