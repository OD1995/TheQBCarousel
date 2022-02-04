import React, { Component } from 'react';
import TeamService from '../services/TeamService';

class QBSelectorComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {

        }
    }

    render() {
        return (
            <div>
                <img 
                src={window.location.origin + '/team_logos/' + team.season + '/' + team.location.replace(" ","") + team.nickname + '.png'}
                />
            </div>
        )
    }
}

class QBPredictionsComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            teamID_list = []
        }
    }

    render() {
        return (
            <div>
            </div>
        )
    }
}