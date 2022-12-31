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
    // const [updateCount, setUpdateCount] = useState(0);
    // const [conferenceData, setConferenceData] = useState({});
    // const [conferencesDone, setConferencesDone] = useState({AFC:false,NFC:false});
    // const [dataAFC, setDataAFC] = useState({});
    // const [dataNFC, setDataNFC] = useState({});
    // const [doneAFC, setDoneAFC] = useState(false);
    // const [doneNFC, setDoneNFC] = useState(false);
    // const [conferenceData, setConferenceData] = useState({});
    const [conferenceData, setConferenceData] = useImmer({});
    const [conferenceDones, setConferenceDones] = useState({})

    const stateRef = useRef();

    stateRef.current = {
        conferenceData: conferenceData,
        conferenceDones: conferenceDones
    }

    let params = useParams();
    
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
                // setTeamsObject(teams_obj);
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
                        // setAnswersObject(answers_obj);
                        // generateTableHeaders();
                        // generateTableRows(teams_obj,answers_obj);
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
                        // setDataCallback(
                        //     {
                        //         teams: teams_obj,
                        //         answers: answers_obj
                        //     }
                        // );
                        // setDoneCallback(true);
                    }
                )
            }
        )
    }

    useEffect(
        () => {
            try {

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
            } catch (eee) {
                let a = 1;
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
        return null;
    }
}