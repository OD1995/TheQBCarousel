import React from "react";
import { useState } from "react";
import Select from 'react-select';

export const AnswerEntrySelect = (props) => {

    const [playerID, setPlayerID] = useState();

    const setValues = (pID) => {
        setPlayerID(pID);
        props.setParentPlayerID(pID,props.idx);
    }

    return (
        <div className="answerSelectorDiv">
            <Select
                className="answerSelector"
                // defaultValue={dropdownFriendly(season)}
                onChange={event => setValues(event.value)}
                options={props.players}
                menuPlacement="auto"
                // isSearchable={true}                   
            />
            <button
                className="tqbc-red-button removeAnswerSelector"
                onClick={() => props.removeSelectDiv(props.idx)}
            >
                -
            </button>
        </div>
    )
}