import React, { useEffect,useState } from 'react';
import Select from 'react-select';
import ConferenceService from '../services/ConferenceService';
import TeamService from '../services/TeamService';
import PlayerService from '../services/PlayerService';
import PredictionPeriodService from '../services/PredictionPeriodService';
import '../styles/QBPredictionsComponent.css';
import Popup from './PopUpComponent';
import { postPredictions } from '../actions/predictions';
import { useSelector } from 'react-redux';

const PredictionPeriodChanger = (props) => {

    const sendSeasonToParent = (event) => {
        console.log("season: " + event.value);
    }

    const sendSeasonPeriodToParent = (event) => {
        console.log("season: " + event.value);
    }

    const savePredictionPeriod = () => {
        console.log("a");
    }

    return (
        <div
            id="prediction-period-changer"
            style={{gridRow:10,gridColumnStart:1,gridColumnEnd:4}}
        >
            <h6
                style={{gridColumn:1}}
                className="prediction-period-changer-text"
            >Season</h6>
            <Select
                style={{gridColumn:2}}
                defaultValue={props.currentSeason}
                onChange={event => sendSeasonToParent(event)}
                options={props.seasons}
                // isSearchable={true}
                className='prediction-period-changer-selecter'
                id="prediction-period-changer-selecter-season"
            />
            <h6
                style={{gridColumn:3}}
                className="prediction-period-changer-text"
            >Season Period</h6>
            <Select
                style={{gridColumn:4}}
                defaultValue={props.currentSeasonPeriodID}
                onChange={event => sendSeasonPeriodToParent(event)}
                options={props.seasonPeriodIDs}
                // isSearchable={true}
                className='prediction-period-changer-selecter'
                id="prediction-period-changer-selecter-seasonPeriodID"
            />
            <button
                style={{gridColumn:5}}
                onClick={savePredictions}
                className="tqbc-black-button"
                id="prediction-period-changer-button"
            >
            Update
            </button>
            <h3
                style={{gridColumn:6}}
                className="prediction-period-changer-text"
            >
            {"Current PredictionPeriod: " + currentPredictionPeriodID}
            </h3>
        </div>
    )
}

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
    const [teams, setTeams] = useState("a");
    const [players, setPlayers] = useState([]);
    const [conferences, setConferences] = useState([]);
    const [currentDropdownValues, setCurrentDropdownValues] = useState("b");
    const [currentPredictionPeriodID, setCurrentPredictionPeriodID] = useState("c");
    const [showPopup, setShowPopup] = useState(false);
    const [popupMessage, setPopupMessage] = useState("");
    const [uniqueSeasons, setUniqueSeasons] = useState([]);
    const [uniqueSeasonPeriodIDs, setUniqueSeasonPeriodIDs] = useState([]);
    const [periodLookup, setPeriodLookup] = useState({});
    const [showPredictionPeriodChanger, setShowPredictionPeriodChanger] = useState(false);
    const [currentSeason, setCurrentSeason] = useState(null);
    const [currentSeasonPeriodID, setCurrentSeasonPeriodID] = useState(null);
    const { user: currentUser } = useSelector((state) => state.auth);


    useEffect(() => {
        callTeamsService();

        // PredictionPeriodService
    },[]);

    const callTeamsService = () => {
        TeamService.getActiveTeams().then(
            (res) => {
                // Create dict where key is teamID and value is row from `teams`
                let teams_dict = {};
                let default_dict = {};
                let team_id_list = [];
                for (const team_obj of res.data) {
                    // console.log(team_obj);
                    teams_dict[team_obj.teamID] = team_obj;
                    default_dict[team_obj.defaultPlayer.playerID] = team_obj.teamID;
                    team_id_list.push(team_obj.teamID);
                }
                setTeams(teams_dict);
                setTeamIDList(team_id_list);
                callPlayerService(default_dict);
            }
        )
    }

    const callPlayerService = (defaultDict) => {
        PlayerService.getActivePlayers().then(
            (res) => {
                let players_array = [];
                let default_team_dict = {};
                for (const player_obj of res.data) {
                    const dropdown_data = {
                        label : player_obj.name,
                        value : player_obj.playerID
                    };
                    players_array.push(dropdown_data);
                    // if (player_obj.defaultTeamID != null) {
                    //     default_team_dict[player_obj.defaultTeamID] = dropdown_data;
                    // }
                    if (player_obj.playerID in defaultDict) {
                        default_team_dict[defaultDict[player_obj.playerID]] = dropdown_data
                    }
                }
                setPlayers(players_array);
                setCurrentDropdownValues(default_team_dict);
                callConferenceService();
            }
        )
    }

    const callConferenceService = () => {
        ConferenceService.getActiveConferences().then(
            (res) => {
                setConferences(res.data);
                callPredictionPeriodService();
            }
        )
    }

    const callPredictionPeriodService = () => {
        PredictionPeriodService.getCurrentPredictionPeriodID().then(
            (res) => {
                // Deal with null and use setCurrentPredictionPeriodID
                setCurrentPredictionPeriodID(res.data);
            }
        );
        if (currentUser.roles.includes("ROLE_TESTER")) {
            setShowPredictionPeriodChanger(true);
            PredictionPeriodService.getActivePredictionPeriods().then(
                (res) => {
                    let unique_seasons = [];
                    let unique_season_dicts = [];
                    let unique_season_period_IDs = [];
                    let unique_season_period_IDs_dicts = [];
                    let period_lookup = {};
                    for (const predictionPeriod of res.data) {
                        let ssn = predictionPeriod.season;
                        let spID = predictionPeriod.seasonPeriodID;
                        let ppID = predictionPeriod.predictionPeriodID;
                        if (! unique_seasons.includes(ssn)) {
                            unique_seasons.push(ssn);
                            unique_season_dicts.push(
                                {
                                    label: ssn,
                                    value: ssn
                                }
                            );
                        }
                        if (! unique_season_period_IDs.includes(spID)) {
                            unique_season_period_IDs.push(spID);
                            unique_season_period_IDs_dicts.push(
                                {
                                    label: spID,
                                    value: spID
                                }
                            );
                        }
                        if (ppID === currentPredictionPeriodID) {
                            setCurrentSeason(ssn);
                            setCurrentSeasonPeriodID(spID);
                        }
                        period_lookup[ssn + "---" + spID] = predictionPeriod.predictionPeriodID;
                    }
                    setUniqueSeasons(unique_season_dicts);
                    setUniqueSeasonPeriodIDs(unique_season_period_IDs_dicts);
                    setPeriodLookup(period_lookup);
                }
            )
        }
    }

    const updateParentState = (event, teamID) => {
        let cdv = { ...currentDropdownValues }
        cdv[teamID] = event;
        setCurrentDropdownValues(cdv);
    };

    const savePredictions = () => {
        // Make sure no QB has been chosen for two teams
        let selectionsDict = {};
        let selectionsArray = [];
        let msg = "All OK";
        const txt = "</b> will be the QB of multiple teams. Unfortunately, this is not possible. Please adjust and save again.";
        for (const [teamID, prediction] of Object.entries(currentDropdownValues)) {
            if (prediction.value in selectionsDict) {
                msg = "You have predicted that <b>" + prediction.label + txt;
                // console.log(msg);
                break;
            } else {
                selectionsDict[prediction.value] = teamID;
                selectionsArray.push(
                    {
                        teamID: Number(teamID),
                        playerID: prediction.value
                    }
                );
            }
        }
        if (msg === "All OK") {
            // Post dropdown values to backend
            // console.log(selectionsArray);
            // console.log(currentUser.userID);
            postPredictions(
                currentPredictionPeriodID,
                currentUser.userID,
                selectionsArray
            );
            // console.log("postPredictions run");
        } else {
            // Open pop up to display `msg`
            setPopupMessage(msg);
            setShowPopup(true);
        }
    };

    if (
        (teams !== "a")
        &
        (players !== [])
        &
        (currentDropdownValues !== {})
    ) {
        return (
            <div className='qb_predictor_box'>
                <h1 className='area_title' style={{gridRow:1,gridColumn:2}}>NORTH</h1>
                <h1 className='area_title' style={{gridRow:1,gridColumn:3}}>EAST</h1>
                <h1 className='area_title' style={{gridRow:1,gridColumn:4}}>SOUTH</h1>
                <h1 className='area_title' style={{gridRow:1,gridColumn:5}}>WEST</h1>
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
                    Object.keys(currentDropdownValues).map(
                        function(teamID) {
                            let defaultPlayerID = currentDropdownValues[teamID];
                            return (
                                <QBSelector
                                    default_player={defaultPlayerID}
                                    teamID={teamID}
                                    team={teams[teamID]}
                                    key={teamID}
                                    players={players}
                                    parentStateUpdater={updateParentState}
                                ></QBSelector>
                            )
                        }
                    )
                }
                <button
                onClick={savePredictions}
                className="tqbc-black-button"
                id="save-button"
                >
                    Save
                </button>
                {
                    showPredictionPeriodChanger && (
                        <PredictionPeriodChanger
                            seasons={uniqueSeasons}
                            seasonPeriodIDs={uniqueSeasonPeriodIDs}
                            currentSeason={currentSeason}
                            currentSeasonPeriodID={currentSeasonPeriodID}
                        />
                    )
                }
                {/* <p
                id="msg"
                style={{gridRow:11,gridColumnStart:1,gridColumnEnd:6}}
                >Ignore Me</p> */}
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