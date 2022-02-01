import React, { Component } from 'react';
import TeamService from '../services/TeamService';

class ListTeamComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            teams : []
        }
    }

    componentDidMount() {
        TeamService.getTeams().then((res) => {
            this.setState({ teams : res.data});
        });
    }

    render() {
        return (
            <div>
                <h2 className="text-center">Team List</h2>
                <div className="row">
                    <table className="table table-striped table-bordered">
                        <thead>
                            <tr>
                                <th>TeamID</th>
                                <th>Location</th>
                                <th>Nickname</th>
                                <th>Conference</th>
                                <th>Division</th>
                                <th>Logo</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.teams.map(
                                    team =>
                                    <tr key={team.teamID}>
                                        <td>{team.teamID}</td>
                                        <td>{team.location}</td>
                                        <td>{team.nickname}</td>
                                        <td>{team.conference}</td>
                                        <td>{team.division}</td>
                                        <td>
                                            <img
                                            src={window.location.origin + '/team_logos/' + team.season + '/' + team.location.replace(" ","") + team.nickname + '.png'}
                                            />
                                        </td>
                                    </tr>
                                )
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

export default ListTeamComponent;