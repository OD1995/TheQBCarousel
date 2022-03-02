const HowItWorks = () => {
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
                    Each "prediction year" will start at the kick off of the season opener and end with the kick
                    off of the following season opener. And each prediction year will be split into 5
                    "prediction periods". For example, the prediction year in which the starting QBs will be
                    predicted for the 2023 season will be split into the prediction periods below:
                </p>
                <table>
                    <tr>
                        <th rowSpan={2}>Prediction Period</th>
                        <th colSpan={2}>From</th>
                        <th colSpan={2}>To</th>
                    </tr>
                    <tr>
                        <th>Event</th>
                        <th>Date</th>
                        <th>Event</th>
                        <th>Date</th>
                    </tr>
                    <tr>
                        <td>PP1</td>
                        <td>KO of 2022 Season Opener</td>
                        <td>7th Sep 2022 20:15</td>
                        <td>KO of 1st game in final round of 2022 Regular Season games </td>
                        <td>4th Jan 2023 20:15</td>
                    </tr>
                </table>
            </header>
        </div>
    );
};

export default HowItWorks;