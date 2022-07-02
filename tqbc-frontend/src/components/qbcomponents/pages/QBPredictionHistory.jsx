import React, { useEffect,useState } from 'react';
import QBDisplayer from '../components/QBDisplayer';
import ConferenceService from '../../../services/ConferenceService';
import TeamService from '../../../services/TeamService';
import '../pages/QBPredictions.css';
import PopupComponent from '../../PopUpComponent';
import { useSelector } from 'react-redux';
import PeriodPredictionService from '../../../services/PeriodPredictionService';
import { useParams } from 'react-router-dom';

const QBPredictionHistoryComponent = () => {
    const params = useParams();
    const [allLoaded, setAllLoaded] = useState(false);
    const [teamIDList, setTeamIDList] = useState([]);
    // const [teams, setTeams] = useState("a");
    // const [players, setPlayers] = useState([]);
    const [conferences, setConferences] = useState([]);
    const [teamIDPeriodPredictionDict, setTeamIDPeriodPredictionDict] = useState("setTeamIDPeriodPredictionDict");
    // const [currentDropdownValues, setCurrentDropdownValues] = useState("b");
    // const [truePredictionPeriodID, setTruePredictionPeriodID] = useState("truePredictionPeriodID");
    // const [currentPredictionPeriodID, setCurrentPredictionPeriodID] = useState("currentPredictionPeriodID");
    const [showPopup, setShowPopup] = useState(false);
    const [popupMessage, setPopupMessage] = useState("popupMessage");
    const [popupTitle, setPopupTitle] = useState("popupTitle");
    const [popupSubtitle, setPopupSubtitle] = useState("popupSubtitle");
    // const [uniqueSeasons, setUniqueSeasons] = useState([]);
    // const [uniqueSeasonPeriodIDs, setUniqueSeasonPeriodIDs] = useState([]);
    // const [periodLookup, setPeriodLookup] = useState({});
    // const [showPredictionPeriodChanger, setShowPredictionPeriodChanger] = useState(false);
    // const [trueSeason, setTrueSeason] = useState("trueSeason");
    // const [currentSeason, setCurrentSeason] = useState("currentSeason");
    // const [trueSeasonPeriodID, setTrueSeasonPeriodID] = useState("trueSeasonPeriodID");
    // const [currentSeasonPeriodID, setCurrentSeasonPeriodID] = useState("currentSeasonPeriodID");
    // const [bottomLeftMessage, setBottomLeftMessage] = useState("bottomLeftMessage");
    // const [displayBottomLeftMessage, setDisplayBottomLeftMessage] = useState(false);
    // const [bottomLeftMessageClass, setBottomLeftMessageClass] = useState("bottomLeftMessageClass");
    const { user: currentUser } = useSelector((state) => state.auth);


    useEffect(() => {
        console.log("params");
        console.log(params);
        callTeamsService();

        // PredictionPeriodService
    },[]);

    const callTeamsService = () => {
        TeamService.getActiveTeams().then(
            (res) => {
                // Create dict where key is teamID and value is row from `teams`
                let teams_dict = {};
                // let default_dict = {};
                let team_id_list = [];
                for (const team_obj of res.data) {
                    // console.log(team_obj);
                    // teams_dict[team_obj.teamID] = team_obj;
                    // default_dict[team_obj.defaultPlayer.playerID] = team_obj.teamID;
                    team_id_list.push(team_obj.teamID);
                }
                // setTeams(teams_dict);
                setTeamIDList(team_id_list);
                callConferenceService();
            }
        )
    }

    const callPeriodPredictionService = () => {
        PeriodPredictionService.getMaxSeason(params.username).then(
            (res) => {
                PeriodPredictionService.getPredictions(
                    params.username,
                    res.data
                ).then(
                    (res) => {
                        setTeamIDPeriodPredictionDict(res.data);
                        setAllLoaded(true);
                    }
                )
            }
        )
    }

    const callConferenceService = () => {
        ConferenceService.getActiveConferences().then(
            (res) => {
                setConferences(res.data);
                callPeriodPredictionService();
            }
        )
    }
    if (
        (teamIDList !== [])
    ) {
        return (
            <div className='qb-history-box qb-box'>
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
                    teamIDList.map(
                        teamID => {
                            return (
                                <QBDisplayer
                                    teamID={teamID}
                                    predictions={teamIDPeriodPredictionDict[teamID]}
                                    key={teamID}
                                    allLoaded={allLoaded}
                                ></QBDisplayer>
                            )
                        }
                    )
                }
                {/* <button
                onClick={savePredictions}
                className="tqbc-black-button"
                id="save-button"
                >
                    Save
                </button> */}
                {/* {
                    showPredictionPeriodChanger && (
                        <PredictionPeriodChanger
                            seasons={uniqueSeasons}
                            seasonPeriodIDs={uniqueSeasonPeriodIDs}
                            currentSeason={currentSeason}
                            currentSeasonPeriodID={currentSeasonPeriodID}
                            currentPredictionPeriodID={currentPredictionPeriodID}
                            parentStateUpdater={updateParentStatePredictionPeriodChanger}
                            predictionPeriodIDResetter={resetPredictionPeriodID}
                        />
                    )
                } */}
                {/* {
                    displayBottomLeftMessage && (
                        <h4
                            className={bottomLeftMessageClass}
                            id="bottom-left-message"
                        >
                            {bottomLeftMessage}
                        </h4>
                    )
                } */}
                <PopupComponent
                    trigger={showPopup}
                    setTrigger={setShowPopup}
                    title={popupTitle}
                    subtitle={popupSubtitle}
                    message={popupMessage}
                ></PopupComponent>
            </div>
        )
    } else {
        return null
    }
}

export default QBPredictionHistoryComponent;