import React from "react"
import { useState,useEffect } from "react";
import History from "../../helpers/History";
import AnswerService from "../../services/AnswerService";
import TeamService from "../../services/TeamService"
import { AnswerEntryModal } from "./AnswerEntryModal";

export const AnswerEntryTable = (props) => {

    // const [teamsArray, setTeamsArray] = useState([]);
    const [teamsObject, setTeamsObject] = useState({});
    const [answersObject, setAnswersObject] = useState({});
    const [tableHeaders, setTableHeaders] = useState([]);
    const [tableRows, setTableRows] = useState([]);
    const [divisionsSeen, setDivisionsSeen] = useState([]);

    useEffect(
        () => {
            TeamService.getConferenceActiveTeams(props.conference).then(
                (res) => {
                    // let teams_array = [];
                    let teams_obj = {};
                    for (const team_obj of res.data) {
                        // let team_name = team_obj.location + " " + team_obj.nickname;
                        // teams_array.push(team_name);
                        teams_obj[team_obj.teamID] = team_obj;
                    }
                    // setTeamsArray(teams_array);
                    setTeamsObject(teams_obj);
                    AnswerService.getAnswersForConferenceSeason(props.conference,props.season).then(
                        (res2) => {
                            let answers_obj = {};
                            for (const aob of res2.data) {
                                let key = aob.team.teamID + "," + aob.answerType.answerTypeID;
                                if (key in answers_obj) {
                                    answers_obj[key].push(aob.player.name);
                                } else {
                                    answers_obj[key] = [aob.player.name];
                                }
                            }
                            setAnswersObject(answers_obj);
                            generateTableHeaders();
                            generateTableRows(teams_obj,answers_obj);
                        }
                    )
                }
            )
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
                let key = teamID + "," + answerTypeID;
                if (key in answers_obj) {
                    td_value = answers_obj[key].join(", ");
                }
                tds.push(
                    <td onClick={() => props.revealModal(team_name,answerTypeID)}>
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
            <table style={{border:"1px solid black"}}>
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