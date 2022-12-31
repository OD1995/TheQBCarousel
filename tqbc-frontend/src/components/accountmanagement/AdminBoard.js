import React, { useState, useEffect } from "react";
import History from "../../helpers/History"
import TokenService from "../../services/Token.service";
import UserScoreService from "../../services/UserScoreService";
import './AdminBoard.css';

const AdminBoard = () => {
    const [calculateUserScoresResult, setCalculateUserScoresResult] = useState("");
    const [calculateUserScoresColour, setCalculateUserScoresColour] = useState("black")
    const [answerSeason, setAnswerSeason] = useState(null);
    const [msg, setMsg] = useState("hopefully this will change");

    useEffect(
        () => {
            const user = TokenService.getUser();
            if (!user.roles.includes("ROLE_ADMIN")) {
                History.navigate("/nope");
                // setShowContent(true)
            }
        },
        []
    );

    const doStuff = () => {
        setCalculateUserScoresResult("donkey");
        setCalculateUserScoresColour("green");
        // UserScoreService.calculateUserScoreForSeason(1,2022).then(
        //     (result) => {
        //         setMsg(result.data.message);
        //     }
        // )
    }

    // if (showContent) {
    return (
        <div
            id="admin-board-parent-div"
        >
            <h1
                className="big-h1-title"
            >
                Admin Board
            </h1>
            <div
            id="admin-board-grid"
            >
                <h5
                    style={{
                        gridRow: 1,
                        gridColumn: 1
                    }}
                >
                    Pages
                </h5>
                <h5
                    style={{
                        gridRow: 1,
                        gridColumn: 2
                    }}
                >
                    Actions
                </h5>
                <h5
                    style={{
                        gridRow: 1,
                        gridColumn: 3
                    }}
                >
                    Result
                </h5>
                <a
                    href="/answer-entry/2022"
                    style={{
                        gridRow: 2,
                        gridColumn: 1
                    }}
                >
                    Answer Entry
                </a>
                <button
                    id="calculate-user-score-button"
                    style={{
                        gridRow: 2,
                        gridColumn: 2
                    }}
                    className="tqbc-green-button"
                    // onClick={() => doStuff()}
                    onClick={doStuff}
                >
                    Calculate User Scores
                </button>
                <h6
                    style={{
                        gridRow: 2,
                        gridColumn: 3,
                        color: calculateUserScoresColour
                    }}
                >
                    {calculateUserScoresResult}
                </h6>
            </div>
        </div>
        // <div id="board-admin-container">
        //     <a href="/answer-entry/2022">
        //         Answer Entry
        //     </a>
        //     <h1>
        //         {msg}
        //     </h1>
        // </div>
    );
};

export default AdminBoard;