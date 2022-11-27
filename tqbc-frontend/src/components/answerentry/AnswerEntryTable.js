import React from "react"
import { useState,useEffect } from "react";

export const AnswerEntryTable = (props) => {

    const [tableHeaders, setTableHeaders] = useState([]);
    const [tableRows, setTableRows] = useState([]);

    useEffect(
        () => {
            generateTableHeaders();
            generateTableRows(props.data.teams,props.data.answers);
        },
        [props.data.answers]
    )

    const generateTableHeaders = () => {
        let table_headers = [
            <th
                id={"header-" + props.conference}
                key={"header-" + props.conference}
                colSpan={2}
            >
                {props.conference}
            </th>
        ];
        for (const answerTypeTidy of Object.values(props.answerTypes)) {
            table_headers.push(
                <th
                    id={"header-" + answerTypeTidy}
                    key={"header-" + answerTypeTidy}
                >
                    {answerTypeTidy}
                </th>
            )
        }
        setTableHeaders(table_headers);
    }

    const generateTableRows = (teamsObj,answersObj) => {
        if (Object.keys(teamsObj).length === 0) {
            return null;
        }
        let divisionsSeen = [];
        let trs = [];
        for (const teamID of Object.keys(teamsObj)) {
            let team_obj = teamsObj[teamID]
            let team_name = team_obj.location + " " + team_obj.nickname;
            let tds = [];
            let team_div = team_obj.division;
            if (!divisionsSeen.includes(team_div)) {
                tds.push(
                    <td               
                        key={teamID + "-" + team_div[0]}
                        id={teamID + "-" + team_div[0]}
                        rowSpan={4}
                    >
                        {team_div[0]}
                    </td>
                );
                divisionsSeen.push(team_div);
            }
            tds.push(
                <td                
                    key={teamID + "-" + team_name}
                    id={teamID + "-" + team_name}
                >
                    {team_name}
                </td>
            );
            for (const answerTypeID of Object.keys(props.answerTypes)) {
                let td_value = "";
                let pIDs = [];
                let key = teamID + "," + answerTypeID;
                if (key in answersObj) {
                    td_value = answersObj[key]['names'].join(", ");
                    pIDs = answersObj[key]['ids'];
                }
                tds.push(
                    <td
                        key={teamID + "-" + answerTypeID}
                        id={teamID + "-" + answerTypeID}
                        onClick={() => props.revealModal(team_name,teamID,answerTypeID,pIDs,props.conference)}
                    >
                        {td_value}
                    </td>
                );
            }
            trs.push(
                <tr key={teamID}>
                    {tds}
                </tr>
            )
        }
        setTableRows(trs);
    }

    if (tableRows.length > 0) {
        return (
            <table id={`answerEntryTable-${props.conference}`}>
                <thead>
                    <tr>
                        {tableHeaders}
                    </tr>
                </thead>
                <tbody>
                    {tableRows}
                </tbody>
            </table>
        )
    } else {
        return null;
    }
}