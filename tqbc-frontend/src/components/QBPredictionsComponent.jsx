import React, { Component } from 'react';
import TeamService from '../services/TeamService';

class QBSelectorComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
        }
    }

    render() {
        console.log(this.props.team['nickname']);
        return (
            <div>
                {/* <img 
                src={window.location.origin + '/team_logos/' + this.props.team['season'] + '/' + this.props.team.location.replace(" ","") + this.team.props.nickname + '.png'}
                alt={this.props.team.nickname}
                /> */}
                <h1>Hello</h1>
            </div>
        )
    }
}

class QBPredictionsComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            teamID_list : ['T1'],
            teams : {}
        }
    }

    componentDidMount() {
        TeamService.getTeams().then((res) => {
            let _list_ = res.data;
            console.log("_list_");
            console.log(_list_);
            let _dict_ = Object.assign({}, ..._list_.map((x) => ({[x.teamID]: x})));
            console.log("_dict_");
            console.log(_dict_);
            this.setState({ teams : _dict_});
        });
    }

    render() {
        return (
            <div>
                {
                    this.state.teamID_list.map(
                        teamID =>
                        <QBSelectorComponent
                        team={this.state.teams[teamID]}
                        key={teamID}
                        ></QBSelectorComponent>
                    )
                }
            </div>
        )
    }
}

export default QBPredictionsComponent;