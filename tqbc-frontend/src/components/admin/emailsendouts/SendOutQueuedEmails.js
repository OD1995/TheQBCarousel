import { useEffect } from "react";
import { useState } from "react";
import EmailService from "../../../services/EmailService";

export const SendOutQueuedEmails = () => {

    const [totalUnsentRows, setTotalUnsentRows] = useState(null);
    const [responseText, setResponseText] = useState("")
    const [responseColour, setResponseColour] = useState("black");

    useEffect(
        () => {
            EmailService.getTotalUnsentEmailsCount().then(
                (res) => {
                    setTotalUnsentRows(res.data);
                }
            )
        },
        []
    )

    const handleSubmit = () => {
        setResponseText("");
        EmailService.sendOutQueuedEmails().then(
            (res) => {
                if (res.data.errors.length === 0) {
                    setResponseColour("green");
                    setResponseText(
                        res.data.emailsSentCount + " emails have been sent"
                    );
                } else if (res.data.emailsSentCount > 0) {
                    setResponseColour("purple");
                    let part1 = res.data.emailsSentCount + " emails have been sent BUT ALSO: ";
                    let part2 = res.data.errors.join(" ------ ");
                    setResponseText(part1 + part2);
                } else {
                    setResponseColour("red");
                    setResponseText(res.data.errors.join(" ------ "));
                }
            }
        ).catch(
            (err) => {
                setResponseColour("red");
                setResponseText(err.response.data.message);
            }
        )
    }

    return (
        <div
            id="soqe-parent-div"
        >
            <h1
                className="big-h1-title"
            >
                Send Out Queued Emails
            </h1>
            <div
                id="soqe-content-div"
            >
                
                <h5>
                    Total Unsent Rows: {totalUnsentRows}
                </h5>
                <button
                    className="tqbc-green-button"
                    onClick={handleSubmit}
                >
                    Send Emails
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