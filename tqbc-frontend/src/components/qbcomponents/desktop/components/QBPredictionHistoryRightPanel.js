import React from "react";
import { SeasonSelector } from "./SeasonSelector";
import { UserScoreDisplayer } from "./UserScoreDisplayer";

export const QBPredictionHistoryRightPanel = (props) => {
    return (
        <div id="qb-prediction-history-right-panel">
            <h1
                style={{border:"3px solid black"}}
            >
                {props.season}
            </h1>
            <UserScoreDisplayer
                userID={props.userID}
                season={props.season}
            />
            {
                (
                    props.uniqueSeasons.length > 1
                    // true
                ) && <SeasonSelector
                    uniqueSeasons={props.uniqueSeasons}
                    currentSeason={props.season}
                    username={props.username}
                    page='prediction-history'
                />

            }
        </div>
    )
}