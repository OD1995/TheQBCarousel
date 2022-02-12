import React, { useState,Component } from 'react';
import Select from 'react-select';
import ConferenceService from '../services/ConferenceService';
import TeamService from '../services/TeamService';
import PlayerService from '../services/PlayerService';
import '../styles/QBPredictionsComponent.css';

const QBSelector = (props) => {
    var so = (typeof props.default_player === 'undefined') ? null : props.default_player;
    const [selectedOption, setSelectedOption] = useState(so);

    if (
        (selectedOption == null)
        &
        (typeof props.default_player !== 'undefined')
    ) {
        setSelectedOption(props.default_player)
    }

    // console.log(props)
    // console.log(selectedOption)
    if (
        (typeof props.team !== "undefined")
        &
        (typeof props.default_player !== "undefined")
        &
        (props.players !== [])
        ) {
        let img_src = window.location.origin + '/team_logos/' + props.team['season'] + '/' + props.team.location.replace(" ","") + props.team.nickname + '.png' 
        let grid_pos = {
            gridRow: props.team.gridRow,
            gridColumn: props.team.gridColumn
        }
        return (
            <div className={'qb_selector_box '+props.team.conference} style={grid_pos}>
                <img 
                src={img_src}
                alt={props.team.nickname}
                className='qb_selector_logo'
                />
                <Select
                defaultValue={selectedOption}
                onChange={setSelectedOption}
                options={props.players}
                isSearchable={true}
                className='qb_selector_select'
                />
            </div>
        )
    } else {
        return null
    }
}

class QBPredictionsComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            teamID_list : ['T1'],
            teams : {},
            players : [],
            default_players : {},
            conferences : []
        }
    }

    componentDidMount() {
        TeamService.getActiveTeams().then((res) => {
            let _list_ = res.data;
            // Create dict where key is teamID and value is row from `teams`
            let _dict_ = Object.assign({}, ..._list_.map((x) => ({[x.teamID]: x})));
            this.setState({ teams : _dict_});
            this.setState({ teamID_list : Object.keys(_dict_)})
        });
        PlayerService.getActivePlayers().then((res) => {
            let players_array = [];
            let default_team_dict = {};
            for (const player_obj of res.data) {
                const dropdown_data = {
                    label : player_obj.name,
                    value : player_obj.playerID
                };
                players_array.push(dropdown_data);
                if (player_obj.defaultTeamID != null) {
                    default_team_dict[player_obj.defaultTeamID] = dropdown_data;
                }
            }
            this.setState({ players : players_array});
            this.setState({ default_players : default_team_dict});
        });
        ConferenceService.getActiveConferences().then((res) => {
            this.setState({ conferences : res.data})
        });
    }

    render() {
        if (
            (this.state.teams !== {})
            &
            (this.state.players !== [])
            &
            (this.state.default_players !== {})
        ) {
            return (
                <div className='qb_predictor_box'>
                    <h1 className='area_title' style={{gridRow:1,gridColumn:2}}>North</h1>
                    <h1 className='area_title' style={{gridRow:1,gridColumn:3}}>East</h1>
                    <h1 className='area_title' style={{gridRow:1,gridColumn:4}}>South</h1>
                    <h1 className='area_title' style={{gridRow:1,gridColumn:5}}>West</h1>
                    {
                        this.state.conferences.map(
                            conf =>
                            <img
                            className='conference_logo'
                            src={window.location.origin + '/conference_logos/' + conf.season + '/' + conf.name + '.png' }
                            alt={conf.name}
                            key={conf.name}
                            style={{gridRowStart:conf.gridRowStart,gridRowEnd:conf.gridRowEnd,gridColumn:conf.gridColumn}}
                            />
                        )
                    }
                    {
                        this.state.teamID_list.map(
                            teamID =>
                            <QBSelector
                            default_player={this.state.default_players[teamID]}
                            teamID={teamID}
                            team={this.state.teams[teamID]}
                            key={teamID}
                            players={this.state.players}
                            ></QBSelector>
                        )
                    }
                </div>
            )
        } else {
            return null
        }
    }
}

export default QBPredictionsComponent;