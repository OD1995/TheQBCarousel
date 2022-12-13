import { useState, useEffect } from "react";
import { PredictionPeriodsTable } from "./PredictionPeriodsTable";
import PredictionPeriodService from "../../services/PredictionPeriodService";
import "./HowItWorks.css";

export const HowItWorksComponent = () => {
    const [exampleSeason, setExampleSeason] = useState(0);
    const [predictionPeriodsData,setPredictionPeriodsData] = useState([]);

    useEffect(
        () => {
            document.title = 'How It Works';
            PredictionPeriodService.getHowItWorksPredictionPeriods().then(
                (ppRes) => {
                    setPredictionPeriodsData(ppRes.data);
                    let exampleSeasonFromDB = ppRes.data[0].season;
                    setExampleSeason(exampleSeasonFromDB);
                }
            )
        },
        []
    )

    if (exampleSeason != 0) {

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
                            compare your predictions to your friends (through private leaderboards) and everyone else 
                            (via a global leaderboard)
                        </li>
                    </ul> 
                    <br></br>
                    <h3>The Season Periods</h3>
                    <p>
                        Each "prediction season" starts at the kick off of the season opener and ends with the start of the following draft.
                        Each prediction season is split into 4 "season periods".
                        For example, the prediction season in which the starting QBs will be predicted for the {exampleSeason} season
                        will be split into the season periods below:
                    </p>
                    <PredictionPeriodsTable
                        predictionPeriodsData={predictionPeriodsData}
                    />
                    <br></br>
                    <p>
                        Once the draft has started, the prediction window for the upcoming season closes.
                        The prediction window for the next season then opens with the kick off of the first game of the new season.
                    </p>
                    <br></br>
                    <h3>Scoring</h3>
                    <p>
                        Once a new season has started, the predictions from the 4 season periods for the season are graded.
                        Each season period gets a percentage score assigned to it, dependent on how many of the teams' QBs were correctly guessed.
                        These scores are displayed in the global leaderboard as well as private leaderboards.
                        The global leaderboard equally weighs the 4 season periods to come up with a single score for the whole prediction season.
                        Private leaderboards allow you to set your own weightings.
                        For example, you may wish to give more weight to the earlier season periods compared to the later season periods.
                    </p>
                    <br></br>
                    <h3>Correct Answers</h3>
                    <p>
                        With the kick off of the season opener, a list of correct answers will be published.
                        It is possible for a team to have more than one correct answer.
                        Below are the 3 types of QB that would qualify as a correct answer:
                    </p>
                    <ul>
                        <li key="correctanswers-item1">
                            The team's starter from the previous season (assuming they're still on the roster)
                        </li>
                        <li key="correctanswers-item2">
                            A QB drafted in the first 2 rounds of the NFL Draft
                        </li>
                        <li key="correctanswers-item3">
                            A veteran QB brought in to compete for the starting position
                        </li>
                    </ul>
                    <br></br>
                    <br></br>
                </header>
            </div>
        );
    } else {
        return null;
    }
};