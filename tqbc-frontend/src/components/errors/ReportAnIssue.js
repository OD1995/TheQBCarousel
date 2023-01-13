import { useState } from "react";
import EmailService from "../../services/EmailService";
import TokenService from "../../services/Token.service";
import "./ReportAnIssue.css";

export const ReportAnIssue = () => {

    const [disableButton, setDisableButton] = useState(false);
    const [requestResult, setRequestResult] = useState("");
    const [requestResultColour, setRequestResultColour] = useState("black");
    const [issueDescription, setIssueDescription] = useState("");

    const handleChange = (ev) => {
        setIssueDescription(ev.target.value);
    }

    const handleSubmit = () => {
        setDisableButton(true);
        setRequestResultColour("black");
        setRequestResult("Loading..");
        let currentUser = TokenService.getUser();
        let username = currentUser?.username ?? "Non-User";
        let emailBody = `
        <p>
            <b>Username</b>: ${username}
        </p>
        <p>
            <b>Issue Description</b>: ${issueDescription}
        </p>`
        EmailService.sendReportedIssueEmail(
            emailBody,
            currentUser?.username
        ).then(
            (res) => {
                setRequestResultColour("green");
                setRequestResult("Thank you for reporting the issue!")
            }
        ).catch(
            (err) => {
                let txt1 = "If even this has failed, a message to either "
                let txt2 = "https://twitter.com/theqbcarousel or https://www.reddit.com/user/theqbcarousel"
                let txt3 = " would be hugely appreciated!"
                setRequestResultColour("red");
                setRequestResult(txt1+txt2+txt3);
            }
        )
    }

    return (
        <div
            id="login-parent-div"
        >
            <div>
                <h1 className="big-h1-title">
                    Report An Issue
                </h1>
            </div>
            <div id="rai-content-div">
                <b>
                    Please provide as many details as possible on the problem:
                </b>
                <ul>
                    <li>The URL of the page you were on</li>
                    <li>What you were trying to do</li>
                    <li>What went wrong</li>
                    <li>Any error messages you were shown</li>
                    <li>If you're familiar with Chrome DevTools (or equivalents), anything you think useful from there</li>
                    <li>If possible, Imgur (or similar) URLs of screenshots of the issue</li>
                </ul>
                <textarea
                    id="rai-input"
                    onChange={handleChange}
                />
                <button
                    id="rai-submit"
                    className={"tqbc-black-button" + (disableButton ? " disabled-button" : "")}
                    onClick={handleSubmit}
                    disabled={disableButton}
                >
                    Submit
                </button>
                <p
                    style={{
                        color: requestResultColour
                    }}
                >
                    {requestResult}
                </p>
            </div>
        </div>
    );
}