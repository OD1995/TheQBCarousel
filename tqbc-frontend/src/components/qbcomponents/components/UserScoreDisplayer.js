import React from "react";
import { useState } from "react";
import { useEffect } from "react";

export const UserScoreDisplayer = (props) => {

    const [scores, setScores] = useState([]);

    useEffect(
        () => {
            let scores_array = [];
            for (const ppID of Object.keys(props.userScore)) {
                let ppScore = props.userScore[ppID];
                scores_array.push(
                    <tr>
                        <td>{ppID}</td>
                        <td>{ppScore}</td>
                    </tr>
                )
            }
            setScores(scores_array);
        }
    )

    return (
        <table id="qb-prediction-history-score-table">
            {scores}
        </table>
    )
}