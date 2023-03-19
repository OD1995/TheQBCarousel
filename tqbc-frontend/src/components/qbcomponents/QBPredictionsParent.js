import React, { useEffect,useState } from 'react';
import { useSelector } from 'react-redux';

import QBSelector from '../components/QBSelector';
import PredictionPeriodChanger from '../../../PredictionPeriodChanger';
import { PopupComponent } from '../../../generic/PopUpComponent';

import ConferenceService from '../../../../services/ConferenceService';
import TeamService from '../../../../services/TeamService';
import PlayerService from '../../../../services/PlayerService';
import PredictionPeriodService from '../../../../services/PredictionPeriodService';

import { postPredictions } from '../../../../actions/predictions';

import './QBPredictions.css';
import './QBPage.css';
import PeriodPredictionService from '../../../../services/PeriodPredictionService';
import { OutsidePredictionPeriod } from '../../../errors/OutsidePredictionPeriod';
import { SocialMediaRequest } from '../components/SocialMediaRequest';
import TokenService from '../../../../services/Token.service';
import History from '../../../../helpers/History';
import { TQBCLoading } from '../../../generic/TQBCLoading';

const QBPredictions = (props) => {
    // const [teamIDList, setTeamIDList] = useState([]);
    const [teams, setTeams] = useState("a");
    const [players, setPlayers] = useState([]);
    const [conferences, setConferences] = useState([]);
    const [currentDropdownValues, setCurrentDropdownValues] = useState("b");
    // Actual prediction period, can be null, isn't changed after set
    const [truePredictionPeriodID, setTruePredictionPeriodID] = useState("truePredictionPeriodID");
    // Potentially fake prediction period
    const [currentPredictionPeriodID, setCurrentPredictionPeriodID] = useState("currentPredictionPeriodID");
    const [showPopup, setShowPopup] = useState(false);
    const [popupMessage, setPopupMessage] = useState("popupMessage");
    const [popupTitle, setPopupTitle] = useState("popupTitle");
    const [popupSubtitle, setPopupSubtitle] = useState("popupSubtitle");
    const [uniqueSeasons, setUniqueSeasons] = useState([]);
    const [uniqueSeasonPeriodIDs, setUniqueSeasonPeriodIDs] = useState([]);
    const [periodLookup, setPeriodLookup] = useState({});
    const [showPredictionPeriodChanger, setShowPredictionPeriodChanger] = useState(false);
    const [trueSeason, setTrueSeason] = useState("trueSeason");
    const [currentSeason, setCurrentSeason] = useState("currentSeason");
    const [trueSeasonPeriodID, setTrueSeasonPeriodID] = useState("trueSeasonPeriodID");
    const [currentSeasonPeriodID, setCurrentSeasonPeriodID] = useState("currentSeasonPeriodID");
    const [bottomMessage, setBottomMessage] = useState("");
    const [displayBottomMessage, setDisplayBottomMessage] = useState(false);
    const [bottomMessageColour, setBottomMessageColour] = useState("black");
    const { user: currentUser } = useSelector((state) => state.auth);
    const [outsidePredictionPeriod, setOutsidePredictionPeriod] = useState(false);
    const [disableButton, setDisableButton] = useState(false);


    useEffect(() => {
        let user = TokenService.getUser();
        if (user === null) {
            History.push("/login");
        } else {
            document.title = 'Prediction Board'
            callTeamsService();
        }

        // PredictionPeriodService
    },[]);

    const callTeamsService = () => {
        TeamService.getActiveTeams().then(
            (res) => {
                // team_dict -> teamID : Team
                let teams_dict = {};
                // defaultPlayerID_teamID_dict -> playerID : teamID (team which player is default player of)
                let defaultPlayerID_teamID_dict = {};
                for (const team_obj of res.data) {
                    teams_dict[team_obj.teamID] = team_obj;
                    defaultPlayerID_teamID_dict[team_obj.defaultPlayer.playerID] = team_obj.teamID;
                }
                setTeams(teams_dict);
                callPlayerService(defaultPlayerID_teamID_dict);
            }
        )
    }

    const callPlayerService = (defaultPlayerID_teamID_dict) => {
        PlayerService.getActivePlayers().then(
            (res) => {
                let players_array = [];
                // teamID_dropdownPlayer_dict -> teamID : dropdown player object
                let teamID_dropdownPlayer_dict = {};
                for (const player_obj of res.data) {
                    const dropdown_data = {
                        label : player_obj.name,
                        value : player_obj.playerID
                    };
                    players_array.push(dropdown_data);
                    if (player_obj.playerID in defaultPlayerID_teamID_dict) {
                        teamID_dropdownPlayer_dict[defaultPlayerID_teamID_dict[player_obj.playerID]] = dropdown_data
                    }
                }
                setPlayers(players_array);
                // callPeriodPredictionService(teamID_dropdownPlayer_dict);
                callConferenceService(teamID_dropdownPlayer_dict);
            }
        )
    }

    const callPeriodPredictionService = (
        teamID_dropdownPlayer_dict,
        current_prediction_period_ID
    ) => {
        PeriodPredictionService.getPredictionPeriodPredictions(
            currentUser.userID,
            current_prediction_period_ID
        ).then(
            (res) => {
                for (const periodPrediction of res.data) {
                    teamID_dropdownPlayer_dict[periodPrediction.team.teamID] = {
                        label: periodPrediction.player.name,
                        value: periodPrediction.player.playerID
                    }
                }
                setCurrentDropdownValues(teamID_dropdownPlayer_dict);
                callPredictionPeriodService2(current_prediction_period_ID);
            }
        )
    }

    const callConferenceService = (teamID_dropdownPlayer_dict) => {
        ConferenceService.getActiveConferences().then(
            (res) => {
                setConferences(res.data);
                callPredictionPeriodService1(teamID_dropdownPlayer_dict);
            }
        )
    }

    const callPredictionPeriodService1 = (teamID_dropdownPlayer_dict) => {
        PredictionPeriodService.getCurrentPredictionPeriodID().then(
            (res) => {
                // Deal with null and use setCurrentPredictionPeriodID
                let current_prediction_period_ID = res.data;
                if (current_prediction_period_ID === null) {
                    setOutsidePredictionPeriod(true);
                } else {
                    setCurrentPredictionPeriodID(current_prediction_period_ID);
                    setTruePredictionPeriodID(current_prediction_period_ID);
                    callPeriodPredictionService(teamID_dropdownPlayer_dict,current_prediction_period_ID);
                }
            }
        );
    }

    const callPredictionPeriodService2 = (current_prediction_period_ID) => {
        if (currentUser.roles.includes("ROLE_TESTER")) {
            // setShowPredictionPeriodChanger(true);
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
                        if (ppID === current_prediction_period_ID) {
                            setCurrentSeason(ssn);
                            setTrueSeason(ssn);
                            setCurrentSeasonPeriodID(spID);
                            setTrueSeasonPeriodID(spID);
                        }
                        period_lookup[ssn + "---" + spID] = predictionPeriod.predictionPeriodID;
                    }
                    setUniqueSeasons(unique_season_dicts);
                    setUniqueSeasonPeriodIDs(unique_season_period_IDs_dicts);
                    setPeriodLookup(period_lookup);
                    if (currentSeasonPeriodID === "currentSeasonPeriodID") {
                        setCurrentSeasonPeriodID(null);
                    }
                }
            )
        } else {
            setCurrentSeasonPeriodID(null);
        }
    }

    const resetPredictionPeriodID = () => {
        setCurrentPredictionPeriodID(truePredictionPeriodID);
        setCurrentSeason(trueSeason);
        setCurrentSeasonPeriodID(trueSeasonPeriodID);
    }

    const updateParentStateQBSelector = (event, teamID) => {
        let cdv = { ...currentDropdownValues }
        cdv[teamID] = event;
        setCurrentDropdownValues(cdv);
    };

    const updateParentStatePredictionPeriodChanger = (comboID) => {
        let newPredictionPeriodID = periodLookup[comboID];
        console.log("newPredictionPeriodID: " + newPredictionPeriodID);
        setCurrentPredictionPeriodID(newPredictionPeriodID);
    }

    const sleep = (ms) => {
        return new Promise((resolve) => setTimeout(resolve, ms));
    }

    const showAndHideBottomMessage = async () => {
        // Not needed anymore because "Loading.." already displayed
        // // Display message, wait 3 secs, hide message
        // setDisplayBottomMessage(true);
        // console.log("about to sleep");
        await sleep(3*1000);
        setDisplayBottomMessage(false);
    }

    const savePredictions = () => {
        setDisableButton(true);
        savePredictionsInner().then(
            (res) => {
                setDisableButton(false);
            },
            (err) => {
                console.log(err);
                setDisableButton(false);
            }
        )
    }

    async function savePredictionsInner() {
        // await sleep(3*1000);
        // Make sure no QB has been chosen for two teams
        let selectionsDict = {};
        let selectionsArray = [];
        let msg = "All OK";
        const txt = "</b> will be the QB of multiple teams. Unfortunately, this is not possible. Please adjust and save again.";
        for (const [teamID, prediction] of Object.entries(currentDropdownValues)) {
            if (prediction.value in selectionsDict) {
                msg = "You have predicted that <b>" + prediction.label + txt;
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
            setBottomMessage("Loading..");
            setBottomMessageColour("black");
            setDisplayBottomMessage(true);
            postPredictions(
                currentPredictionPeriodID,
                currentUser.userID,
                selectionsArray
            ).then(
                (res) => {
                    setBottomMessageColour("green");
                    setBottomMessage("Success!");
                    showAndHideBottomMessage();
                }
            ).catch(
                (error) => {
                    var popup_title, popup_message
                    var popup_subtitle = "Please try again, if the error continues, tweet ";
                    popup_subtitle += '<a href="https://www.twitter.com/TheQBCarousel"  target="_blank">@TheQBCarousel</a>';
                    if (error.response) {
                        // The request was made and the server responded with a status code
                        // that falls out of the range of 2xx
                        console.log(error.response.data);
                        console.log(error.response.status);
                        console.log(error.response.headers);
                        popup_title = "Response Error";
                        popup_message = error.response.data.message;
                    } else if (error.request) {
                        // The request was made but no response was received
                        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                        // http.ClientRequest in node.js
                        console.log(error.request);
                        popup_title = "Request Error";
                        popup_message = "The request was made but no response was received";
                    } else {
                        // Something happened in setting up the request that triggered an Error
                        console.log('Error', error.message);
                        popup_title = "Error";
                        popup_message = "Something happened in setting up the request that triggered an error";
                    }
                    console.log(error.config);
                    setPopupTitle(popup_title);
                    setPopupSubtitle(popup_subtitle);
                    setPopupMessage(popup_message);
                    setShowPopup(true);
                }
            );
            console.log("predictions posted");
        } else {
            // Open pop up to display `msg`
            setPopupTitle("Same QB chosen for more than one team");
            setPopupMessage(msg);
            setShowPopup(true);
        }
    };

    if (outsidePredictionPeriod) {
        return (
            <OutsidePredictionPeriod/>
        );
    } else if (
        (currentSeasonPeriodID !== "currentSeasonPeriodID")
    ) {
        return (
            <props.QBPredictionsDeviceComponent
                conferences={conferences}
                currentDropdownValues={currentDropdownValues}
                teams={teams}
                players={players}
                updateParentStateQBSelector={updateParentStateQBSelector}
                disableButton={disableButton}
                savePredictions={savePredictions}
                displayBottomMessage={displayBottomMessage}
                bottomMessageColour={bottomMessageColour}
                bottomMessage={bottomMessage}
                showPredictionPeriodChanger={showPredictionPeriodChanger}
                uniqueSeasons={uniqueSeasons}
                uniqueSeasonPeriodIDs={uniqueSeasonPeriodIDs}
                currentSeason={currentSeason}
                currentSeasonPeriodID={currentSeasonPeriodID}
                currentPredictionPeriodID={currentPredictionPeriodID}
                updateParentStatePredictionPeriodChanger={updateParentStatePredictionPeriodChanger}
                resetPredictionPeriodID={resetPredictionPeriodID}
                showPopup={showPopup}
                setShowPopup={setShowPopup}
                popupTitle={popupTitle}
                popupSubtitle={popupSubtitle}
                popupMessage={popupMessage}
            />
        )
    } else {
        return <TQBCLoading/>
    }
}