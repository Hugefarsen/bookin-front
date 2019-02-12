import React, { Component } from "react";
import {LinkContainer} from "react-router-bootstrap";
import {Button, Glyphicon, Table} from "react-bootstrap";

class ActivityList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            activities: []
        }
    }

    renderActivityOwner(owner){
        return owner.map((row) => {
            return (" " + row.name)
        })
    }


    render() {
        return (

            <Table striped bordered hover>
                <thead>
                <tr>
                    <th>Instruktör</th>
                    <th>Starttid</th>
                    <th>Sluttid</th>
                    <th>Rum</th>
                    <th>Bokade</th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                {this.props.activities.map((row) => {
                    return <LinkContainer
                        key={row.id}
                        to={`/activity/${row.id}`}
                    >

                        <tr>
                            <td>{this.renderActivityOwner(row.owner)}</td>
                            <td>{row.start}</td>
                            <td>{row.end}</td>
                            <td>{row.room.name}</td>
                            <td>{row.users.length + "/" + row.room.size}</td>

                            <td>
                                <Button className="pull-right" bsStyle="danger" id={row.id}
                                        onClick={this.props.handleDeleteActivity}>Ta bort <Glyphicon
                                    glyph="trash"/>
                                </Button>
                            </td>
                        </tr>
                    </LinkContainer>
                })
                }
                </tbody>
            </Table>
        )
    }
}

export default ActivityList;
