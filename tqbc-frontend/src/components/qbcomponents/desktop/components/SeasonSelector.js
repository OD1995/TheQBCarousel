import React from "react";
import { useState } from "react";
import Select from 'react-select';
import History from "../../../../helpers/History";
import { makeValueDropdownFriendly, makeOptionsDropdownFriendly } from "../../../../helpers/UsefulFunctions";

export const SeasonSelector = (props) => {

    const [selectorSeason,setSelectorSeason] = useState(props.currentSeason);

    const updateSeason = () => {
        var new_url;
        if (props.page === 'prediction-history') {
            new_url = `/prediction-history/${props.username}/${selectorSeason}`;
        } else if (props.page === 'leaderboard') {
            if (props.global) {
                new_url = `/global-leaderboard/${props.privateLeaderboardUUID}/${selectorSeason}`;
            } else {
                new_url = `/private-leaderboard/${props.privateLeaderboardUUID}/${selectorSeason}`;
            }
        }
        History.push(new_url);
    }

    return (
        <div id='qb-prediction-history-season-selector-div'>
            <Select
                defaultValue={makeValueDropdownFriendly(selectorSeason)}
                onChange={event => setSelectorSeason(event.value)}
                options={makeOptionsDropdownFriendly(props.uniqueSeasons)}
            />
            <button
                onClick={updateSeason}
                className="tqbc-green-button"
                id="qb-prediction-history-season-updater-button"
            >
            Update
            </button>
        </div>
    )
}