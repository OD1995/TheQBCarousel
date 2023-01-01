import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import EmailService from "../../../services/EmailService";

export const EmailSubscriptionTypeYes = () => {

    const [originalHTML, setOriginalHTML] = useState("");
    const [displayedHTML, setDisplayedHTML] = useState("");
    // const [replacerVals, setReplacerVals] = useState({a:1});
    const [replacerInputs, setReplacerInputs] = useState([]);
    
    const [searchParams, setSearchParams] = useSearchParams();
    const params = useParams();

    const replacers = {
        1 : [
            'ordinalPredictionPeriod',
            'predictionSeason',
            'qbPredictionsURL',
            'daysLeft',
            'toEvent',
            'toEventDateTimeET',
            'unsubscribeURL'
        ]
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
            var startingVal = "";
            if (searchParams.has(il)) {
                startingVal = searchParams.get(il);
            }
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
                        onChange={(ev) => updateReplacerVals(ev,il)}
                        value={startingVal}
                    />
                </div>
            )
        }
        setReplacerInputs(ri);
    }

    const updateReplacerVals = (ev,key) => {
        // setReplacerVals(
        //     prevState => ({
        //         ...prevState,
        //         [key]: ev.target.value
        //     })
        // );
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
        for (const [key,value] of searchParams.entries()) {
            // let A = Object.keys({myFirstName})[0]
            dh = dh.replace("["+key+"]",value);
        }
        setDisplayedHTML(dh);
    }

    const handleUpdateClick = () => {
        doReplacements(originalHTML);
    }

    return (
        <div
            id="estyes-parent-div"
        >
            <span
                dangerouslySetInnerHTML={{__html:displayedHTML}}
            />
            <div
                id="estyes-inputs-div"
            >
                {replacerInputs}
            </div>
            <button
                id="estyes-update-button"
                className="tqbc-green-button"
                onClick={handleUpdateClick}
            >
                Update
            </button>
        </div>
    );
}