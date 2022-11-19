import React from "react"
import { AnswerEntryTable } from "./AnswerEntryTable"
import './AnswerEntry.css';
import { useState } from "react";
import { AnswerEntryModal } from "./AnswerEntryModal2";
import { useEffect } from "react";
import AnswerTypeService from "../../services/AnswerTypeService";
import { useParams } from "react-router-dom";
import History from "../../helpers/History";
import PlayerService from "../../services/PlayerService";

export const AnswerEntry = () => {

    // Make sure user is admin user

    
    const [showModal, setShowModal] = useState(false);
    const [cellTeam, setCellTeam] = useState(null);
    const [cellType, setCellType] = useState(null);
    const [answerTypes, setAnswerTypes] = useState({});
    const [players, setPlayers] = useState([]);
    const [currentAnswerIDs, setCurrentAnswerIDs] = useState([]);

    let params = useParams();
    
    const revealModal = (team,type,pIDs) => {
        setCellTeam(team);
        setCellType(type);
        setCurrentAnswerIDs(pIDs);
        setShowModal(true);
    }

    useEffect(
        () => {
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
                            for (const player_obj of res2.data) {
                                const dropdown_data = {
                                    label : player_obj.name,
                                    value : player_obj.playerID
                                };
                                players_array.push(dropdown_data);
                            }
                            setPlayers(players_array);
                        }
                    )
                }
            )
        },
        []
    )

    if (Object.keys(answerTypes).length > 0) {
        return (
            <div>
                <div id="answerEntryTablesDiv">
                    <AnswerEntryTable
                        revealModal={revealModal}
                        conference={'AFC'}
                        answerTypes={answerTypes}
                        season={params.season}
                    />
                    <AnswerEntryTable
                        revealModal={revealModal}
                        conference={'NFC'}
                        answerTypes={answerTypes}
                        season={params.season}
                    />                
                </div>
                {showModal && (
                    <AnswerEntryModal
                        team={cellTeam}
                        type={cellType}
                        season={params.season}
                        setIsOpen={setShowModal}
                        answerTypes={answerTypes}
                        players={players}
                        currentAnswerIDs={currentAnswerIDs}
                    />
                )}
            </div>
        )
    } else {
        return null;
    }
}