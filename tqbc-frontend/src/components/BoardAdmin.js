import React, { useState, useEffect } from "react";
import History from "../helpers/History";
import UserScoreService from "../services/UserScoreService";
import '../styles/BoardAdmin.css';

const BoardAdmin = () => {
    const [showContent, setShowContent] = useState(false);
    const [msg, setMsg] = useState("hopefully this will change");

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user.roles.includes("ROLE_ADMIN")) {
            setShowContent(true)
        } else {
            History.navigate('/how-it-works')
        }
    }, []);

    const doStuff = () => {
        UserScoreService.calculateUserScoreForSeason(1,2022).then(
            (result) => {
                setMsg(result.data.message);
            }
        )
    }

    if (showContent) {
        return (
            <div id="board-admin-container">
                <a href="/answer-entry/2022">
                    Answer Entry
                </a>
                <button className="tqbc-green-button" id="calculate-user-score-button"
                    onClick={() => doStuff()}
                >
                    Calculate User Score
                </button>
                <h1>
                    {msg}
                </h1>
            </div>
        );
    } else {
        return null;
    }
};

export default BoardAdmin;

// const BoardAdmin = () => {
    
//     return (
//         <div>
//             <h1>DOG</h1>
//         </div>
//     )
// }

// export default BoardAdmin;