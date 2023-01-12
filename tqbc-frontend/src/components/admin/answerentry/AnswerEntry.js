import React from "react"
import { AnswerEntryTable } from "./AnswerEntryTable"
import './AnswerEntry.css';
import { useState } from "react";
import { AnswerEntryModal } from "./AnswerEntryModal";
import { useEffect } from "react";
import AnswerTypeService from "../../../services/AnswerTypeService";
import { useParams } from "react-router-dom";
import PlayerService from "../../../services/PlayerService";
import TeamService from "../../../services/TeamService";
import AnswerService from "../../../services/AnswerService";
import { useRef } from "react";
import { useImmer } from "use-immer";
import History from "../../../helpers/History";
import TokenService from "../../../services/Token.service";
import { TQBCLoading } from "../../generic/TQBCLoading";

export const AnswerEntry = () => {

    // Make sure user is admin user

    
    const [showModal, setShowModal] = useState(false);
    const [cellTeam, setCellTeam] = useState(null);
    const [cellTeamID, setCellTeamID] = useState(null);
    const [cellType, setCellType] = useState(null);
    const [answerTypes, setAnswerTypes] = useState({});
    const [players, setPlayers] = useState([]);
    const [playerLookup,setPlayerLookup] = useState({});
    const [currentAnswerIDs, setCurrentAnswerIDs] = useState([]);
    const [modalConference, setModalConference] = useState(null);
    const [conferenceData, setConferenceData] = useImmer({});
    const [conferenceDones, setConferenceDones] = useState({});

    const stateRef = useRef();

    stateRef.current = {
        conferenceData: conferenceData,
        conferenceDones: conferenceDones
    }

    const params = useParams();
    
    const revealModal = (team,teamID,type,pIDs,conference) => {
        setCellTeam(team);
        setCellTeamID(teamID);
        setCellType(type);
        setCurrentAnswerIDs(pIDs);
        setModalConference(conference);
        setShowModal(true);
    }

    const pushDataToParent = (conference,teamID,answerIDs,answerNames,answerTypeID) => {
        let newKey = `${teamID},${answerTypeID}`;
        setConferenceData(
            oldConferenceData => {
                oldConferenceData[conference].answers[newKey] = {
                    names: answerNames,
                    ids: answerIDs
                }
            }
        );
    }

    const generateConferenceData = (conference,setDataCallback,setDoneCallback) => {
        TeamService.getSeasonConferenceTeams(params.season,conference).then(
            (res) => {
                let teams_obj = {};
                for (const team_obj of res.data) {
                    teams_obj[team_obj.teamID] = team_obj;
                }
                AnswerService.getAnswersForConferenceSeason(conference,params.season).then(
                    (res2) => {
                        let answers_obj = {};
                        for (const aob of res2.data) {
                            let key = aob.team.teamID + "," + aob.answerType.answerTypeID;
                            if (key in answers_obj) {
                                answers_obj[key]['names'].push(aob.player.name);
                                answers_obj[key]['ids'].push(aob.player.playerID);
                            } else {
                                let item = {
                                    names: [aob.player.name],
                                    ids: [aob.player.playerID]
                                }
                                answers_obj[key] = item;
                            }
                        }
                        setConferenceData(
                            {
                                ...stateRef.current.conferenceData,
                                [conference]: {
                                    teams: teams_obj,
                                    answers: answers_obj
                                }
                            }
                        )
                        setConferenceDones(
                            {
                                ...stateRef.current.conferenceDones,
                                [conference]: true
                            }
                        )
                    }
                )
            }
        )
    }

    useEffect(
        () => {
            const user = TokenService.getUser();
            if (user === null) {
                History.push("/nope");
            } else if (!user.roles.includes("ROLE_ADMIN")) {
                History.push("/nope");
            } else {
                document.title = "Answer Entry";
                AnswerTypeService.getAllAnswerTypes().then(
                    (res) => {
                        let answer_types = {};
                        for (const at_obj of res.data) {
                            answer_types[at_obj.answerTypeID] = at_obj.answerTypeTidy;
                        }
                        setAnswerTypes(answer_types);
                        PlayerService.getActivePlayers().then(
                            (res2) => {
                                let players_array = [
                                    {
                                        label : 'N/A',
                                        value : 0
                                    }
                                ];
                                let player_lookup = {};
                                for (const player_obj of res2.data) {
                                    const dropdown_data = {
                                        label : player_obj.name,
                                        value : player_obj.playerID
                                    };
                                    players_array.push(dropdown_data);
                                    player_lookup[player_obj.playerID] = player_obj.name;
                                }
                                setPlayers(players_array);
                                setPlayerLookup(player_lookup);
                            }
                        )
                        for (const conference of ['AFC','NFC']) {
                            generateConferenceData(conference);
                        }
                        // generateConferenceData('AFC',setDataAFC,setDoneAFC);
                        // generateConferenceData('NFC',setDataNFC,setDoneNFC);
                    }
                )
            }
        },
        []
    )

    if (conferenceDones['AFC'] && conferenceDones['NFC']) {
        return (
            <div>
                <div id="answerEntryTablesDiv">
                    <AnswerEntryTable
                        revealModal={revealModal}
                        conference={'AFC'}
                        answerTypes={answerTypes}
                        season={params.season}
                        data={conferenceData['AFC']}
                    />
                    <AnswerEntryTable
                        revealModal={revealModal}
                        conference={'NFC'}
                        answerTypes={answerTypes}
                        season={params.season}
                        data={conferenceData['NFC']}
                    />                
                </div>
                {showModal && (
                    <AnswerEntryModal
                        team={cellTeam}
                        teamID={cellTeamID}
                        answerTypeID={cellType}
                        season={params.season}
                        conference={modalConference}
                        setIsOpen={setShowModal}
                        answerTypes={answerTypes}
                        players={players}
                        playerLookup={playerLookup}
                        currentAnswerIDs={currentAnswerIDs}
                        pushDataToParent={pushDataToParent}
                    />
                )}
            </div>
        )
    } else {
        return <TQBCLoading/>;
    }
}