import React from "react";
import useState from "react-usestateref";
import { useEffect } from "react";
// import { useState } from "react";
import { AnswerEntrySelect } from "./AnswerEntrySelect";
import Select from 'react-select';


export const AnswerEntryModal = (props) => {

    const [playerIDs, setPlayerIDs] = useState(Object.assign({},props.currentAnswerIDs));
    const [selects, setSelects] = useState({});

    const setAnswer = (event,idx) => {
        // setPlayerIDs(event.value);
        setPlayerIDs(
            previousPlayerIDs => (
                {
                    ...previousPlayerIDs,
                    [idx]: event.value
                }
            )
        );
    }

    const removeSelectDiv = (idx) => {
        var updatedPlayerIDs;
        setPlayerIDs(currentPlayerIDs => {
            updatedPlayerIDs = currentPlayerIDs;
            return currentPlayerIDs;
        });
        var updatedSelects;
        setSelects(currentSelects => {
            updatedSelects = currentSelects;
            return currentSelects;
        });
        delete updatedPlayerIDs[idx];
        delete updatedSelects[idx];
        setPlayerIDs(updatedPlayerIDs);
        setSelects(updatedSelects);
        // setPlayerIDs(
        //     {
        //         ...updatedPlayerIDs,
        //         [idx]: undefined
        //     }
        // );
        // setSelects(
        //     {
        //         ...updatedSelects,
        //         [idx]: undefined
        //     }
        // )
        if (Object.keys(updatedSelects).length === 0) {
            // console.log("generateSelects1");
            let selects_obj = {};
            const idx = 0;
            selects_obj[idx] = createSelectDiv(idx,true);
            setSelects(selects_obj);
            setPlayerIDs({0:0})
        }
    }

    const createSelectDiv = (idx) => {
        console.log("createSelectDiv");
        return (
            <div className="answerSelectorDiv">
                <Select
                    className="answerSelector"
                    defaultValue={props.players[0]}
                    // defaultValue={0}
                    onChange={event => setAnswer(event,idx,playerIDs)}
                    options={props.players}
                    menuPlacement="auto"
                    // isSearchable={true}                   
                />
                <button
                    className="tqbc-red-button removeAnswerSelector"
                    onClick={() => removeSelectDiv(idx)}
                >
                    -
                </button>
            </div>
        )
    }

    // const createSelectDiv = (idx) => {
    //     return (
    //         <AnswerEntrySelect
    //             idx={idx}
    //             removeSelectDiv={removeSelectDiv}
    //             players={props.players}
    //             setParentPlayerID={setParentPlayerID}
    //         />
    //     )
    // }

    // const setParentPlayerID = (pID,idx) => {
    //     setPlayerIDs(
    //         {
    //             ...playerIDs,
    //             [idx]: pID
    //         }
    //     )
    // }

    const addNewSelect = () => {
        const nextIdx = Math.max(...Object.keys(selects)) + 1;
        setSelects(
            {
                ...selects,
                [nextIdx]: createSelectDiv(nextIdx,false)
            }
        )
        setPlayerIDs(
            {
                ...playerIDs,
                [nextIdx] : 0
            }
        )
    }

    useEffect(
        () => {
            console.log("useEffect1");
            let selects_obj = {};
            if (Object.keys(playerIDs).length === 0) {
                const idx = 0;
                selects_obj[idx] = createSelectDiv(idx,true);
            } else {
                for (const idx of Object.keys(playerIDs)) {
                    let val = playerIDs[idx];
                    selects_obj[idx] = createSelectDiv(idx,false);
                }
            }
            setSelects(selects_obj);
            setPlayerIDs({0:0});
        },
        []
    )

    useEffect(
        () => {
            console.log("useEffect2");
        },
        [playerIDs,selects]
    )

    if (Object.keys(selects).length > 0) {
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
                            {Object.values(selects)}
                            <button
                                className="tqbc-green-button"
                                onClick={() => addNewSelect()}
                                >
                                +
                            </button>
                        </div>
                        <div className="modalActions">
                            <button
                                className="tqbc-black-button modalButton"
                                onClick={() => props.setIsOpen(false)}
                            >
                                SAVE
                            </button>
                        </div>
                    </div>
                </div>
            </>
        )
    } else {
        return null;
    }
}