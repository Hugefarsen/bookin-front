import React, {Component, Fragment} from "react";
import { PageHeader } from "react-bootstrap";

import $ from "jquery";


export default class User extends Component {
    constructor(props) {
        super(props);

        this.state = {
            user: {}
        };
    }

    componentWillMount() {
        this.getUser();
    }

    getUser() {
        $.ajax({
            url: 'http://localhost:8888/bookin-api/public/api/user/' + this.props.match.params.id,
            dataType: 'json',
            headers: {
                'Authorization': 'Bearer ' + this.props.user.token,
            },
            cache: false,
            success: function(data){
                this.setState({user: data.data});
            }.bind(this),
            error: function(xhr, status, err){
                console.log(err);
            }
        })
    }

    renderUserInformation(){
        return (
            <Fragment>
                <PageHeader>{this.state.user.name}</PageHeader>
                <p>{this.state.user.email}</p>
                <p>{this.state.user.id}</p>
            </Fragment>
        )
    }

    render() {
        return (
            <div className="user">
                {this.renderUserInformation()}
            </div>
            )
    }
}