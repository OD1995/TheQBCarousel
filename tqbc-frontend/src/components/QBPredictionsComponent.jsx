import React, { useState } from 'react';
import Select from 'react-select';
import ConferenceService from '../services/ConferenceService';
import TeamService from '../services/TeamService';
import PlayerService from '../services/PlayerService';
import '../styles/QBPredictionsComponent.css';
import { useEffect } from 'react';

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

    // const handleChange = (selectedOption) => {
    //     this.setState(
    //         { selectedOption },
    //         props.parentUpdater(props.teamID,selectedOption)
    //     );
    //   };

    const sendToParent = (event) => {
        //here calling Parents changeValue
        props.parentStateUpdater(event,props.teamID);
      };

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
                // defaultValue={selectedOption}
                defaultValue={props.default_player}
                // onChange={setSelectedOption}
                onChange={event => sendToParent(event)}
                options={props.players}
                isSearchable={true}
                className='qb_selector_select'
                id={props.teamID}
                />
            </div>
        )
    } else {
        return null
    }
}

// class QBPredictionsComponent extends Component {
const QBPredictionsComponent = (props) => {
    // constructor(props) {
    //     super(props)

    //     this.state = {
    //         teamID_list : ['T1'],
    //         teams : {},
    //         players : [],
    //         // default_players : {},
    //         conferences : [],
    //         current_dropdown_values : {}
    //     }
    // }
    const [teamIDList, setTeamIDList] = useState([]);
    const [teams, setTeams] = useState({});
    const [players, setPlayers] = useState([]);
    const [conferences, setConferences] = useState([]);
    const [currentDropdownValues, setCurrentDropdownValues] = useState({});

    // componentDidMount() {
    useEffect(() => {
        TeamService.getActiveTeams().then((res) => {
            let _list_ = res.data;
            // Create dict where key is teamID and value is row from `teams`
            let _dict_ = Object.assign({}, ..._list_.map((x) => ({[x.teamID]: x})));
            // this.setState({ teams : _dict_});
            // this.setState({ teamID_list : Object.keys(_dict_)})
            setTeams(_dict_);
            setTeamIDList(Object.keys(_dict_));
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
            // this.setState({ players : players_array});
            // this.setState({ current_dropdown_values : default_team_dict});
            setPlayers(players_array);
            setCurrentDropdownValues(default_team_dict);
        });
        ConferenceService.getActiveConferences().then((res) => {
            // this.setState({ conferences : res.data})
            setConferences(res.data);
        });
    },[]);

    const updateParentState = (event, teamID) => {
        let cdv = { ...currentDropdownValues }
        console.log(teamID);
        console.log(event);
        cdv[teamID] = event;
        setCurrentDropdownValues(cdv);
    };

    const savePredictions = () => {
        // Make sure no QB has been chosen for two teams
        let selections = {};
        console.log(currentDropdownValues);
        let msg = "All OK";
        const txt = " will be the QB of multiple teams. Unfortunately, this is not possible. Please adjust and save again.";
        // for (const prediction of currentDropdownValues) {
        for (const [teamID, prediction] of Object.entries(currentDropdownValues)) {
            // console.log("selections");
            // console.log(selections);
            // console.log("entry");
            // console.log(teamID);
            // console.log(prediction);
            if (prediction.value in selections) {
                const t2 = selections[prediction.value];
                msg = "You have predicted that " + prediction.label + txt + "("+teamID+","+t2+")";
                break;
            } else {
                selections[prediction.value] = teamID;
            }
        }
        document.getElementById("msg").innerText = msg;
    };

    // render() {
    if (
        (teams !== {})
        &
        (players !== [])
        &
        (currentDropdownValues !== {})
    ) {
        return (
            <div className='qb_predictor_box'>
                <h1 className='area_title' style={{gridRow:1,gridColumn:2}}>North</h1>
                <h1 className='area_title' style={{gridRow:1,gridColumn:3}}>East</h1>
                <h1 className='area_title' style={{gridRow:1,gridColumn:4}}>South</h1>
                <h1 className='area_title' style={{gridRow:1,gridColumn:5}}>West</h1>
                {
                    // this.state.conferences.map(
                    conferences.map(
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
                    // this.state.teamID_list.map(
                    teamIDList.map(
                        teamID =>
                        <QBSelector
                        // default_player={this.state.current_dropdown_values[teamID]}
                        default_player={currentDropdownValues[teamID]}
                        teamID={teamID}
                        // team={this.state.teams[teamID]}
                        team={teams[teamID]}
                        key={teamID}
                        // players={this.state.players}
                        players={players}
                        parentStateUpdater={updateParentState}
                        ></QBSelector>
                    )
                }
                <button
                onClick={savePredictions}
                style={{gridRow:10,gridColumnStart:3,gridColumnEnd:5}}
                >
                    Save
                </button>
                <p
                id="msg"
                style={{gridRow:11,gridColumnStart:1,gridColumnEnd:6}}
                >Ignore Me</p>
            </div>
        )
    } else {
        return null
    }
    // }
}



export default QBPredictionsComponent;