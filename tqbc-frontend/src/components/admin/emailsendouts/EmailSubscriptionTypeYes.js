import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import EmailService from "../../../services/EmailService";

export const EmailSubscriptionTypeYes = () => {

    const [originalHTML, setOriginalHTML] = useState("");
    const [displayedHTML, setDisplayedHTML] = useState("");
    const [showAreYouSure, setShowAreYouSure] = useState(false)
    const [replacerInputs, setReplacerInputs] = useState([]);
    const [actionResult, setActionResult] = useState("");
    const [actionResultColour, setActionResultColour] = useState("black");
    
    const [searchParams, setSearchParams] = useSearchParams();
    const params = useParams();

    const replacers = {
        1 : [
            'predictionSeason',
            'daysLeft',
            'toEvent',
            'toEventDateTimeET',
        ],
        2 : [
            'daysLeft',
            'toEvent',
            'toEventDateTimeET',
        ],
        
    }

    useEffect(
        () => {
            generateReplacerInputs(replacers[params.emailSubscriptionTypeID]);
            EmailService.getEmailSubscriptionTypeTemplate(
                params.emailSubscriptionTypeID
            ).then(
                (res) => {
                    setOriginalHTML(res.data);
                    doReplacements(res.data);
                }
            )
        },
        []
    )

    const generateReplacerInputs = (input_list) => {
        let ri = [];
        for (const il of input_list) {
            ri.push(
                <div
                    className="estyes-replacer-div"
                    key={il + "-estyes-div"}
                >
                    <h5>
                        {il + ":"}
                    </h5>
                    <input
                        className="estyes-input-box"
                        id={il}
                        onChange={updateReplacerVals}
                    />
                </div>
            )
        }
        setReplacerInputs(ri);
    }

    const updateReplacerVals = (ev) => {
        let key = ev.target.id;
        if (ev.target.value !== "") {
            searchParams.set(key,ev.target.value);
            setSearchParams(searchParams);
        } else {
            searchParams.delete(key);
            setSearchParams(searchParams);
        }
    }

    const doReplacements = (txt) => {
        var dh = txt;
        dh = dh.replaceAll("[tqbcDomain]", window.location.origin);
        for (const [key,value] of searchParams.entries()) {
            dh = dh.replace("["+key+"]",value);
        }
        setDisplayedHTML(dh);
    }

    const handleUpdateClick = () => {
        doReplacements(originalHTML);
    }

    const sendEmailToJustMe = () => {
        EmailService.sendEmailJustToMe(
            displayedHTML
        ).then(
            (res) => {
                setActionResultColour("green")
                setActionResult("Success")
            }
        ).catch(
            (err) => {
                setActionResultColour("red");
                setActionResult(err.response.data.message);
            }
        )
    }

    const queueEmailToAll = () => {
        EmailService.queueEmailToAllSubscribedUsers(
            displayedHTML,
            parseInt(params.emailSubscriptionTypeID),
            parseInt(searchParams.get('predictionPeriodID'))
        ).then(
            (res) => {
                setActionResultColour("green")
                setActionResult(res.data + " emails queued");
            }
        ).catch(
            (err) => {
                setActionResultColour("red");
                setActionResult(err.response.data.message);
            }
        )
    }

    return (
        <div
            id="estyes-parent-div"
        >
            <span
                id="estyes-dangerous-span"
                dangerouslySetInnerHTML={{__html:displayedHTML}}
            />
            <div
                id="estyes-prediction-period-div"
            >
                <h4>
                    Prediction Period
                </h4>
                <input
                    className="estyes-input-box"
                    id="predictionPeriodID"
                    onChange={updateReplacerVals}
                />
            </div>
            <div
                id="estyes-inputs-div"
            >
                {replacerInputs}
            </div>
            <div
                id="estyes-buttons-div"
            >
                {
                    showAreYouSure && (
                        <button
                            className="tqbc-red-button"
                            onClick={queueEmailToAll}
                        >
                            Are You Completely Sure
                        </button>
                    )
                }
                {
                    showAreYouSure && (
                        <button
                            className="tqbc-red-button"
                            onClick={() => setShowAreYouSure(false)}
                        >
                            No
                        </button>
                    )
                }
                <button
                    id="estyes-update-button"
                    className="tqbc-green-button"
                    onClick={handleUpdateClick}
                >
                    Update
                </button>
                <button
                    className="tqbc-green-button"
                    onClick={sendEmailToJustMe}
                >
                    Send Email To Just Me
                </button>
                <button
                    className="tqbc-black-button"
                    onClick={() => setShowAreYouSure(true)}
                >
                    Queue Email To All Users
                </button>
            </div>
            <p
                style={{
                    color: actionResultColour,
                    marginTop: "8vh"
                }}
            >
                {actionResult}
            </p>
        </div>
    );
}