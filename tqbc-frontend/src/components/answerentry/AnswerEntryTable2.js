import React from "react"
import { useState,useEffect } from "react";
import History from "../../helpers/History";
import AnswerService from "../../services/AnswerService";
import TeamService from "../../services/TeamService"
import { AnswerEntryModal } from "./AnswerEntryModal";

export const AnswerEntryTable = (props) => {

    // const [teamsArray, setTeamsArray] = useState([]);
    // const [teamsObject, setTeamsObject] = useState({});
    // const [answersObject, setAnswersObject] = useState({});
    const [tableHeaders, setTableHeaders] = useState([]);
    const [tableRows, setTableRows] = useState([]);
    // const [divisionsSeen, setDivisionsSeen] = useState([]);

    useEffect(
        () => {
            generateTableHeaders();
            generateTableRows(props.data.teams,props.data.answers);
        },
        []
    )

    const generateTableHeaders = () => {
        let table_headers = [
            <th colSpan={2}>{props.conference}</th>
        ];
        for (const answerTypeTidy of Object.values(props.answerTypes)) {
            table_headers.push(
                <th>{answerTypeTidy}</th>
            )
        }
        setTableHeaders(table_headers);
    }

    const generateTableRows = (teams_obj,answers_obj) => {
        if (Object.keys(teams_obj).length === 0) {
            return null;
        }
        let divisionsSeen = [];
        let trs = [];
        for (const teamID of Object.keys(teams_obj)) {
            let team_obj = teams_obj[teamID]
            let team_name = team_obj.location + " " + team_obj.nickname;
            let tds = [];
            let team_div = team_obj.division;
            if (!divisionsSeen.includes(team_div)) {
                tds.push(<td rowSpan={4}>{team_div[0]}</td>);
                divisionsSeen.push(team_div);
            }
            tds.push(<td>{team_name}</td>);
            for (const answerTypeID of Object.keys(props.answerTypes)) {
                let td_value = "";
                let pIDs = [];
                let key = teamID + "," + answerTypeID;
                if (key in answers_obj) {
                    td_value = answers_obj[key]['names'].join(", ");
                    pIDs = answers_obj[key]['ids'];
                }
                tds.push(
                    <td onClick={() => props.revealModal(team_name,teamID,answerTypeID,pIDs,props.conference)}>
                        {td_value}
                    </td>
                );
            }
            trs.push(
                <tr>
                    {tds}
                </tr>
            )
        }
        setTableRows(trs);
    }

    if (tableRows.length > 0) {
        return (
            <table id={`answerEntryTable-${props.conference}`}>
                <tr>
                    {tableHeaders}
                </tr>
                {tableRows}
            </table>
        )
    } else {
        return null;
    }
}