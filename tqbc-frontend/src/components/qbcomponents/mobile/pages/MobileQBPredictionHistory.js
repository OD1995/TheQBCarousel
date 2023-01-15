import React, { useEffect,useState } from 'react';
import QBDisplayer from '../../desktop/components/QBDisplayer';
import TeamService from '../../../../services/TeamService';
import ConferenceService from '../../../../services/ConferenceService'
// import './QBPredictions.css';
import "./MobileQBPredictionHistory.css";
import '../../desktop/pages/QBPredictionHistory.css';
import './MobileQBPredictions.css';
import PeriodPredictionService from '../../../../services/PeriodPredictionService';
import { useParams } from 'react-router-dom';
import History from '../../../../helpers/History';
// import { QBPredictionHistoryRightPanel } from '../components/QBPredictionHistoryRightPanel';
import { TQBCLoading } from '../../../generic/TQBCLoading';
import PlainPageComponent from '../../../generic/PlainPageComponent';
import { MobileUserScoreDisplayer } from '../components/MobileUserScoreDisplayer';
import { SeasonSelector } from '../../desktop/components/SeasonSelector';

const MobileQBPredictionHistory = () => {
    const params = useParams();
    const [allLoaded, setAllLoaded] = useState(false);
    const [noPredictionHistoryAvailable, setNoPredictionHistoryAvailable] = useState(false);
    const [reload, setReload] = useState(false);
    const [teamIDList, setTeamIDList] = useState([]);
    const [conferences, setConferences] = useState([]);
    const [teamIDPeriodPredictionDict, setTeamIDPeriodPredictionDict] = useState("setTeamIDPeriodPredictionDict");
    const [historySeason, setHistorySeason] = useState(0);
    const [userID, setUserID] = useState(0);
    const [uniqueSeasons, setUniqueSeasons] = useState([]);
    const [dtad, setDTAD] = useState({});


    useEffect(
        () => {
            document.title = "Prediction History";
            setAllLoaded(false);
            // If season not in params or season not one of available options,
            //    get max season and redirect to there
            PeriodPredictionService.getUniqueSeasonsAndUserID(params.username).then(
                result => {
                    var history_season;
                    let array_result = result.data
                    // Using .pop() should save the element in user_id and then remove it
                    let user_id = array_result.pop();
                    setUserID(user_id);
                    var unique_seasons = array_result;
                    setUniqueSeasons(unique_seasons);
                    if (
                        (params.season === null) || (!unique_seasons.includes(parseInt(params.season)))
                    ) {
                        PeriodPredictionService.getMaxSeason(params.username).then(
                            result => {
                                history_season = result.data;
                                setHistorySeason(history_season);
                                // setRedirect(true);
                                History.push(`/prediction-history/${params.username}/${history_season}`);
                                setReload(true);
                                // callTeamsService(history_season);
                            }
                        ).catch(
                            (err) => {
                                // No prediction history available for the user
                                setNoPredictionHistoryAvailable(true);
                            }
                        );
                    } else {
                        history_season = parseInt(params.season)
                        setHistorySeason(history_season);
                        callTeamsService(history_season);
                    }

                }
            )
        },
        // [params]
        [reload,params]
    );

    const callTeamsService = (history_season) => {
        TeamService.getSeasonTeams(history_season).then(
            (res) => {
                // division_teamArray_dict -> division("AFC North") : [team]
                let division_teamArray_dict = {};
                let team_id_list = [];
                for (const team_obj of res.data) {
                    team_id_list.push(team_obj.teamID);
                    let division = team_obj.conference + " " + team_obj.division
                    if (division in division_teamArray_dict) {
                        division_teamArray_dict[division].push(team_obj);
                    } else {
                        division_teamArray_dict[division] = [
                            team_obj
                        ];
                    }
                }
                setDTAD(division_teamArray_dict);
                setTeamIDList(team_id_list);
                callConferenceService(history_season);
            }
        )
    }

    const callPeriodPredictionService = (history_season) => {
        PeriodPredictionService.getSeasonPredictions(
            params.username,
            history_season
        ).then(
            (res) => {
                setTeamIDPeriodPredictionDict(res.data);
                setAllLoaded(true);
            }
        )
    }

    const callConferenceService = (history_season) => {
        ConferenceService.getSeasonConferences(history_season).then(
            (res) => {
                setConferences(res.data);
                callPeriodPredictionService(history_season);
            }
        )
    }

    const generatePageContent = () => {
        var return_me = [];
        var directions = ['North','South','East','West'];
        for (const conf of conferences) {
            for (const direction of directions) {
                return_me.push(
                    <div
                        className="mobile-division-prediction-div"
                        id={conf.name + direction}
                        key={conf.name + direction}    
                    >
                        <div className='division-title'>
                            <img
                                className='mobile-conference-logo'
                                src={window.location.origin + '/conference_logos/' + conf.season + '/' + conf.name + '.png' }
                                alt={conf.name}
                                key={conf.name + "-logo"}
                            />
                            <p className='division-text-title'>
                                {direction.toUpperCase()}
                            </p>
                        </div>
                        {
                            dtad[conf.name + " " + direction].map(
                                (teamObj) => {
                                    return (
                                        <QBDisplayer
                                            teamID={teamObj.teamID}
                                            predictions={teamIDPeriodPredictionDict[teamObj.teamID]}
                                            // team={teams[teamObj.teamID]}
                                            key={teamObj.teamID}
                                            // players={players}
                                            // parentStateUpdater={updateParentStateQBSelector}
                                            allLoaded={allLoaded}
                                        />
                                    )
                                }
                            )
                        }
                    </div>
                )
            }
        }
        return return_me;
    }

    if (noPredictionHistoryAvailable) {
        return (
            <PlainPageComponent
                title="No Prediction History Available"
                paragraph={`User '${params.username}' has not made any predictions yet`}
            />
        )
    } else if (allLoaded) {
        return (
            <div>
                <div id="mobile-prediction-history-top-div">
                    <h1 id="mobile-prediction-history-title">
                        {historySeason}
                    </h1>
                    <SeasonSelector
                        uniqueSeasons={uniqueSeasons}
                        currentSeason={historySeason}
                        username={params.username}
                    />
                </div>
                <MobileUserScoreDisplayer
                    userID={userID}
                    season={historySeason}
                />
                {
                    generatePageContent()
                }
            </div>
        )
    } else {
        return <TQBCLoading/>
    }
}

export default MobileQBPredictionHistory;