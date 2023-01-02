import { useState } from "react";
import UserScoreService from "../../services/UserScoreService";
import './PredictionMarking.css';

export const PredictionMarking = () => {
    
    const [season, setSeason] = useState("");
    const [responseText, setResponseText] = useState("")
    const [responseColour, setResponseColour] = useState("black");

    const onChangeSeason = (ev) => {
        setSeason(ev.target.value);
    }

    const handleSubmit = () => {
        setResponseText("");
        setResponseColour("black");
        if (season.length !== 4) {
            setResponseText("Season has to be 4 characters long");
            setResponseColour("purple")
        } else {
            let seasonInt = parseInt(season);
            UserScoreService.calculateUserScoreForSeason(seasonInt).then(
                (res) => {
                    setResponseColour("green");
                    setResponseText("Success");
                }
            ).catch(
                (err) => {
                    setResponseColour("red");
                    setResponseText(err.response.data.message);
                }
            )
        }
    }
    
    return (
        <div
            id="prediction-marking-parent-div"
        >
            <h1
                className="big-h1-title"
            >
                Prediction Marking
            </h1>
            <div
                id="prediction-marking-inputs-div"
            >
                <div
                    id="prediction-marking-season-input-div"
                >
                    <h5>
                        Season
                    </h5>
                    <input
                        id="prediction-marking-season-input"
                        onChange={onChangeSeason}
                    />
                </div>
                <button
                    className="tqbc-green-button"
                    onClick={handleSubmit}
                >
                    Submit
                </button>
                <p
                    id="prediction-marking-response-text"
                    style={{
                        color: responseColour
                    }}
                >
                  {responseText}  
                </p>
            </div>

        </div>
    );
}