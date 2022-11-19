import React from "react";
// import useState from "react-usestateref";
import { useEffect } from "react";
import { useState } from "react";
import { AnswerEntrySelect } from "./AnswerEntrySelect";
import Select from 'react-select';
import { useRef } from "react";


export const AnswerEntryModal = (props) => {

    const [playerIDs,setPlayerIDs] = useState(Object.assign({},props.currentAnswerIDs));
    const [selects,setSelects] = useState({});
    const [showSelects,setShowSelects] = useState({});
    const stateRef = useRef();

    stateRef.current = {
        playerIDs: playerIDs,
        selects: selects,
        showSelects: showSelects
    }


    const setAnswer = (event,idx) => {
        // setPlayerIDs(event.value);
        // setPlayerIDs(
        //     previousPlayerIDs => (
        //         {
        //             ...previousPlayerIDs,
        //             [idx]: event.value
        //         }
        //     )
        // );
        // playerIDs.current[idx] = event.value;
        setPlayerIDs(
            {
                ...stateRef.current.playerIDs,
                [idx]: event.value
            }
        )
    }

    const removeSelectDiv = (idx) => {
        let tempShowSelects = {...stateRef.current.showSelects};
        tempShowSelects[idx] = false;
        setShowSelects(tempShowSelects);
        let checker = arr => arr.every(v => v === false);
        let startAgain = checker(Object.values(tempShowSelects));
        if (startAgain) {
            // let tempPlayerIDs = {...stateRef.current.playerIDs};
            // let tempSelects = {...stateRef.current.selects};
            console.log("generateSelects1");
            const nextIdx = Math.max(...Object.keys(tempShowSelects)) + 1;
            setSelects(
                {
                    ...stateRef.current.selects,
                    [nextIdx]: createSelectDiv(nextIdx)
                }
            );
            setPlayerIDs(
                {
                    ...stateRef.current.playerIDs,
                    [nextIdx]: 0
                }
            );
            setShowSelects(
                {
                    ...tempShowSelects,
                    [nextIdx]: true
                }
            )
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
                    onChange={event => setAnswer(event,idx)}
                    options={props.players}
                    menuPlacement="auto"
                    id={idx}
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
        const nextIdx = Math.max(...Object.keys(stateRef.current.selects)) + 1;
        setSelects(
            {
                ...stateRef.current.selects,
                [nextIdx]: createSelectDiv(nextIdx,false)
            }
        )
        setPlayerIDs(
            {
                ...stateRef.current.playerIDs,
                [nextIdx] : 0
            }
        )
        setShowSelects(
            {
                ...stateRef.current.showSelects,
                [nextIdx]: true
            }
        )
        // selects.current[nextIdx] = createSelectDiv(nextIdx);
        // playerIDs.current[nextIdx] = 0;
    }

    const saveData = () => {
        // props.setIsOpen(false);
        console.log(new Date());
        console.log(stateRef.current.playerIDs);
    }

    useEffect(
        () => {
            console.log("useEffect1");
            let selects_obj = {};
            let playerIDS_obj = {};
            let ss_obj = {}
            if (Object.keys(stateRef.current.playerIDs).length === 0) {
                // const idx = 0;
                // selects.current[idx] = createSelectDiv(idx);
                selects_obj[0] = createSelectDiv(0);
                playerIDS_obj[0] = 0;
                ss_obj[0] = true;
            } else {
                for (const idx of Object.keys(stateRef.current.playerIDs)) {
                    // let val = playerIDs.current[idx];
                    // selects.current[idx] = createSelectDiv(idx);
                    selects_obj[idx] = createSelectDiv(idx);
                    playerIDS_obj[idx] = 0;
                    ss_obj[idx] = true;
                }
            }
            setSelects(selects_obj);
            setPlayerIDs(playerIDS_obj);
            setShowSelects(ss_obj);
            // setPlayerIDs({0:0});
            // playerIDs.current[0] = 0;
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
                            {/* {Object.values(selects)} */}
                            {/* {Object.values(stateRef.current.selects)} */}
                            {Object.keys(selects).map(
                                (key) => {
                                    if (showSelects[key]) {
                                        return selects[key];
                                    }
                                }
                            )}
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
                                onClick={() => saveData()}
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