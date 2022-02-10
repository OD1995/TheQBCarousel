import React, { Component } from 'react';
import TeamService from '../services/TeamService';
import SelectSearch from 'react-select-search';
import PlayerService from '../services/PlayerService';

class QBSelectorComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
        }
    }

    render() {
        // Data only arrives after `componentDidMount` called in QBPredictionsComponent
        //    so this component should only be rendered once that's happened
        if (typeof this.props.team !== "undefined") {
            let img_src = window.location.origin + '/team_logos/' + this.props.team['season'] + '/' + this.props.team.location.replace(" ","") + this.props.team.nickname + '.png' 
            let options = [
                {name: 'Swedish', value: 'sv'},
                {name: 'English', value: 'en'}
            ]
            return (
                <div>
                    <img 
                    src={img_src}
                    alt={this.props.team.nickname}
                    />
                    <SelectSearch
                    options={options}
                    search
                    // filterOptions={fuzzySearch}
                    />
                </div>
            )
        } else {
            return (
                null
            )
        }
    }
}

class QBPredictionsComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            teamID_list : ['T1'],
            teams : {},
            players : {},
            default_players : {}
        }
    }

    componentDidMount() {
        TeamService.getActiveTeams().then((res) => {
            let _list_ = res.data;
            // Create dict where key is teamID and value is row from `teams`
            let _dict_ = Object.assign({}, ..._list_.map((x) => ({[x.teamID]: x})));
            this.setState({ teams : _dict_});
        });
        PlayerService.getActivePlayers().then((res) => {
            let _list_ = res.data;
            this.setState({ players : _list_});
            // Create dict where key is teamID and value is row of each default QB from `players`
            let _dict_ = Object.assign({}, ..._list_.map((x) => ({[x.defaultTeamID]: x})));
            this.setState({ default_players : _dict_});
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