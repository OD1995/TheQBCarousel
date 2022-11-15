import React from "react"
import { AnswerEntryTable } from "./AnswerEntryTable"
import './AnswerEntry.css';
import { useState } from "react";
import { AnswerEntryModal } from "./AnswerEntryModal";
import { useEffect } from "react";
import AnswerTypeService from "../../services/AnswerTypeService";

export const AnswerEntry = () => {

    // Make sure user is admin user

    
    const [showModal, setShowModal] = useState(false);
    const [cellTeam, setCellTeam] = useState(null);
    const [cellType, setCellType] = useState(null);
    const [answerTypes, setAnswerTypes] = useState({});

    
    const revealModal = (team,type) => {
        setCellTeam(team);
        setCellType(type);
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
                    />
                    <AnswerEntryTable
                        revealModal={revealModal}
                        conference={'NFC'}
                        answerTypes={answerTypes}
                    />                
                </div>
                {showModal && (
                    <AnswerEntryModal
                        team={cellTeam}
                        type={cellType}
                    />
                )}
            </div>
        )
    } else {
        return null;
    }
}