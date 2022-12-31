import React, { useEffect,useState } from 'react';
import QBDisplayer from '../components/QBDisplayer';
import ConferenceService from '../../../services/ConferenceService';
import TeamService from '../../../services/TeamService';
import '../pages/QBPredictions.css';
import '../pages/QBPredictionHistory.css';
// import { PopupComponent } from '../../generic/PopUpComponent';
// import { useSelector } from 'react-redux';
import PeriodPredictionService from '../../../services/PeriodPredictionService';
import { useParams } from 'react-router-dom';
import History from '../../../helpers/History';
import { QBPredictionHistoryRightPanel } from '../components/QBPredictionHistoryRightPanel';
// import PredictionPeriodService from '../../../services/PredictionPeriodService';

const QBPredictionHistoryComponent = () => {
    const params = useParams();
    const [allLoaded, setAllLoaded] = useState(false);
    const [teamIDList, setTeamIDList] = useState([]);
    const [conferences, setConferences] = useState([]);
    const [teamIDPeriodPredictionDict, setTeamIDPeriodPredictionDict] = useState("setTeamIDPeriodPredictionDict");
    const [historySeason, setHistorySeason] = useState(0);
    const [userID, setUserID] = useState(0);
    const [uniqueSeasons, setUniqueSeasons] = useState([]);


    useEffect(
        () => {
            document.title = "Prediction History";
            setAllLoaded(false);
            // If season not in params or season not one of available options, get max season and redirect to there
            setUserID(JSON.parse(localStorage.getItem("user")).userID);
            PeriodPredictionService.getUniqueSeasons(params.username).then(
                result => {
                    var history_season;
                    // var options = [2022];
                    var unique_seasons = result.data;
                    setUniqueSeasons(unique_seasons);
                    if (
                        (params.season === null) || (!unique_seasons.includes(parseInt(params.season)))
                    ) {
                        PeriodPredictionService.getMaxSeason(params.username).then(
                            result => {
                                history_season = result.data;
                                setHistorySeason(history_season);
                                History.push(`/prediction-history/${params.username}/${history_season}`);
                                callTeamsService(history_season);
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
        [params]
    );

    const callTeamsService = (history_season) => {
        TeamService.getSeasonTeams(history_season).then(
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
    if (
        allLoaded
    ) {
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
        return null
    }
}

export default QBPredictionHistoryComponent;