import React from "react";

export const AnswerEntryModal = (props) => {

    return (
        <>
            <div className="darkBG" onClick={() => props.setIsOpen(false)}/>
            <div className="centered">
                <div className="tqbcModal">
                    <div className="modalContent">
                        <p>
                            <b>Team: </b>{props.team}
                        </p>
                        <p>
                            <b>Season: </b>{props.season}
                        </p>
                        <p>
                            <b>Type: </b>{props.answerTypes[props.type]}
                        </p>
                        <p>
                            <i>dropdown</i>
                        </p>
                    </div>
                    <div className="modalActions">
                        <button className="deleteBtn" onClick={() => props.setIsOpen(false)}>
                            SAVE
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}