import { useState } from "react";
import { SeasonSelector } from "../qbcomponents/components/SeasonSelector";

export const GenericLeaderboardRightPanel = (props) => {


    return (
        <div id='generic-leaderboard-right'>
            <h1
                style={{border:"3px solid black"}}
            >
                {props.season}
            </h1>
            <button
                className="tqbc-black-button"
                onClick={() => props.setShowPopup(true)}
            >
                ?
            </button>
            {
                (
                    props.uniqueSeasons.length > 1
                    // true
                ) && <SeasonSelector
                    uniqueSeasons={props.uniqueSeasons}
                    currentSeason={props.season}
                    username={props.username}
                />

            }
        </div>
    );
}