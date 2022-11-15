import React from "react"
import { useState,useEffect } from "react";
import History from "../../helpers/History";
import TeamService from "../../services/TeamService"
import { AnswerEntryModal } from "./AnswerEntryModal";

export const AnswerEntryTable = (props) => {

    const [teamsArray, setTeamsArray] = useState([]);
    const [columns, setColumns] = useState([1,2,3]);
    const [tableHeaders, setTableHeaders] = useState([]);

    useEffect(
        () => {
            TeamService.getConferenceActiveTeams(props.conference).then(
                (res) => {
                    let teams = [];
                    for (const team_obj of res.data) {
                        let team_name = team_obj.location + " " + team_obj.nickname;
                        teams.push(team_name);
                    }
                    setTeamsArray(teams);
                    generateTableHeaders();
                }
            )
        },
        []
    )

    const generateTableHeaders = () => {
        let table_headers = [
            <th>{props.conference}</th>
        ];
        for (const answerTypeTidy of Object.values(props.answerTypes)) {
            table_headers.push(
                <th>{answerTypeTidy}</th>
            )
        }
        setTableHeaders(table_headers);
    }

    if (teamsArray.length > 0) {
        return (
            <table style={{border:"1px solid black"}}>
                <tr>
                    {/* <th>{props.conference}</th>
                    <th>COL1</th>
                    <th>COL2</th>
                    <th>COL3</th> */}
                    {tableHeaders}
                </tr>
                {
                    teamsArray.map(
                        team => {
                            let tds = [
                                <td>{team}</td>
                            ];
                            for (const answerTypeID of Object.keys(props.answerTypes)) {
                                tds.push(
                                    <td onClick={() => props.revealModal(team,answerTypeID)}>
                                        A Very Long Name
                                    </td>
                                );
                            }
                            return (
                                <tr>
                                    {tds}
                                </tr>
                            )
                        }
                    )
                }
            </table>
        )
    } else {
        return null;
    }
}