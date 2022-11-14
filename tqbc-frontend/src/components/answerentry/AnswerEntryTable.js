import React from "react"
import { useState,useEffect } from "react";
import History from "../../helpers/History";
import TeamService from "../../services/TeamService"
import { AnswerEntryModal } from "./AnswerEntryModal";

export const AnswerEntryTable = () => {

    const [teamsArray, setTeamsArray] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [cellTeam, setCellTeam] = useState(null);
    const [cellType, setCellType] = useState(null);

    useEffect(
        () => {
            TeamService.getActiveTeams().then(
                (res) => {
                    let teams = [];
                    for (const team_obj of res.data) {
                        let team_name = team_obj.location + " " + team_obj.nickname;
                        teams.push(team_name);
                    }
                    setTeamsArray(teams);
                }
            )
        },
        []
    )

    const revealModal = (team,type) => {
        setCellTeam(team);
        setCellType(type);
        setShowModal(true);
    }

    if (teamsArray.length > 0) {
        return (
            <div>
                <table style={{border:"1px solid black"}}>
                    <tr>
                        <th>Team</th>
                        <th>COL1</th>
                        <th>COL2</th>
                        <th>COL3</th>
                    </tr>
                    {
                        teamsArray.map(
                            team => {
                                return (
                                    <tr>
                                        <td>{team}</td>
                                        <td onClick={() => revealModal(team,"xx")}>Ben Roethlisberger</td>
                                        <td>Ben Roethlisberger</td>
                                        <td>Ben Roethlisberger</td>
                                    </tr>
                                )
                            }
                        )
                    }
                </table>
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