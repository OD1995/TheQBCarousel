import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { formatScore } from "../../../../helpers/UsefulFunctions";
import UserScoreService from "../../../../services/UserScoreService";

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
                    let spIDs = ['SP1','SP2','SP3','SP4'];
                    for (const spID of spIDs) {
                        if (spID in result.data) {
                            let spScore = formatScore(result.data[spID]);
                            scores_array.push(
                                <tr key={spID}>
                                    <td className="usdt-sp"><b>{spID}</b></td>
                                    <td className="usdt-val">{spScore}</td>
                                </tr>
                            );
                        }
                    }
                    if ("Season" in result.data) {
                        let spScore = formatScore(result.data["Season"]);
                        scores_array.push(
                            <tr key={"Season"}>
                                <td><b>Season</b></td>
                                <td><b>{spScore}</b></td>
                            </tr>
                        );
                    }

                    setScores(scores_array);
                }
            )
        },
        []
    )

    if (scores.length > 0) {
        return (
            <table id="qb-prediction-history-score-table">
                <tbody>
                    {scores}
                </tbody>
            </table>
        );
    } else {
        return null;
    }
}