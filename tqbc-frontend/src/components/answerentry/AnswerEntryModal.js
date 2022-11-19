import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import Select from 'react-select';
import { useRef } from "react";
import AnswerService from "../../services/AnswerService";


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
        let checker = arr => arr.every(v => v === false);
        let startAgain = checker(Object.values(tempShowSelects));
        
        if (startAgain) {
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
            tempShowSelects[nextIdx] = true;
        }
        setShowSelects(tempShowSelects);
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
    }

    const saveData = () => {
        let answers = [];
        for (const key in Object.keys(stateRef.current.playerIDs)) {
            let pID = stateRef.current.playerIDs[key];
            if (
                (stateRef.current.showSelects[key]) &
                (!answers.includes(pID)) &
                (pID !== 0)
                ) {
                answers.push(pID);
            }
        }
        props.setIsOpen(false);
        if (answers.length === 0) {
            return ;
        }
        try {
            AnswerService.postAnswersForTeamAndAnswerType(
                props.teamID,
                answers,
                props.answerTypeID
            ).then(
                (res) => {
                    console.log('answer posting: SUCCESSFUL');
                },
                (error) => {
                    console.log('answer posting: UNSUCCESSFUL')
                }
            )
        } catch (err) {
            let a = 1;
        }
        // console.log(new Date());
        // console.log(stateRef.current.playerIDs);
    }

    useEffect(
        () => {
            console.log("useEffect1");
            let selects_obj = {};
            let playerIDS_obj = {};
            let ss_obj = {}
            if (Object.keys(stateRef.current.playerIDs).length === 0) {
                selects_obj[0] = createSelectDiv(0);
                playerIDS_obj[0] = 0;
                ss_obj[0] = true;
            } else {
                for (const idx of Object.keys(stateRef.current.playerIDs)) {
                    // let val = playerIDs.current[idx];
                    selects_obj[idx] = createSelectDiv(idx);
                    playerIDS_obj[idx] = 0;
                    ss_obj[idx] = true;
                }
            }
            setSelects(selects_obj);
            setPlayerIDs(playerIDS_obj);
            setShowSelects(ss_obj);
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
                                <b>Type: </b>{props.answerTypes[props.answerTypeID]}
                            </p>
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
                                Save & Close
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