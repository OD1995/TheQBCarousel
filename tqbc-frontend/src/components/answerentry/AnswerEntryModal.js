import React from "react";

export const AnswerEntryModal = (props) => {

    return (
        <div className="modal display-block">
            <b>Team: </b>{props.team}
            <b>Type: </b>{props.type}
            <i>dropdown</i>
        </div>
    )
}