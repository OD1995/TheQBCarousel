import "../styles/HowItWorks.css";
import createPredictionPeriodsTable2 from "../helpers/PredictionPeriodsTable";
import PredictionPeriodService from "../services/PredictionPeriodService";
import EventService from "../services/EventService";
import { useState, useEffect } from "react";

const HowItWorks = () => {
    const [exampleSeason, setExampleSeason] = useState(2023);
    const [ppTable, setPptable] = useState("");

    const txt = "";
    useEffect(() => {
        PredictionPeriodService.getHowItWorksPredictionPeriods().then(
            (ppRes) => {
                let tbl = createPredictionPeriodsTable2(ppRes.data);
                let exampleSeasonFromDB = ppRes.data[0].season;
                setPptable(tbl);
                setExampleSeason(exampleSeasonFromDB);
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
                    significantly CHECK ME. Each year, the QB carousel spins faster and faster. This site is a platform that allows you to:
                </p>
                <ul>
                    <li key="concept-item1">
                        make predictions over the course of the season (and off-season) about who will be each
                        franchise's starting QB in the following season
                    </li>
                    <li key="concept-item2">
                        look back at your predictions from the past
                    </li>
                    <li key="concept-item3">
                        compare your predictions to your friends (through private leagues) and everyone else 
                        (via a global leaderboard)
                    </li>
                </ul> 
                <br></br>
                <h3>The Prediction Periods</h3>
                <p>
                    Each "prediction season" will start at the kick off of the season opener and end with the start of the following draft.
                    Each prediction year will be split into 4 "prediction periods".
                    For example, the prediction year in which the starting QBs will be predicted for the {exampleSeason} season
                    will be split into the prediction periods below:
                </p>
                {ppTable}
                <br></br>
                <p>
                    Once the draft has started, the prediction window for the upcoming season closes.
                    The prediction window for the next season then opens with the kick off of the first game of the new season.
                </p>
                <br></br>
                <h3>Scoring</h3>
                <p>
                    Once a new season has started, the predictions from the 4 prediction periods for the seasons will be graded.
                    Each prediction period will get a percentage score assigned to it, dependent on how many of the teams' QBs were correctly guessed.
                    These scores will then be used in the global leaderboard as well as private leagues.
                    The global leaderboard will equally weight the 4 prediction periods, to come up with a single score for the whole prediction season.
                    Private leagues allow you to set your own weightings.
                    For example, you may wish to give more weight to the earlier prediction periods compared to the later prediciton periods.
                </p>
                <br></br>
                <h3>Correct Answers</h3>
                <p>
                    With the kickoff of the season opener, a list of correct answers will be published.
                    It is possible for a team to have more than one correct answer.
                    Below are the 3 types of QB that would qualify as a correct answer:
                </p>
                <ul>
                    <li key="correctanswers-item1">
                        The team's starter from the previous season
                    </li>
                    <li key="correctanswers-item2">
                        A QB drafted in the first 2 rounds of the NFL Draft
                    </li>
                    <li key="correctanswers-item3">
                        A veteran QB brought in to compete for the starting position
                    </li>
                </ul>
            </header>
        </div>
    );
};

export default HowItWorks;