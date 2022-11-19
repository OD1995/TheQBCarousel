import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import UserScoreService from "../../../services/UserScoreService";

export const UserScoreDisplayer = (props) => {

    const [scores, setScores] = useState([]);

    useEffect(
        () => {
            UserScoreService.getUserScoresForSeason(
                props.userID,
                props.season
            ).then(
                (result) => {
                    let scores_array = [];
                    for (const ppID of Object.keys(result.data)) {
                        let ppScore = result.data[ppID];
                        scores_array.push(
                            <tr key={ppID}>
                                <td>PP{ppID}</td>
                                <td>{ppScore}</td>
                            </tr>
                        )
                    }
                    setScores(scores_array);
                }
            )
        },
        []
    )

    return (
        <table id="qb-prediction-history-score-table">
            <tbody>
                {scores}
            </tbody>
        </table>
    )
}