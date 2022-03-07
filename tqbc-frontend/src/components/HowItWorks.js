import "../styles/HowItWorks.css";
import getHowItWorksTable from "../helpers/PredictionPeriodsTable";
import { useState, useEffect } from "react";

const HowItWorks = () => {
    const [exampleSeason, setExampleSeason] = useState(2023);
    const [ppTable2, setPptable2] = useState(null);

    // const ppTable = (
    //     <table>
    //         <tr>
    //             <th rowSpan={2}>Prediction Period</th>
    //             <th colSpan={2}>From</th>
    //             <th colSpan={2}>To</th>
    //         </tr>
    //         <tr>
    //             <th>Event</th>
    //             <th>Date</th>
    //             <th>Event</th>
    //             <th>Date</th>
    //         </tr>
    //         <tr>
    //             <td>PP1</td>
    //             <td>KO of 2022 Season Opener</td>
    //             <td>7th Sep 2022 20:15</td>
    //             <td>KO of 1st game in final round of 2022 Regular Season games</td>
    //             <td>4th Jan 2023 20:15</td>
    //         </tr>
    //     </table>
    // );
    const txt = "";
    useEffect(() => {
        const result = getHowItWorksTable();
        console.log("hi");
        console.log(result);
        setExampleSeason(result.ssn);
        setPptable2(result.tbl);
    },[])
    const ppTable = (
        <table cellSpacing={0} cellPadding={0}>
            <tbody>
                <tr>
                    <th className="display-linebreak ps-col">Prediction{"\n"}Season</th>
                    <th className="display-linebreak">Prediction{"\n"}Period</th>
                    <th className="display-linebreak arrow-col">From{"\n"}To</th>
                    <th>Event</th>
                    <th>Date</th>
                </tr>
                <tr>
                    <td dangerouslySetInnerHTML={{__html:"&nbsp;"}}></td>
                    <td dangerouslySetInnerHTML={{__html:"&nbsp;"}}></td>
                    <td></td>
                    <td className="border-tlb" rowSpan={2}>KO of 2022 Regular Season opener</td>
                    <td className="border-trb" rowSpan={2}>7th Sep 2022 20:15</td>
                </tr>
                <tr>
                    <td dangerouslySetInnerHTML={{__html:"&nbsp;"}}></td>
                    <td dangerouslySetInnerHTML={{__html:"&nbsp;"}}></td>
                    <td rowSpan={3}>
                        <img
                            src={window.location.origin + '/arrows.png'}
                            className="arrows arrow-col"
                        />
                    </td>
                </tr>
                <tr>
                    <td className="ps-col ps-val" rowSpan={4}>2023</td>
                    <td>PP1</td>
                    <td></td>
                    <td></td>
                </tr>
                <tr>
                    <td dangerouslySetInnerHTML={{__html:"&nbsp;"}}></td>
                    <td className="border-tlb display-linebreak"  rowSpan={2}>
                        KO of 1st game in final round{"\n"}
                        of 2022 Regular Season games
                    </td>
                    <td className="border-trb"  rowSpan={2}>4th Jan 2023 20:15</td>
                </tr>
                <tr>
                    <td>{txt}</td>
                    <td rowSpan={3}>
                        <img
                            src={window.location.origin + '/arrows.png'}
                            className="arrows arrow-col"
                        />
                    </td>
                </tr>
                <tr>
                    {/* <td className="ps-col">2023</td> */}
                    <td>PP1</td>
                    {/* <td></td> */}
                    <td></td>
                    <td></td>
                </tr>
                <tr>
                    <td>{txt}</td>
                    <td>{txt}</td>
                    <td className="border-tlb display-linebreak" rowSpan={2}>
                        KO of 1st game in final round{"\n"}
                        of 2022 Regular Season games
                    </td>
                    <td className="border-trb" rowSpan={2}>4th Jan 2023 20:15</td>
                </tr>
                <tr>
                    <td>{txt}</td>
                    <td>{txt}</td>
                    <td></td>
                </tr>
            </tbody>
        </table>
    )

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
                    predicted for the {exampleSeason} season will be split into the prediction periods below:
                </p>
                {ppTable}
                <br></br>
                {ppTable2}
                <br></br>
            </header>
        </div>
    );
};

export default HowItWorks;