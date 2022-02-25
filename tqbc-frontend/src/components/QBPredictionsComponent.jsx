import React, { useEffect,useState } from 'react';
import Select from 'react-select';
import ConferenceService from '../services/ConferenceService';
import TeamService from '../services/TeamService';
import PlayerService from '../services/PlayerService';
import '../styles/QBPredictionsComponent.css';
import Popup from './PopUpComponent';


const QBSelector = (props) => {

    const sendToParent = (event) => {
        //here calling Parents changeValue
        props.parentStateUpdater(event,props.teamID);
      };

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
                defaultValue={props.default_player}
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

const QBPredictionsComponent = () => {
    const [teamIDList, setTeamIDList] = useState([]);
    const [teams, setTeams] = useState({});
    const [players, setPlayers] = useState([]);
    const [conferences, setConferences] = useState([]);
    const [currentDropdownValues, setCurrentDropdownValues] = useState({});
    const [showPopup, setShowPopup] = useState(false);
    const [popupMessage, setPopupMessage] = useState("You have predicted that Kyler Murray will be the QB of multiple teams. Unfortunately, this is not possible. Please adjust and save again.");

    useEffect(() => {
        TeamService.getActiveTeams().then((res) => {
            let _list_ = res.data;
            // Create dict where key is teamID and value is row from `teams`
            let _dict_ = Object.assign({}, ..._list_.map((x) => ({[x.teamID]: x})));
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
            setPlayers(players_array);
            setCurrentDropdownValues(default_team_dict);
        });
        ConferenceService.getActiveConferences().then((res) => {
            setConferences(res.data);
        });
    },[]);

    const updateParentState = (event, teamID) => {
        let cdv = { ...currentDropdownValues }
        // console.log(teamID);
        // console.log(event);
        cdv[teamID] = event;
        setCurrentDropdownValues(cdv);
    };

    const savePredictions = () => {
        // Make sure no QB has been chosen for two teams
        let selections = {};
        // console.log(currentDropdownValues);
        let msg = "All OK";
        const txt = "</b> will be the QB of multiple teams. Unfortunately, this is not possible. Please adjust and save again.";
        for (const [teamID, prediction] of Object.entries(currentDropdownValues)) {
            if (prediction.value in selections) {
                msg = "You have predicted that <b>" + prediction.label + txt;
                console.log(msg);
                break;
            } else {
                selections[prediction.value] = teamID;
            }
        }
        if (msg === "All OK") {
            // Post dropdown values to backend
        } else {
            // Open pop up to display `msg`
            setPopupMessage(msg);
            setShowPopup(true);
        }
    };

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
                    teamIDList.map(
                        teamID =>
                        <QBSelector
                        default_player={currentDropdownValues[teamID]}
                        teamID={teamID}
                        team={teams[teamID]}
                        key={teamID}
                        players={players}
                        parentStateUpdater={updateParentState}
                        ></QBSelector>
                    )
                }
                <button
                onClick={savePredictions}
                class="tqbc-black-button"
                id="save-button"
                >
                    Save
                </button>
                <p
                id="msg"
                style={{gridRow:11,gridColumnStart:1,gridColumnEnd:6}}
                >Ignore Me</p>
                <Popup
                trigger={showPopup}
                setTrigger={setShowPopup}
                message={popupMessage}
                ></Popup>
            </div>
        )
    } else {
        return null
    }
}



export default QBPredictionsComponent;