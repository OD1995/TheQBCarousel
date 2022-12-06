import { useState } from "react";
import { useEffect } from "react"
import EventService from "../../services/EventService";

export const OutsidePredictionPeriod = () => {

    const [lastDraftEventName,setLastDraftEventName] = useState("");
    const [nextSeasonKoEventName,setNextSeasonKoEventName] = useState("");
    const [nextSeasonName, setNextSeasonName] = useState("");

    useEffect(
        () => {
            EventService.getOutsidePredictionPeriodData().then(
                (result) => {
                    let data = result.data;
                    let lden = data.lastEvent.eventName.replace("Start","start");
                    setLastDraftEventName(lden);
                    let nsken = data.nextEvent.eventName;
                    setNextSeasonKoEventName(nsken);
                    let nsn = parseInt(data.nextEvent.eventDateTimeUTC.slice(0,4)) + 1;
                    setNextSeasonName(nsn);
                }
            );
        },
        []
    );

    return (
        <div
            id='outside-prediction-period-div'
            style={
                {
                    height: "60vh",
                    display:"flex",
                    alignItems: "center",
                    flexDirection: "column",
                    justifyContent: "space-evenly"
                }
            }
        >
            <h1>
                Outside Prediction Period
            </h1>
            <p
                className="display-linebreak"
                style={
                    {
                        textAlign: "center"
                    }
                }
            >
                As we are currently between <b>the {lastDraftEventName}</b> and 
                <b> the {nextSeasonKoEventName}</b>, it is not possible to make any predictions.
            {"\n\n"}
                Please return once <b>the {nextSeasonKoEventName}</b> has happened in order
                 to make your predictions for the <b>{nextSeasonName}</b> season!
            </p>
        </div>
    )
}