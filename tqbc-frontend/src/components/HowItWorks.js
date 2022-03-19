import "../styles/HowItWorks.css";
import createPredictionPeriodsTable from "../helpers/PredictionPeriodsTable";
import PredictionPeriodService from "../services/PredictionPeriodService";
import EventService from "../services/EventService";
import { useState, useEffect } from "react";

const HowItWorks = () => {
    const [exampleSeason, setExampleSeason] = useState(2023);
    const [ppTable2, setPptable2] = useState("CHANGE MEEEEE");

    const txt = "";
    useEffect(() => {
        PredictionPeriodService.getHowItWorksPredictionPeriods().then(
            (ppRes) => {
                // console.log(ppRes.data)
                // Get the example season to use (based on the DB)
                const exampleSeasonFromDB = ppRes.data[0].season;
                // Get unique array of eventIDs
                const fromEventIDs = ppRes.data.map(o => o.fromEventID);
                const toEventIDs = ppRes.data.map(o => o.toEventID);
                const uniqueEventIDs = [...new Set([...fromEventIDs ,...toEventIDs])];
                // Get details of events in `uniqueEventIDs`
                EventService.getEventsByEventIDArray(uniqueEventIDs).then(
                    (eRes) => {
                        let tbl = createPredictionPeriodsTable(ppRes.data,eRes.data);
                        console.log('hello');
                        console.log(tbl);
                        setPptable2(tbl);
                        setExampleSeason(exampleSeasonFromDB);
                    }
                )
            }
        )
    },[])
    return (
        <div className="container">
            <header className="jumbotron">
                <h1>How It Works</h1>
                <br></br>
                <h3>The Concept</h3>
                <p>
                    Over the last few seasons, the number of QBs changing teams in the NFL has been increasing
                    significantly CHECK ME. This site is a platform that allows you to:
                </p>
                <ul>
                    <li>
                        make predictions over the course of the season (and off-season) about who will be each
                        franchise's starting QB in the following season
                    </li>
                    <li>
                        look back at your predictions from the past
                    </li>
                    <li>
                        compare your predictions to your friends (through private leagues) and everyone else 
                        (via a global leaderboard)
                    </li>
                </ul> 
                <br></br>
                <h3>The Prediction Periods</h3>
                <p>
                    Each "prediction season" will start at the kick off of the season opener and end with the start of the following draft.
                    Each prediction year will be split into 4 "prediction periods".
                    For example, the prediction year in which the starting QBs will be predicted for the {exampleSeason} season will be split into the prediction periods below:
                </p>
                {ppTable2}
                <br></br>
                <p>
                    Once the draft has started, the prediction window for the upcoming season closes.
                    The prediction window for the next season then opens with the kick off of the first game of the new season.
                </p>
            </header>
        </div>
    );
};

export default HowItWorks;