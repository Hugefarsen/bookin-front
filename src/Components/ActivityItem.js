import React , { Component } from 'react';
import PropTypes from 'prop-types';

class ActivityItem extends Component {

    render() {
        return (
            <li className="Activity">
                {this.props.activity.start} - {this.props.activity.end} - {this.props.activity.name} - {this.props.activity.description} - {this.props.activity.owner.name} - {this.props.activity.room.name}
            </li>
        );
    }
}

ActivityItem.propTypes = {
    activity: PropTypes.object,
    onDelete: PropTypes.func
};

export default ActivityItem;