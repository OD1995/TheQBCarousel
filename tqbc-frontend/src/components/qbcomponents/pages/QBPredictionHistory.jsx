import React, { useEffect,useState } from 'react';
import QBDisplayer from '../components/QBDisplayer';
import ConferenceService from '../../../services/ConferenceService';
import TeamService from '../../../services/TeamService';
import '../pages/QBPredictions.css';
import '../pages/QBPredictionHistory.css';
import PeriodPredictionService from '../../../services/PeriodPredictionService';
import { useParams } from 'react-router-dom';
import History from '../../../helpers/History';
import { QBPredictionHistoryRightPanel } from '../components/QBPredictionHistoryRightPanel';
import { TQBCLoading } from '../../generic/TQBCLoading';
import PlainPageComponent from '../../generic/PlainPageComponent';

const QBPredictionHistoryComponent = () => {
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


    useEffect(
        () => {
            document.title = "Prediction History";
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
        [reload]
    );

    const callTeamsService = (history_season) => {
        TeamService.getSeasonTeams(history_season).then(
            (res) => {
                let team_id_list = [];
                for (const team_obj of res.data) {
                    team_id_list.push(team_obj.teamID);
                }
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
    if (noPredictionHistoryAvailable) {
        return (
            <PlainPageComponent
                title="No Prediction History Available"
                paragraph={`User '${params.username}' has not made any predictions yet`}
            />
        )
    } else if (allLoaded) {
        return (
            <div id="qb-history-container">
                <div className='qb-history-box qb-grid'>
                    <h1 className='area-title' style={{gridRow:1,gridColumn:2}}>NORTH</h1>
                    <h1 className='area-title' style={{gridRow:1,gridColumn:3}}>EAST</h1>
                    <h1 className='area-title' style={{gridRow:1,gridColumn:4}}>SOUTH</h1>
                    <h1 className='area-title' style={{gridRow:1,gridColumn:5}}>WEST</h1>
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
                </div>
                <QBPredictionHistoryRightPanel
                    userID={userID}
                    season={historySeason}
                    uniqueSeasons={uniqueSeasons}
                    // uniqueSeasons={[2022,2023]}
                    username={params.username}
                />
            </div>
        )
    } else {
        return <TQBCLoading/>
    }
}

export default QBPredictionHistoryComponent;